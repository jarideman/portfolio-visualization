import type { Column } from '@tanstack/react-table';

export interface FilterProps {
  column: Column<any, any>;
}

export interface ValueItem {
  label: string;
  value: string;
}

export interface OptionsFilterProps extends FilterProps {
  options?: ValueItem[];
  multiple?: boolean;
  placeholder?: string;
}

export interface DateRangeValue {
  start?: string;
  end?: string;
}

export interface DetailRowItem {
  label: string;
  value?: string | number;
  customValue?: React.ReactNode;
}

export const TIME_FILTERS = [
  { label: "1D", value: "1D" },
  { label: "1W", value: "1W" },
  { label: "1M", value: "1M" },
  { label: "3M", value: "3M" },
  { label: "6M", value: "6M" },
  { label: "YTD", value: "YTD" },
  { label: "1Y", value: "1Y" },
  { label: "ALL", value: "ALL" },
] as const;

export type TimeFilter = (typeof TIME_FILTERS)[number]["value"];
