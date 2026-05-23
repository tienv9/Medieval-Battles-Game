import React from "react";
import { Paper, Text, Stack, ScrollArea } from "@mantine/core";

export default function CombatLog({ logs }) {
  return (
    <Paper
      shadow="md"
      p="sm"
      w={230}
      withBorder
      style={{ position: "fixed", bottom: 16, right: 16 }}
    >
      <Text fw={700} size="sm" mb={6}>
        Combat Log
      </Text>
      <ScrollArea h={90}>
        <Stack gap={2}>
          {logs.length === 0 ? (
            <Text c="dimmed" size="xs">
              No actions yet
            </Text>
          ) : (
            logs.map((line, i) => (
              <Text key={i} size="xs">
                {line}
              </Text>
            ))
          )}
        </Stack>
      </ScrollArea>
    </Paper>
  );
}
