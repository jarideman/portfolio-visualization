type PaginationTable = {
  firstPage: () => void;
  previousPage: () => void;
  nextPage: () => void;
  lastPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  getCanLastPage: () => boolean;
  getPageCount: () => number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  getRowModel: () => {
    rows: unknown[];
  };
  getRowCount: () => number;
  state: {
    pagination: {
      pageIndex: number;
      pageSize: number;
    };
  };
};

type Props<TTable extends PaginationTable> = {
  table: TTable;
};

export function Pagination<TTable extends PaginationTable>({
  table,
}: Props<TTable>) {
  const pageIndex = table.state.pagination.pageIndex;
  const pageSize = table.state.pagination.pageSize;
  const pageCount = table.getPageCount();

  return (
    <>
      <div className="controls">
        <button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>

        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>

        <button
          onClick={() => table.lastPage()}
          disabled={!table.getCanLastPage()}
        >
          {'>>'}
        </button>

        <span>
          Page <strong>{pageIndex + 1} of {pageCount}</strong>
        </span>

        <input
          type="number"
          min={1}
          max={pageCount}
          value={pageIndex + 1}
          onChange={(e) => {
            const page = Number(e.target.value) - 1;

            if (Number.isFinite(page)) {
              table.setPageIndex(
                Math.max(0, Math.min(page, pageCount - 1))
              );
            }
          }}
        />

        <select
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        Showing {table.getRowModel().rows.length} of{' '}
        {table.getRowCount()} Rows
      </div>
    </>
  );
}
