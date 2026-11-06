import {
  Card,
  SimpleGrid,
  Group,
  Stack,
  Text,
  Divider,
  ThemeIcon,
} from "@mantine/core";

import {
  Wallet,
  ChartNoAxesCombined,
  Gauge,
  UserRound,
  ShieldCheck,
} from "lucide-react";

import { useAccountInfo } from "../account/hooks/use-account-info";

import { DetailRow } from "../shared/components/DetailRow";
import { StatusBadge } from "../shared/components/StatusBadge";

import "./AccountInfo.css";
import { StatCard } from "../shared/components/StatValue";

export default function AccountInfo() {
  const { data: accountInfo, isPending, error } = useAccountInfo();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const stats = [
    {
      label: "Balance",
      value: accountInfo.balance.toFixed(2),
      description: "Account balance",
      icon: Wallet,
      iconColor: "blue",
    },
    {
      label: "Equity",
      value: accountInfo.equity.toFixed(2),
      description: "Current account equity",
      icon: ChartNoAxesCombined,
      iconColor: "green",
    },
    {
      label: "Leverage",
      value: `1:${accountInfo.leverage}`,
      description: "Account leverage",
      icon: Gauge,
      iconColor: "violet",
    },
  ];

  const accountDetail = [
    {
      label: "Account number",
      value: accountInfo.login,
    },
    {
      label: "Name",
      value: accountInfo.name,
    },
    {
      label: "Server",
      value: accountInfo.server,
    },
    {
      label: "Leverage",
      value: `1:${accountInfo.leverage}`,
    },
  ];

  return (
    <div className="account-page">
      <div className="account-header">
        <div>
          <h1>Account info</h1>
          <p>Monitor your trading account</p>
        </div>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" mb="lg">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Card className="account-info-card" radius="lg" padding="lg">
          <Group gap="sm" mb="md">
            <ThemeIcon color="blue" variant="light" size="lg">
              <UserRound size={19} />
            </ThemeIcon>

            <Text className="card-title">Account Details</Text>
          </Group>

          <Divider />

          <Stack gap={0}>
            {accountDetail.map((detail) => (
              <DetailRow label={detail.label} value={detail.value} />
            ))}
          </Stack>
        </Card>

        <Card className="account-info-card" radius="lg" padding="lg">
          <Group gap="sm" mb="md">
            <ThemeIcon color="blue" variant="light" size="lg">
              <ShieldCheck size={19} />
            </ThemeIcon>

            <Text className="card-title">Trading Permissions</Text>
          </Group>

          <Divider />

          <Stack gap={0}>
            <DetailRow
              label="Trading allowed"
              customValue={<StatusBadge enabled={accountInfo.trade_allowed} />}
            />

            <DetailRow
              label="Expert Advisor"
              customValue={<StatusBadge enabled={accountInfo.trade_expert} />}
            />
          </Stack>
        </Card>
      </SimpleGrid>
    </div>
  );
}
