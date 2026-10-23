
export interface OpenPosition {
  price_open: number;
  tp: number;
  sl: number;
  symbol: string;
  profit: number;
};

export interface ClosedPosition {
  price_open: number;
  lot_size: number;
  profit: number;
  symbol: string;
};
