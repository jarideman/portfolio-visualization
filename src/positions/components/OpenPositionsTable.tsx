import { tableFeatures, useTable, type ColumnDef } from "@tanstack/react-table";
import type { ClosedPosition } from "../types";
import { ScrollView, Text } from "react-native";
import { Table } from "../../shared/components/Table";
import { useOpenPositions } from "../hooks/use-open-positions";

export function OpenPositionsTable() {
  const { data, isPending, error} = useOpenPositions()

  const features = tableFeatures({})

  const columns: Array<ColumnDef<typeof features, ClosedPosition>> = [
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
      header: 'Price open',
    },
    {
      accessorKey: 'profit',
      header: 'Profit',
      cell: (info) => {
        const profit = info.getValue<number>()
        
        const color =
          profit === 0 ? 'grey' :
          profit > 0 ? 'green' :
          'red';

        return <Text style={{color: color}}>{profit}</Text>
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
  ]

  const openPositionsTable = useTable({
    key: 'open-positions-table',
    features,
    columns,
    data,
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  
  return (
    <ScrollView>
        <Text>Open positions: {data.length}</Text>

        <Table table={openPositionsTable}/>
    </ScrollView>
  )
}
