import { Group, Pagination as MantinePagination, Select, Text } from '@mantine/core';

type Props = {
  table: {
    getRowModel: () => { rows: unknown[] };
    getRowCount: () => number;
    getPageCount: () => number;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
    state: {
      pagination: {
        pageIndex: number;
        pageSize: number;
      };
    };
  };
};

export function Pagination({ table }: Props) {
  const { pageIndex, pageSize } = table.state.pagination;

  const totalRows = table.getRowCount();
  const pageCount = table.getPageCount();
  const currentRows = table.getRowModel().rows.length;

  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min(pageIndex * pageSize + currentRows, totalRows);

  return (
    <Group justify="space-between" align="center" mt={10}>
      <Text size="sm" c="dimmed">
        Showing {startRow} - {endRow} of {totalRows} rows
      </Text>

      <Group gap="md">
        <Text size="sm">
          Page {pageCount > 0 ? pageIndex + 1 : 0} of {pageCount}
        </Text>

        <MantinePagination
          total={pageCount}
          value={pageIndex + 1}
          onChange={(page) => table.setPageIndex(page - 1)}
          disabled={pageCount === 0}
          size="sm"
        />
      </Group>

      <Select
        w={110}
        size="sm"
        value={String(pageSize)}
        onChange={(value) => {
          if (value) table.setPageSize(Number(value));
        }}
        data={['10', '20', '30', '40', '50'].map((size) => ({
          value: size,
          label: `${size} / page`,
        }))}
        allowDeselect={false}
      />
    </Group>
  );
}
