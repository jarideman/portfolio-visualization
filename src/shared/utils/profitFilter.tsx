import type { FilterFn } from "@tanstack/react-table";

export const profitFilter: FilterFn<any, any> = (
  row,
  columnId,
  filterValue,
) => {
  const profit = Number(row.getValue(columnId));

  switch (filterValue) {
    case 'profit':
      return profit > 0;
    case 'loss':
      return profit < 0;
    case 'break_even':
      return profit === 0;
    default:
      return true;
  }
};
