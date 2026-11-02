import type { OpenPosition } from "../types";
import { ScrollView } from "react-native";
import { Table } from "../../shared/components/Table";
import { useOpenPositions } from "../hooks/use-open-positions";
import ProfitText from "../../shared/components/ProfitText";
import { Badge, Text } from "@mantine/core";
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
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
  ]

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const badges: Array<string> = [...new Set<string>(data.map((item: OpenPosition) => item.symbol))]

  return (
    <ScrollView>
      <Text>Open positions: {data.length}</Text>

      <ScrollView horizontal>
        {badges.map((value: string, index: number) => (
          <Badge key={index}>{value}</Badge>
        ))}
      </ScrollView>

      <Table key="open-positions-table" data={data} columns={columns} />
    </ScrollView>
  )
}
