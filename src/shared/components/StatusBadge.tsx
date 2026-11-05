import { Badge } from "@mantine/core";

type StatusBadgeProps = {
  enabled: boolean;
}

export function StatusBadge({ enabled }: StatusBadgeProps) {
  return (
    <Badge color={enabled ? "green" : "red"} variant="light">
      {enabled ? "Enabled" : "Disabled"}
    </Badge>
  );
}