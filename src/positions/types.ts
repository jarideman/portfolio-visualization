export interface Position {
  ticket: number;
  symbol: string;
  status: string;
  type: string;
  volume: number;
  price_open: number;
  price_current?: number;
  price_exit?: number;
  profit: number;
  date: string;
};

export type PositionType = "open" | "closed"
