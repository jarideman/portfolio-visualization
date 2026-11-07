import {
  Card,
  SimpleGrid,
  Group,
  Stack,
  Text,
  Title,
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
import { StatCard } from "../shared/components/StatCard";

export default function AccountInfo() {
  const { data: accountInfo, isPending, error } = useAccountInfo();

  if (isPending) {
    return <Text c="dimmed">Loading account information...</Text>;
  }

  if (error) {
    return <Text c="red">{error.message}</Text>;
  }

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

  const accountDetails = [
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

  const cardProps = {
    bg: "dark.7",
    c: "gray.0",
    radius: "lg",
    p: "lg",
    withBorder: true,
    style: {
      borderColor: "#263247",
    },
  };

  return (
    <Stack w="100%" mih="100vh" gap="xl">

      <Stack gap={4}>
        <Title order={1} size="26px" c="gray.0">
          Account info
        </Title>

        <Text c="dimmed" size="sm">
          Monitor your trading account
        </Text>
      </Stack>

      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          lg: 3,
        }}
        spacing="lg"
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </SimpleGrid>

      <SimpleGrid
        cols={{
          base: 1,
          md: 2,
        }}
        spacing="lg"
      >
        <Card {...cardProps}>
          <Group gap="sm" mb="md">
            <ThemeIcon
              color="blue"
              variant="light"
              size="lg"
              radius="md"
            >
              <UserRound size={19} />
            </ThemeIcon>

            <Text fw={600} size="md">
              Account Details
            </Text>
          </Group>

          <Divider color="dark.4" mb="xs" />

          <Stack gap={0}>
            {accountDetails.map((detail) => (
              <DetailRow
                key={detail.label}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </Stack>
        </Card>

        <Card {...cardProps}>
          <Group gap="sm" mb="md">
            <ThemeIcon
              color="blue"
              variant="light"
              size="lg"
              radius="md"
            >
              <ShieldCheck size={19} />
            </ThemeIcon>

            <Text fw={600} size="md">
              Trading Permissions
            </Text>
          </Group>

          <Divider color="dark.4" mb="xs" />

          <Stack gap={0}>
            <DetailRow
              label="Trading allowed"
              customValue={
                <StatusBadge enabled={accountInfo.trade_allowed} />
              }
            />

            <DetailRow
              label="Expert Advisor"
              customValue={
                <StatusBadge enabled={accountInfo.trade_expert} />
              }
            />
          </Stack>
        </Card>

      </SimpleGrid>
    </Stack>
  );
}
