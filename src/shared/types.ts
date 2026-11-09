import type { Column } from '@tanstack/react-table';

export interface FilterProps {
  column: Column<any, any>;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface OptionsFilterProps extends FilterProps {
  options: FilterOption[];
  multiple?: boolean;
  placeholder?: string;
}

export interface DateRangeValue {
  start?: string;
  end?: string;
}
