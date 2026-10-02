// utils/mrFormat.js – display formatting (NULL shows as MR_EMPTY)
import { MR_EMPTY } from "../constants/mrConstants";

const SYM = { USD: "$", INR: "₹", EUR: "€", GBP: "£" };
const sym = (cur) => (SYM[cur] ?? (cur ? `${cur} ` : ""));

export const fmtQty   = (v) => (v == null ? MR_EMPTY : Math.round(v).toLocaleString("en-US"));
export const fmtPrice = (v, cur) => (v == null ? MR_EMPTY : `${sym(cur)}${Number(v).toFixed(2)}`);
export const fmtMoney = (v, cur) => (v == null ? MR_EMPTY : `${sym(cur)}${Math.round(v).toLocaleString("en-US")}`);

// Format by column type from mrCols
export const fmtBy = (type, v, cur) =>
  type === "qty" ? fmtQty(v) : type === "price" ? fmtPrice(v, cur) : type === "money" ? fmtMoney(v, cur) : (v ?? MR_EMPTY);

// ---- Period <-> date conversion ----
const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// "Jun-2026" -> "2026-06-01" (SP @Production_Month); assumes month is stored as the 1st
export const toDate = (period) => {
  const [m, y] = String(period).split("-");
  return `${y}-${String(MON.indexOf(m) + 1).padStart(2, "0")}-01`;
};

// "2026-06-01" (or "Jun-2026") -> "Jun-2026"
export const toPeriod = (v) => {
  if (!v) return "";
  if (/^[A-Za-z]{3}-\d{4}$/.test(v)) return v;
  const m = /^(\d{4})-(\d{2})/.exec(String(v));
  return m ? `${MON[+m[2] - 1]}-${m[1]}` : "";
};