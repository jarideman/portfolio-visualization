import { ScrollArea, Table as MantineTable, Group, Stack } from '@mantine/core';
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
} from '@tanstack/react-table';
import { Pagination } from './Pagination';

type Props<TData extends RowData> = {
  key: string
  data: TData[];
  columns: ColumnDef<TableFeatures, TData, unknown>[];
};

export function Table<TData extends RowData>({ key, data, columns }: Props<TData>) {
  const features = tableFeatures({
    rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel(),

    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),

    columnFilteringFeature,
    filteredRowModel: createFilteredRowModel(),
  })

  const table = useTable({
    key: key,
    features,
    columns,
    data,

    defaultColumn: {
      enableSorting: false,
      enableColumnFilter: false,
    },
  })


  return (
    <ScrollArea>
      <MantineTable
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
      >
        <MantineTable.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <MantineTable.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const column = header.column;

                const FilterComponent = column.columnDef.meta?.Filter;
                const filterProps = column.columnDef.meta?.filterProps;

                return (
                  <MantineTable.Th key={header.id}>
                    <Stack gap="xs">
                      <Group
                        gap="xs"
                        style={{
                          cursor: column.getCanSort() ? 'pointer' : 'default',
                        }}
                        onClick={column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          column.columnDef.header,
                          header.getContext(),
                        )}

                        {{
                          asc: '↑',
                          desc: '↓',
                        }[column.getIsSorted() as string] ?? ''}
                      </Group>

                      {column.getCanFilter() && FilterComponent && (
                        <FilterComponent
                          column={column}
                          {...filterProps}
                        />
                      )}
                    </Stack>
                  </MantineTable.Th>
                );
              })}
            </MantineTable.Tr>
          ))}
        </MantineTable.Thead>

        <MantineTable.Tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <MantineTable.Tr key={row.id}>
                {row.getAllCells().map((cell) => (
                  <MantineTable.Td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </MantineTable.Td>
                ))}
              </MantineTable.Tr>
            ))
          ) : (
            <MantineTable.Tr>
              <MantineTable.Td
                colSpan={table.getAllLeafColumns().length}
              >
                No records found.
              </MantineTable.Td>
            </MantineTable.Tr>
          )}
        </MantineTable.Tbody>
      </MantineTable>

      <Pagination table={table} />
    </ScrollArea>
  );
}
