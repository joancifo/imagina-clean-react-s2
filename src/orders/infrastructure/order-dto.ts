// INFRAESTRUCTURA · Forma del backend heredado. Solo existe aquí: el resto de la app no la ve.
export type OrderDto = {
  ord_id: string;
  cust_nm: string;
  cust_tier: string;
  ord_st: string;
  owner_id: string;
  crt_ts: string;
  ln_items: { sku: string; qty: number; unit_prc: number }[];
};
