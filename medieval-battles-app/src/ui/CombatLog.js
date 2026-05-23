import React from "react";
import { Paper, Text, Stack, ScrollArea } from "@mantine/core";

export default function CombatLog({ logs }) {
  return (
    <Paper
      shadow="md"
      p="sm"
      w={230}
      style={{ position: "fixed", bottom: 16, right: 16, backgroundColor: "#000" }}
    >
      <Text fw={700} size="sm" mb={6} c="#d1d5db">
        Combat Log
      </Text>
      <ScrollArea h={90}>
        <Stack gap={2}>
          {logs.length === 0 ? (
            <Text c="#6b7280" size="xs">
              No actions yet
            </Text>
          ) : (
            logs.map((line, i) => (
              <Text key={i} size="xs" c="#d1d5db">
                {line}
              </Text>
            ))
          )}
        </Stack>
      </ScrollArea>
    </Paper>
  );
}
