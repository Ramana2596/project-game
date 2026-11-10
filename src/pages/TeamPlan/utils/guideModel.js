// File: src/pages/TeamPlan/utils/guideModel.js
// Purpose: turn the API response of UI_Ops_Business_Plan_Guide into a Part_No lookup.
// API keys (set 1-6): demand | fgStock | rmStock | bom | plant | workCentre

// ---------- helpers ----------
// Text or number to a number; blank or invalid becomes null.
const toNum = (v) => {
  if (v === null || v === undefined || String(v).trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// One consistent key for every Part_No (text, trimmed).
const key = (v) => String(v).trim();

// Rows to { Part_No: row }.
const byPart = (rows = []) =>
  Object.fromEntries(rows.map((r) => [key(r.Part_No), r]));

// Rows to { Part_No: [rows] }.
const groupByPart = (rows = []) =>
  rows.reduce((acc, r) => {
    (acc[key(r.Part_No)] ||= []).push(r);
    return acc;
  }, {});

// ---------- API response to named lists ----------
export const toSets = (data) => ({
  demand: data?.demand ?? [],
  fgStock: data?.fgStock ?? [],
  rmStock: data?.rmStock ?? [],
  bom: data?.bom ?? [],
  plant: data?.plant ?? [],
  workCentre: data?.workCentre ?? [],
});

// ---------- named lists to Part_No lookup ----------

export const buildModel = (sets) => ({
  demand: byPart(sets.demand),
  stock: byPart([...sets.fgStock, ...sets.rmStock]), // Part_No is unique across FG and RM
  bom: groupByPart(sets.bom),
  machine: byPart(sets.workCentre),
  plant: sets.plant[0] ?? null,
});

// ---------- figures for one Part_No ----------

export const partInfo = (m, partNo) => {
  const k = key(partNo);
  const d = m.demand[k];
  const s = m.stock[k];
  const b = m.bom[k];
  const mc = m.machine[k]; // only for machinery parts

  // Nothing known for this line.
  if (!d && !s && !b && !mc && !m.plant) return null;

  // Capacity figures: the machine's work centre if known, else the plant total.
  const cap = mc
    ? {
        capacity: mc.Capacity_Hours,
        load: mc.Load_Hours,
        uom: mc.Cap_UOM,
        utilisation: mc.Mfg_Load_Percent,
      }
    : m.plant && {
        capacity: m.plant.Plant_Capacity_Hours,
        load: m.plant.Plant_Load_Hours,
        uom: m.plant.Cap_UOM,
        utilisation: m.plant.Plant_Utilisation_Percent,
      };

  return {
    Part_No: k,
    UOM: d?.UOM ?? s?.UOM ?? b?.[0]?.UOM ?? null,

    // Demand (OI 001)
    Mkt_Demand: toNum(d?.Quantity),
    Addl_Demand: toNum(d?.Addl_Demand),
    Total_Demand: toNum(d?.Total_Demand),

    // Opening stock: FG for a product, RM for a material
    Stock_Qty: toNum(s?.CB_Qty),

    // BOM text for a material, e.g. "0.5 in Product B"
    // (Product_Descrition is spelled that way in the SP)
    Qty_Per_Set: b
      ? b.map((x) => `${toNum(x.Qty_per_Set)} in ${x.Product_Descrition ?? x.Used_in_Product}`).join(", ")
      : null,

    // Machine details (null for product and material lines)
    scope: mc ? "machine" : "plant",
    machines: toNum(mc?.No_Of_Machines),
    capacityPerMc: toNum(mc?.Capacity_Per_Mc),
    workCentreCode: mc?.Mfg_Work_Centre?.trim() ?? null,
    workCentreName: mc?.Work_Centre?.trim() ?? null,

    // Capacity, load and utilisation (OI 003 cards)
    plant: cap && {
      capacity: toNum(cap.capacity),
      load: toNum(cap.load),
      uom: cap.uom ?? "",
      utilisation: toNum(cap.utilisation),
    },
  };
};