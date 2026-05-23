import React from "react";
import { Modal, List, Stack } from "@mantine/core";

export default function RulePopUp({ open, onClose }) {
  return (
    <Modal opened={open} onClose={onClose} title="Rules" size="sm">
      <Stack gap="xs">
        <List size="sm" spacing={6}>
          <List.Item>Move by selecting a unit and clicking a tile</List.Item>
          <List.Item>Attack uses dice roll comparison</List.Item>
          <List.Item>Back attacks give -6 defense penalty</List.Item>
          <List.Item>Archers take -6 defense vs non-archers</List.Item>
          <List.Item>Spearmen beat Cavalry (+2)</List.Item>
          <List.Item>Swordsmen beat Spearmen (+2)</List.Item>
          <List.Item>Swordsmen beat Cavalry (+1)</List.Item>
          <List.Item>Swordsmen beat Archers (+1)</List.Item>
          <List.Item>Attack mode locks movement</List.Item>
          <List.Item>Archers reload for 2 turns after attacking</List.Item>
        </List>
      </Stack>
    </Modal>
  );
}
