import type { ComponentType } from 'react';
import type { Column } from '@tanstack/react-table';
import type { FilterOption } from '../components/table-filters/types';

interface CustomFilterProps {
  column: Column<any, any, any>;
  options?: FilterOption[];
  multiple?: boolean;
  placeholder?: string;
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TFeatures, TData, TValue> {
    Filter?: ComponentType<CustomFilterProps>;
    filterProps?: Omit<CustomFilterProps, 'column'>;
  }
}
