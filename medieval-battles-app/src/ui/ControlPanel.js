import React from "react";
import { Button, Stack, Text, Paper, Divider, Badge, Group, useMantineColorScheme } from "@mantine/core";

export default function ControlPanel({
  selectedUnit,
  attackMode,
  turn,
  currentPlayer,
  onEndTurn,
  onRotate,
  onToggleAttack,
  onEndUnitTurn,
  onShowRules,
}) {
  const unitExhausted = selectedUnit && selectedUnit.moveLeft === 0 && selectedUnit.hasAttacked;
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Paper shadow="sm" p="md" w={190} withBorder style={{ backgroundColor: isDark ? "#2c2e33" : "#d1d5db" }}>
      <Stack gap="sm">
        <Text fw={700} size="lg" ta="center">Medieval Battles</Text>

        <Group justify="center" gap="xs">
          <Badge color="blue" variant="light">Turn {turn + 1}</Badge>
          <Badge color={currentPlayer === 0 ? "teal" : "red"} variant="light">
            Player {currentPlayer + 1}
          </Badge>
        </Group>

        <Divider />

        <Button fullWidth onClick={onEndTurn} color="blue" size="sm">
          End Turn
        </Button>

        <Button
          fullWidth
          disabled={!selectedUnit}
          onClick={onRotate}
          variant="outline"
          color="gray"
          size="sm"
        >
          Rotate
        </Button>

        <Button
          fullWidth
          disabled={!selectedUnit || !!(selectedUnit && selectedUnit.hasAttacked)}
          onClick={onToggleAttack}
          color={attackMode ? "red" : "orange"}
          size="sm"
        >
          {attackMode ? "Cancel Attack" : "Attack"}
        </Button>

        <Button
          fullWidth
          disabled={!selectedUnit || !!unitExhausted}
          onClick={onEndUnitTurn}
          variant="light"
          color="gray"
          size="sm"
        >
          End Unit Turn
        </Button>

        <Divider />

        <Button fullWidth onClick={onShowRules} color="yellow" variant="light" size="xs">
          Rules
        </Button>

        <Button
          fullWidth
          onClick={() => setColorScheme(isDark ? "light" : "dark")}
          variant="subtle"
          color="gray"
          size="xs"
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </Button>
      </Stack>
    </Paper>
  );
}
