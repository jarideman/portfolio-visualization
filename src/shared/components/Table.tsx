import { ScrollArea, Table as MantineTable } from '@mantine/core';
import {
  flexRender,
  type RowData,
  type TableFeatures,
  type Table as TanStackTable,
} from '@tanstack/react-table';

type Props<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = {
  table: TanStackTable<TFeatures, TData>;
};

export function Table<
  TFeatures extends TableFeatures,
  TData extends RowData,
>({ table }: Props<TFeatures, TData>) {
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
                <MantineTable.Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
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
    </ScrollArea>
  );
}