import type { FilterFn } from "@tanstack/react-table";

type DateRangeFilter = {
  start?: string;
  end?: string;
};

export const dateRangeFilter: FilterFn<any, any> = (
  row,
  columnId,
  filterValue: DateRangeFilter,
) => {
  const value = row.getValue(columnId);

  if (!value) return false;

  const date = new Date(value as string);

  const start = filterValue?.start
    ? new Date(`${filterValue.start}T00:00:00`)
    : undefined;

  const end = filterValue?.end
    ? new Date(`${filterValue.end}T23:59:59.999`)
    : undefined;

  if (start && date < start) return false;
  if (end && date > end) return false;

  return true;
};
