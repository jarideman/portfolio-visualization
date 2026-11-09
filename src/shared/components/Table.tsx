import { ScrollArea, Table as MantineTable, Group } from '@mantine/core';
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
  })

  const table = useTable({
    key: key,
    features,
    columns,
    data,

    defaultColumn: {
      enableSorting: false,
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
              {headerGroup.headers.map((header) => (
                <MantineTable.Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    userSelect: 'none',
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <Group gap="xs">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      {header.column.getCanSort() && (
                        <span>
                          {{
                            asc: '↑',
                            desc: '↓',
                          }[header.column.getIsSorted() as string] ?? '↕'}
                        </span>
                      )}
                    </Group>
                  )}
                </MantineTable.Th>
              ))}
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
