import React from "react";
import { Modal, Title, Button, Stack } from "@mantine/core";

export default function WinPopUp({ winner }) {
  return (
    <Modal
      opened={winner !== null}
      onClose={() => {}}
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      centered
      size="sm"
    >
      <Stack align="center" gap="xl" py="md">
        <Title order={2}>Player {winner !== null ? winner + 1 : ""} Wins!</Title>
        <Button size="md" color="yellow" onClick={() => window.location.reload()}>
          Play Again
        </Button>
      </Stack>
    </Modal>
  );
}
