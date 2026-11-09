import { useState } from "react";
import { ScrollView } from "react-native";
import { Badge } from "@mantine/core";
import {
  filterFn_equals,
  type ColumnDef,
  type TableFeatures,
} from "@tanstack/react-table";

import type { ClosedPosition } from "../types";
import { useClosedPositions } from "../hooks/use-closed-positions";

import { Table } from "../../shared/components/Table";
import ProfitText from "../../shared/components/ProfitText";

import { DateRangeFilter } from "../../shared/components/filters/DateRangeFilter";
import { OptionsFilter } from "../../shared/components/filters/OptionsFilter";

import { dateRangeFilter } from "../../shared/utils/dateRangeFilter";
import { profitFilter } from "../../shared/utils/profitFilter";
import { multiSelectFilter } from "../../shared/utils/multiSelectFilter";

type ColumnFilter = {
  id: string;
  value: unknown;
};

export function ClosedPositionsTable() {
  const { data, isPending, error } = useClosedPositions();

  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const selectedSymbols =
    (columnFilters.find((filter) => filter.id === "symbol")
      ?.value as string[]) ?? [];

  const toggleSymbol = (symbol: string) => {
    setColumnFilters((current) => {
      const existing = current.find((filter) => filter.id === "symbol");

      const selected = (existing?.value as string[]) ?? [];

      const updated = selected.includes(symbol)
        ? selected.filter((item) => item !== symbol)
        : [...selected, symbol];

      return [
        ...current.filter((filter) => filter.id !== "symbol"),
        ...(updated.length
          ? [{ id: "symbol", value: updated }]
          : []),
      ];
    });
  };

  const clearSymbolFilter = () => {
    setColumnFilters((current) =>
      current.filter((filter) => filter.id !== "symbol")
    );
  };

  const columns: ColumnDef<TableFeatures, ClosedPosition>[] = [
    {
      accessorKey: "symbol",
      header: "Symbol",
      enableColumnFilter: true,
      filterFn: multiSelectFilter,
    },
    {
      accessorKey: "type",
      header: "Type",
      enableColumnFilter: true,
      filterFn: filterFn_equals,
      meta: {
        Filter: OptionsFilter,
        filterProps: {
          options: [
            { label: "Buy", value: "buy" },
            { label: "Sell", value: "sell" },
          ],
          placeholder: "Type",
        },
      },
    },
    {
      accessorKey: "volume",
      header: "Volume",
      enableSorting: true,
    },
    {
      accessorKey: "price_open",
      header: "Entry price",
    },
    {
      accessorKey: "price_exit",
      header: "Exit price",
    },
    {
      accessorKey: "profit",
      header: "Profit",
      cell: (info) => <ProfitText value={info.getValue<number>()} />,
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: profitFilter,
      meta: {
        Filter: OptionsFilter,
        filterProps: {
          options: [
            { label: "Profit", value: "profit" },
            { label: "Loss", value: "loss" },
            { label: "Break even", value: "break_even" },
          ],
          placeholder: "Result",
        },
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: dateRangeFilter,
      meta: {
        Filter: DateRangeFilter,
      },
    },
  ];

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const badges = [
    ...new Set(data.map((item: ClosedPosition) => item.symbol)),
  ];

  return (
    <ScrollView>
      <ScrollView horizontal>
        <Badge
          my={18}
          mr={5}
          variant={selectedSymbols.length === 0 ? "filled" : "outline"}
          color={selectedSymbols.length === 0 ? "blue" : "gray"}
          style={{ cursor: "pointer" }}
          onClick={clearSymbolFilter}
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
              variant={selected ? "filled" : "outline"}
              color={selected ? "blue" : "gray"}
              style={{ cursor: "pointer" }}
              onClick={() => toggleSymbol(symbol)}
            >
              {symbol}
            </Badge>
          );
        })}
      </ScrollView>

      <Table
        key="closed-positions-table"
        data={data}
        columns={columns}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
      />
    </ScrollView>
  );
}
