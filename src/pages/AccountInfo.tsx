import { View } from "react-native";
import { useAccountInfo } from "../account/hooks/use-account-info";
import { DataList, Text } from "@mantine/core";

export default function AccountInfo() {
  const { data: accountInfo, isPending, error } = useAccountInfo()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const data = [
    { label: 'Account number', value: accountInfo.login },
    { label: 'Name', value: accountInfo.name },
    { label: 'Leverage', value: accountInfo.leverage },
    { label: 'Balance', value: accountInfo.balance },
    { label: 'Equity', value: accountInfo.equity },
    { label: 'Server', value: accountInfo.server },
    { label: 'Trade allowed', value: String(accountInfo.trade_allowed) },
    { label: 'Trade expert enabled', value: String(accountInfo.trade_expert) },
  ];

  return (
    <View>
      <Text>Account info</Text>

      <DataList>
        {data.map((item) => (
          <DataList.Item key={item.label}>
            <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
            <DataList.ItemValue>{item.value}</DataList.ItemValue>
          </DataList.Item>
        ))}
      </DataList>
    </View>
  );
}
