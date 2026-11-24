export interface Position {
  ticket: number;
  position_id?: number;
  symbol: string;
  status: PositionStatus;
  type: string;
  volume: number;
  price_open: number;
  price_current?: number;
  price_exit?: number;
  stop_loss?: number;
  take_profit?: number;
  profit: number;
  date: string;
};

export type PositionStatus = "open" | "closed"
