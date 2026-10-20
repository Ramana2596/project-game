// File: src/pages/TeamPlan/utils/guideModel.js
// Purpose: turn the five result sets of UI_Ops_Business_Plan_Guide into a Part_No lookup.
// Result sets are recognised by their columns, not their position. Part_No is unique across tabs.

// Rows exactly as the SP returns them (batch 101, team Lotus, Feb-2026), used for the sample mode.
export const SAMPLE_SETS = [
  [{ Game_Id: "OpsMgt", Game_Batch: 101, Game_Team: "Lotus", Production_Month: "2026-02-01", Part_No: "1002", UOM: "No", Quantity: 1000, Addl_Demand: 0, Total_Demand: 1000 }],
  [{ Game_Id: "OpsMgt", Game_Batch: 101, Game_Team: "Lotus", Production_Month: "2026-02-01", Part_No: "1002", UOM: "No", CB_Qty: "100.00" }],
  [{ Game_Id: "OpsMgt", Game_Batch: 101, Game_Team: "Lotus", Production_Month: "2026-02-01", Part_No: "5002", UOM: "Kg", CB_Qty: "600.00" }],
  [{ Game_Id: "OpsMgt", Game_Batch: 101, Game_Team: "Lotus", Production_Month: "2026-02-01", Part_No: "5002", UOM: "KG", Qty_per_Set: "0.50", Used_in_Product: "1002", Product_Descrition: "Product B" }],
  [{ Game_Id: "OpsMgt", Game_Batch: 101, Game_Team: "Lotus", Production_Month: "2026-02-01", Plant_Capacity_Hours: 2880, Plant_Load_Hours: 353, Cap_UOM: "Hours", Plant_Utilisation_Percent: 12 }],
];

const toNum = (v) => {
  if (v === null || v === undefined || String(v).trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// Accepts a response with NAMED lists, e.g. { demand: [], fgStock: [], rmStock: [], bom: [], plant: [], machines: [] },
// also when wrapped as { data: { ... } }, or a plain list of lists / { recordsets: [...] }.
// List names do not matter: each list is recognised by its columns.
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

export const buildModel = (sets) => {
  const m = { demand: {}, stock: {}, bom: {}, machine: {}, plant: null };
  (sets || []).forEach((rows) => {
    const first = rows?.[0];
    if (!first) return;
    if ("Total_Demand" in first) rows.forEach((r) => { m.demand[String(r.Part_No)] = r; });
    else if ("Qty_per_Set" in first) rows.forEach((r) => { (m.bom[String(r.Part_No)] ||= []).push(r); });
    else if ("No_Of_Machines" in first) rows.forEach((r) => { m.machine[String(r.Part_No)] = r; }); // optional, per machine
    else if ("Plant_Capacity_Hours" in first) m.plant = first;
    else if ("CB_Qty" in first) rows.forEach((r) => { m.stock[String(r.Part_No)] = r; });
  });
  return m;
};

// Figures for one Part_No. Numbers are real numbers even if the API sends text.
export const partInfo = (m, partNo) => {
  const k = String(partNo);
  const d = m.demand[k], s = m.stock[k], b = m.bom[k], mc = m.machine[k];
  if (!d && !s && !b && !mc && !m.plant) return null;
  const src = mc ?? m.plant; // per-machine figures when the SP provides them, else the plant total
  const uom = src?.Cap_UOM;
  return {
    Part_No: k,
    Part_Description: d?.Part_Description ?? s?.Part_Description ?? b?.[0]?.Part_Description ?? mc?.Part_Description ?? null,
    UOM: d?.UOM ?? s?.UOM ?? b?.[0]?.UOM ?? null,
    Mkt_Demand: toNum(d?.Quantity),
    Addl_Demand: toNum(d?.Addl_Demand),
    Total_Demand: toNum(d?.Total_Demand),
    Stock_Qty: toNum(s?.CB_Qty), // FG stock for a product, RM stock for a material
    Qty_Per_Set: b ? b.map((x) => `${toNum(x.Qty_per_Set)} in ${x.Product_Descrition ?? x.Used_in_Product}`).join(", ") : null,
    machines: toNum(mc?.No_Of_Machines),
    scope: mc ? "machine" : "plant",
    plant: src && {
      capacity: toNum(src.Capacity_Hours ?? src.Plant_Capacity_Hours),
      load: toNum(src.Load_Hours ?? src.Plant_Load_Hours),
      uom: /^hours?$/i.test(String(uom ?? "")) ? "Hrs p.m" : uom ?? "",
      utilisation: toNum(src.Utilisation_Percent ?? src.Plant_Utilisation_Percent),
    },
  };
};