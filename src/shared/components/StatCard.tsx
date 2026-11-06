import { Card, Group, Text, ThemeIcon } from "@mantine/core";

import "./StatCard.css";

type StatCardProps = {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
};

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  iconColor,
}: StatCardProps) {
  return (
    <Card className="account-stat-card" radius="lg" padding="lg">
      <Group justify="space-between" align="center">
        <Text className="stat-label">{label}</Text>

        <ThemeIcon
          size={42}
          radius="md"
          variant="light"
          color={iconColor}
        >
          <Icon size={21} />
        </ThemeIcon>
      </Group>

      <Text className="stat-value">{value}</Text>

      <Text className="stat-description">{description}</Text>
    </Card>
  );
}