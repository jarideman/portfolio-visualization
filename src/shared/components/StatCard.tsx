import {
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";

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
    <Card>
      <Group justify="space-between" align="center">
        <Text c="dimmed" size="sm" fw={500}>
          {label}
        </Text>

        <ThemeIcon
          size={42}
          radius="md"
          variant="light"
          color={iconColor}
        >
          <Icon size={21} />
        </ThemeIcon>
      </Group>

      <Stack gap={4} mt="lg">
        <Text
          c="gray.0"
          size="27px"
          fw={700}
          style={{
            letterSpacing: "-0.5px",
          }}
        >
          {value}
        </Text>

        <Text c="dimmed" size="xs">
          {description}
        </Text>
      </Stack>
    </Card>
  );
}
