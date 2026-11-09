import type { ClosedPosition } from "../types";
import { ScrollView } from "react-native";
import { Table } from "../../shared/components/Table";
import { useClosedPositions } from "../hooks/use-closed-positions";
import ProfitText from "../../shared/components/ProfitText";
import { Badge } from "@mantine/core";
import type { ColumnDef, TableFeatures } from "@tanstack/react-table";

export function ClosedPositionsTable() {
  const { data, isPending, error } = useClosedPositions()

  const columns: ColumnDef<TableFeatures, ClosedPosition>[] = [
    {
      accessorKey: 'symbol',
      header: 'Symbol',
    },
    {
      accessorKey: 'type',
      header: 'Type',
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
      accessorKey: 'price_exit',
      header: 'Exit price',
    },
    {
      accessorKey: 'profit',
      header: 'Profit',
      cell: (info) => <ProfitText value={info.getValue<number>()} />,
      enableSorting: true,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      enableSorting: true,
    },
  ]

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const badges: Array<string> = [...new Set<string>(data.map((item: ClosedPosition) => item.symbol))]

  return (
    <ScrollView>
      <ScrollView horizontal>
        {badges.map((value: string, index: number) => (
          <Badge key={index} my={18} mr={badges.length - 1 !== index ? 5 : 0}>{value}</Badge>
        ))}
      </ScrollView>

      <Table key="closed-positions-table" data={data} columns={columns} />
    </ScrollView >
  )
}
