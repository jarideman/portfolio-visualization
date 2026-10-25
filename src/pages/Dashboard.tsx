import { Text, View } from "react-native";
import { PersonTable } from "../shared/components/PersonTable";

export default function Dashboard() {
  return (
    <View>
      <Text>Dashboard</Text>

      <PersonTable />
    </View>
  );
}