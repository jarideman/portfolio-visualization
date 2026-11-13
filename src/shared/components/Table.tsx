import { useState, type ReactNode } from "react";

import {
  ScrollArea,
  Table as MantineTable,
  Group,
  Stack,
  Paper,
  Button,
  Badge,
  Text,
} from "@mantine/core";

import {
  createPaginatedRowModel,
  rowPaginationFeature,
  flexRender,
  tableFeatures,
  useTable,
  type RowData,
  type ColumnDef,
  type TableFeatures,
  rowSortingFeature,
  createSortedRowModel,
  columnFilteringFeature,
  createFilteredRowModel,
  type ColumnFiltersState,
  type OnChangeFn,
} from "@tanstack/react-table";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  SlidersHorizontal,
} from "lucide-react";

import { Pagination } from "./Pagination";

type Props<TData extends RowData> = {
  tableKey: string;
  data: TData[];
  columns: ColumnDef<TableFeatures, TData, unknown>[];
  onPress?: (row: TData) => void;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  badges?: ReactNode;
};

export function Table<TData extends RowData>({
  tableKey,
  data,
  columns,
  onPress,
  columnFilters = [],
  onColumnFiltersChange,
  badges,
}: Props<TData>) {
  const [filtersOpened, setFiltersOpened] = useState(false);

  const activeFiltersCount = columnFilters.length;

  const features = tableFeatures({
    rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel(),

    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),

    columnFilteringFeature,
    filteredRowModel: createFilteredRowModel(),
  });

  const table = useTable({
    key: tableKey,
    features,
    columns,
    data,

    state: {
      columnFilters,
    },

    onColumnFiltersChange,

    defaultColumn: {
      enableSorting: false,
      enableColumnFilter: false,
    },
  });

  return (
    <ScrollArea>
      <Stack gap="sm" mb="md">
        <Group justify="space-between" align="center" wrap="nowrap" mt={10}>
          {badges && (
            <ScrollArea type="never" style={{ flex: 1, minWidth: 0 }}>
              {badges}
            </ScrollArea>
          )}

          <Group gap="xs" wrap="nowrap">
            <Button
              type="button"
              variant={filtersOpened ? "light" : "default"}
              color="gray"
              size="sm"
              leftSection={<SlidersHorizontal size={16} />}
              rightSection={
                activeFiltersCount > 0 ? (
                  <Badge size="sm" circle color="blue">
                    {activeFiltersCount}
                  </Badge>
                ) : undefined
              }
              onClick={() => setFiltersOpened((prev) => !prev)}
            >
              Filters
            </Button>
          </Group>
        </Group>

        {filtersOpened && (
          <Paper p="md" radius="md" withBorder bg="var(--mantine-color-body)">
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm" fw={600}>
                  Filter records
                </Text>

                <Text size="xs" c="dimmed">
                  Filter by column
                </Text>
              </Group>

              <Group align="flex-start" gap="md">
                {table.getAllLeafColumns().map((column) => {
                  const FilterComponent = column.columnDef.meta?.Filter;

                  const filterProps = column.columnDef.meta?.filterProps;

                  if (!column.getCanFilter() || !FilterComponent) {
                    return null;
                  }

                  return (
                    <Stack
                      key={column.id}
                      gap={5}
                      style={{
                        flex: "1 1 200px",
                        minWidth: 0,
                      }}
                    >
                      <Text size="xs" fw={500} c="dimmed">
                        {typeof column.columnDef.header === "string"
                          ? column.columnDef.header
                          : column.id}
                      </Text>

                      <FilterComponent column={column} {...filterProps} />
                    </Stack>
                  );
                })}
              </Group>
            </Stack>
          </Paper>
        )}
      </Stack>

      <MantineTable striped highlightOnHover withTableBorder withColumnBorders>
        <MantineTable.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <MantineTable.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const column = header.column;

                return (
                  <MantineTable.Th key={header.id}>
                    <Group
                      gap="xs"
                      wrap="nowrap"
                      style={{
                        cursor: column.getCanSort() ? "pointer" : "default",
                        userSelect: "none",
                      }}
                      onClick={column.getToggleSortingHandler()}
                    >
                      {flexRender(column.columnDef.header, header.getContext())}

                      {column.getCanSort() && (
                        <>
                          {column.getIsSorted() === "asc" ? (
                            <ArrowUp size={14} />
                          ) : column.getIsSorted() === "desc" ? (
                            <ArrowDown size={14} />
                          ) : (
                            <ArrowUpDown size={14} opacity={0.4} />
                          )}
                        </>
                      )}
                    </Group>
                  </MantineTable.Th>
                );
              })}
            </MantineTable.Tr>
          ))}
        </MantineTable.Thead>

        <MantineTable.Tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <MantineTable.Tr
                key={row.id}
                onClick={() => onPress?.(row.original)}
                style={{
                  cursor: onPress ? "pointer" : "default",
                }}
              >
                {row.getAllCells().map((cell) => (
                  <MantineTable.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </MantineTable.Td>
                ))}
              </MantineTable.Tr>
            ))
          ) : (
            <MantineTable.Tr>
              <MantineTable.Td colSpan={table.getAllLeafColumns().length}>
                <Text size="sm" c="dimmed" ta="center" py="md">
                  No records found.
                </Text>
              </MantineTable.Td>
            </MantineTable.Tr>
          )}
        </MantineTable.Tbody>
      </MantineTable>

      <Pagination table={table} />
    </ScrollArea>
  );
}
