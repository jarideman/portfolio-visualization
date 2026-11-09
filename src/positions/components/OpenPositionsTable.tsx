import type { OpenPosition } from "../types";
import { ScrollView } from "react-native";
import { Table } from "../../shared/components/Table";
import { useOpenPositions } from "../hooks/use-open-positions";
import ProfitText from "../../shared/components/ProfitText";
import { Badge } from "@mantine/core";
import type { ColumnDef, TableFeatures } from "@tanstack/react-table";

export function OpenPositionsTable() {
  const { data, isPending, error } = useOpenPositions()

  const columns: ColumnDef<TableFeatures, OpenPosition>[] = [
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
      accessorKey: 'price_current',
      header: 'Current price',
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

  const badges: Array<string> = [...new Set<string>(data.map((item: OpenPosition) => item.symbol))]

  return (
    <ScrollView>
      <ScrollView horizontal>
        {badges.map((value: string, index: number) => (
          <Badge key={index} my={18} mr={badges.length - 1 !== index ? 5 : 0}>{value}</Badge>
        ))}
      </ScrollView>

      <Table key="open-positions-table" data={data} columns={columns} />
    </ScrollView>
  )
}
