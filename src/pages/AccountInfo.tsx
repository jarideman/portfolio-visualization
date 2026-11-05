import {
  Card,
  SimpleGrid,
  Group,
  Stack,
  Text,
  Divider,
  ThemeIcon,
  Alert,
  Skeleton,
} from "@mantine/core";

import {
  Wallet,
  ChartNoAxesCombined,
  Gauge,
  UserRound,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import { useAccountInfo } from "../account/hooks/use-account-info";

import { DetailRow } from "../shared/components/DetailRow";
import { StatusBadge } from "../shared/components/StatusBadge";

import "./AccountInfo.css";


interface StatCardProps {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <Card className="account-stat-card" radius="lg" padding="lg">
      <Group justify="space-between" align="center">
        <Text className="stat-label">{label}</Text>

        <ThemeIcon
          size={42}
          radius="md"
          variant="light"
          color={color}
        >
          <Icon size={21} />
        </ThemeIcon>
      </Group>

      <Text className="stat-value">{value}</Text>

      <Text className="stat-description">{description}</Text>
    </Card>
  );
}

export default function AccountInfo() {
  const {
    data: accountInfo,
    isPending,
    error,
  } = useAccountInfo();

  if (isPending) {
    return (
      <div className="account-page">
        <Stack gap="lg">
          <Skeleton height={35} width={220} />

          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Skeleton height={150} radius="lg" />
            <Skeleton height={150} radius="lg" />
            <Skeleton height={150} radius="lg" />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <Skeleton height={230} radius="lg" />
            <Skeleton height={230} radius="lg" />
          </SimpleGrid>
        </Stack>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        color="red"
        title="Unable to load account"
        icon={<AlertCircle size={18} />}
      >
        {error.message}
      </Alert>
    );
  }

  if (!accountInfo) {
    return (
      <Alert color="yellow" title="No account information available">
        No account data was returned.
      </Alert>
    );
  }

  const stats: StatCardProps[] = [
    {
      label: "Balance",
      value: accountInfo.balance.toFixed(2),
      description: "Account balance",
      icon: Wallet,
      color: "blue",
    },
    {
      label: "Equity",
      value: accountInfo.equity.toFixed(2),
      description: "Current account equity",
      icon: ChartNoAxesCombined,
      color: "green",
    },
    {
      label: "Leverage",
      value: `1:${accountInfo.leverage}`,
      description: "Account leverage",
      icon: Gauge,
      color: "violet",
    },
  ];

  return (
    <div className="account-page">
      <div className="account-header">
        <div>
          <h1>Account Overview</h1>
          <p>Monitor your trading account</p>
        </div>
      </div>

      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="lg"
        mb="lg"
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </SimpleGrid>

      <SimpleGrid
        cols={{ base: 1, md: 2 }}
        spacing="lg"
      >
        <Card className="account-info-card" radius="lg" padding="lg">
          <Group gap="sm" mb="md">
            <ThemeIcon color="blue" variant="light" size="lg">
              <UserRound size={19} />
            </ThemeIcon>

            <Text className="card-title">Account Details</Text>
          </Group>

          <Divider className="account-divider" />

          <Stack gap={0}>
            <DetailRow
              label="Account number"
              value={accountInfo.login}
            />

            <DetailRow
              label="Name"
              value={accountInfo.name}
            />

            <DetailRow
              label="Server"
              value={accountInfo.server}
            />

            <DetailRow
              label="Leverage"
              value={`1:${accountInfo.leverage}`}
            />
          </Stack>
        </Card>

        <Card className="account-info-card" radius="lg" padding="lg">
          <Group gap="sm" mb="md">
            <ThemeIcon color="blue" variant="light" size="lg">
              <ShieldCheck size={19} />
            </ThemeIcon>

            <Text className="card-title">
              Trading Permissions
            </Text>
          </Group>

          <Divider className="account-divider" />

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