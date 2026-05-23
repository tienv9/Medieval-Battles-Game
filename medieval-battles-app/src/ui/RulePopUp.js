import React from "react";
import { Modal, List, Stack, Text, Divider } from "@mantine/core";

export default function RulePopUp({ open, onClose }) {
  return (
    <Modal opened={open} onClose={onClose} title="How to Play" size="md">
      <Stack gap="md">
        <Stack gap={4}>
          <Text fw={600} size="sm">Movement</Text>
          <List size="sm" spacing={4}>
            <List.Item>Click one of your units to select it, then click a highlighted tile to move it.</List.Item>
            <List.Item>Each unit has a limited number of moves per turn based on its type.</List.Item>
            <List.Item>Units face a direction (N/E/S/W) — use Rotate to change facing before or after moving.</List.Item>
          </List>
        </Stack>

        <Divider />

        <Stack gap={4}>
          <Text fw={600} size="sm">Combat</Text>
          <List size="sm" spacing={4}>
            <List.Item>Press Attack, then click an enemy unit within range to engage.</List.Item>
            <List.Item>Frontal attacks compare dice rolls — the higher roll wins.</List.Item>
            <List.Item>Attacking from the side or rear gives the defender a -6 penalty, almost guaranteeing a kill.</List.Item>
            <List.Item>Each unit can only attack once per turn. Entering attack mode locks movement.</List.Item>
          </List>
        </Stack>

        <Divider />

        <Stack gap={4}>
          <Text fw={600} size="sm">Unit Types & Matchups</Text>
          <List size="sm" spacing={4}>
            <List.Item><Text span fw={500}>Spearmen</Text> — strong vs Cavalry (+2 attack)</List.Item>
            <List.Item><Text span fw={500}>Swordsmen</Text> — strong vs Spearmen (+2), Cavalry (+1), and Archers (+1)</List.Item>
            <List.Item><Text span fw={500}>Cavalry</Text> — fast movers (4 tiles), weak vs Spearmen</List.Item>
            <List.Item><Text span fw={500}>Archers</Text> — long range (5 tiles), but take -6 defense when attacked by any non-archer. Must reload for 2 turns after firing.</List.Item>
          </List>
        </Stack>

        <Divider />

        <Stack gap={4}>
          <Text fw={600} size="sm">Winning</Text>
          <List size="sm" spacing={4}>
            <List.Item>Eliminate all enemy units to win. Click End Turn to pass play to your opponent.</List.Item>
          </List>
        </Stack>
      </Stack>
    </Modal>
  );
}
