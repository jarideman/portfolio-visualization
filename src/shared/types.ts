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
