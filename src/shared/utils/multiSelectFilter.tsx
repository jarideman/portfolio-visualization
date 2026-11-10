import type { FilterFn } from '@tanstack/react-table';

export const multiSelectFilter: FilterFn<any, any> = (
  row,
  columnId,
  filterValue: string[],
) => {
  if (!filterValue?.length) return true;

  return filterValue.includes(row.getValue(columnId));
};
