// Tipos "de toda la app". Todo el código importa de aquí.
export type Order = {
  ord_id: string;
  cust_nm: string;
  cust_tier: string;
  ord_st: string;
  owner_id: string;
  crt_ts: string;
  ln_items: { sku: string; qty: number; unit_prc: number }[];
  total?: number;
  isUrgent?: boolean;
  selected?: boolean;
  rowColor?: string;
};

export type User = { usr_id: string; usr_nm: string; usr_role: string };

export type Filters = { text: string; status: string; onlyMine: boolean };

export type AnyProps = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
