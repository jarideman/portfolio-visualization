import { Text, View } from "react-native";
import { useAccountInfo } from "../account/hooks/use-account-info";
import ProfitText from "../shared/components/ProfitText";

export default function AccountInfo() {
  const { data: accountInfo, isPending, error } = useAccountInfo()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  
  return (
    <View>
      <Text>Account info</Text>

      <Text>Account number: {accountInfo.login}</Text>
      <Text>Name: {accountInfo.name}</Text>
      <Text>Leverage: {accountInfo.leverage}</Text>
      <Text>Balance: {accountInfo.balance}</Text>
      <Text>Equity: {accountInfo.equity}</Text>
      <Text>Profit: <ProfitText value={accountInfo.profit} /></Text>
      <Text>Server: {accountInfo.server}</Text>
      <Text>Trade allowed: {String(accountInfo.trade_allowed)}</Text>
      <Text>Trade expert enabled: {String(accountInfo.trade_expert)}</Text>
    </View>
  );
}
