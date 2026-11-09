import type { OpenPosition } from "../types";
import { ScrollView } from "react-native";
import { Table } from "../../shared/components/Table";
import { useOpenPositions } from "../hooks/use-open-positions";
import ProfitText from "../../shared/components/ProfitText";
import { Badge } from "@mantine/core";
import { filterFn_equals, type ColumnDef, type TableFeatures } from "@tanstack/react-table";
import { OptionsFilter } from "../../shared/components/filters/OptionsFilter";
import { profitFilter } from "../../shared/utils/profitFilter";
import { dateRangeFilter } from "../../shared/utils/dateRangeFilter";
import { DateRangeFilter } from "../../shared/components/filters/DateRangeFilter";
import { useState } from "react";
import { multiSelectFilter } from "../../shared/utils/multiSelectFilter";

export function OpenPositionsTable() {
  const { data, isPending, error } = useOpenPositions()

  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  const toggleSymbol = (symbol: string) => {
    setSelectedSymbols((current) =>
      current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol]
    );
  };

  const columns: ColumnDef<TableFeatures, OpenPosition>[] = [
    {
      accessorKey: 'symbol',
      header: 'Symbol',
      enableColumnFilter: true,
      filterFn: multiSelectFilter,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      enableColumnFilter: true,
      filterFn: filterFn_equals,
      meta: {
        Filter: OptionsFilter,
        filterProps: {
          options: [
            { label: 'Buy', value: 'buy' },
            { label: 'Sell', value: 'sell' },
          ],
          placeholder: 'Type',
        },
      },
    },
    {
      accessorKey: 'volume',
      header: 'Volume',
      enableSorting: true,
    },
    {
      accessorKey: 'price_open',
      header: 'Entry price',
    },
    {
      accessorKey: 'price_current',
      header: 'Current price',
    },
    {
      accessorKey: 'profit',
      header: 'Profit',
      cell: (info) => <ProfitText value={info.getValue<number>()} />,
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: profitFilter,
      meta: {
        Filter: OptionsFilter,
        filterProps: {
          options: [
            { label: 'Profit', value: 'profit' },
            { label: 'Loss', value: 'loss' },
            { label: 'Break even', value: 'break_even' },
          ],
          placeholder: 'Result',
        },
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: dateRangeFilter,
      meta: {
        Filter: DateRangeFilter,
      },
    },
  ]

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const badges: Array<string> = [...new Set<string>(data.map((item: OpenPosition) => item.symbol))]

  return (
    <ScrollView>
      <ScrollView horizontal>
        <Badge
          my={18}
          mr={5}
          variant={selectedSymbols.length === 0 ? 'filled' : 'outline'}
          color={selectedSymbols.length === 0 ? 'blue' : 'gray'}
          style={{ cursor: 'pointer' }}
          onClick={() => setSelectedSymbols([])}
        >
          All
        </Badge>

        {badges.map((symbol) => {
          const selected = selectedSymbols.includes(symbol);

          return (
            <Badge
              key={symbol}
              my={18}
              mr={5}
              variant={selected ? 'filled' : 'outline'}
              color={selected ? 'blue' : 'gray'}
              style={{ cursor: 'pointer' }}
              onClick={() => toggleSymbol(symbol)}
            >
              {symbol}
            </Badge>
          );
        })}
      </ScrollView>

      <Table
        key="open-positions-table"
        data={data}
        columns={columns}
        columnFilters={
          selectedSymbols.length
            ? [{ id: 'symbol', value: selectedSymbols }]
            : []
        }
      />
    </ScrollView>
  )
}
