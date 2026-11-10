// File: src/pages/TeamPlan/utils/guideModel.js
// Purpose: turn the six result sets of UI_Ops_Business_Plan_Guide into a Part_No lookup.
// Result sets are recognised by their columns, not their position. Part_No is unique across tabs.
//   Set 1 demand | Set 2 FG stock | Set 3 RM stock | Set 4 BOM | Set 5 plant total | Set 6 per machine

// Text or number to a number; blank or invalid becomes null.
const toNum = (v) => {
  if (v === null || v === undefined || String(v).trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// Pull the list of result sets out of the API response, whatever shape it has.
// Accepts named lists ({ demand: [], fgStock: [], ..., machines: [] }), { data: { ... } },
// { recordsets: [...] } or a plain list of lists. List names do not matter.
export const toSets = (data) => {
  const body = data?.data && !Array.isArray(data.data) ? data.data : data;
  if (Array.isArray(body?.recordsets)) return body.recordsets;
  if (Array.isArray(body?.data) && body.data.every(Array.isArray)) return body.data;
  if (Array.isArray(body) && body.length && body.every(Array.isArray)) return body;
  if (body && typeof body === "object" && !Array.isArray(body)) {
    const lists = Object.values(body).filter(Array.isArray);
    if (lists.length) return lists;
  }
  return Array.isArray(body) && body.length ? [body] : [];
};

// Index every result set by Part_No (plant total is a single row).
export const buildModel = (sets) => {
  const m = { demand: {}, stock: {}, bom: {}, machine: {}, plant: null };
  (sets || []).forEach((rows) => {
    const first = rows?.[0];
    if (!first) return;

    // Set 1: likely demand per product.
    if ("Total_Demand" in first) rows.forEach((r) => { m.demand[String(r.Part_No)] = r; });
    // Set 4: BOM lines per material (a material can be used in several products).
    else if ("Qty_per_Set" in first) rows.forEach((r) => { (m.bom[String(r.Part_No)] ||= []).push(r); });
    // Set 6: work-centre capacity and load per machine (capital item).
    else if ("No_Of_Machines" in first) rows.forEach((r) => { m.machine[String(r.Part_No)] = r; });
    // Set 5: overall plant capacity, load and utilisation.
    else if ("Plant_Capacity_Hours" in first) m.plant = first;
    // Sets 2 and 3: opening stock (FG for products, RM for materials).
    else if ("CB_Qty" in first) rows.forEach((r) => { m.stock[String(r.Part_No)] = r; });
  });
  return m;
};

// Figures for one Part_No, as real numbers even if the API sends text.
export const partInfo = (m, partNo) => {
  const k = String(partNo);
  const d = m.demand[k], s = m.stock[k], b = m.bom[k], mc = m.machine[k];

  // Nothing known for this line.
  if (!d && !s && !b && !mc && !m.plant) return null;

  // Per-machine row (set 6) when it exists, else the plant total (set 5).
  const src = mc ?? m.plant;

  return {
    Part_No: k,
    UOM: d?.UOM ?? s?.UOM ?? b?.[0]?.UOM ?? null,

    // Demand picture (OI 001).
    Mkt_Demand: toNum(d?.Quantity),
    Addl_Demand: toNum(d?.Addl_Demand),
    Total_Demand: toNum(d?.Total_Demand),

    // Opening stock: FG for a product, RM for a material.
    Stock_Qty: toNum(s?.CB_Qty),

    // BOM text for a material, e.g. "0.5 in Product B".
    Qty_Per_Set: b ? b.map((x) => `${toNum(x.Qty_per_Set)} in ${x.Product_Descrition ?? x.Used_in_Product}`).join(", ") : null,

    // Machine count and scope ("machine" = set 6 row found, "plant" = fell back to set 5).
    machines: toNum(mc?.No_Of_Machines),
    scope: mc ? "machine" : "plant",

    // Capacity, load and utilisation shown on the OI 003 cards.
    plant: src && {
      capacity: toNum(src.Capacity_Hours ?? src.Plant_Capacity_Hours),
      load: toNum(src.Load_Hours ?? src.Plant_Load_Hours),
      uom: src.Cap_UOM ?? "",
      utilisation: toNum(src.Mfg_Load_Percent ?? src.Plant_Utilisation_Percent),
    },
  };
};