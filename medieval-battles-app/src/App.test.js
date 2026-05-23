import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import App from './App';

const renderApp = () =>
  render(
    <MantineProvider>
      <App />
    </MantineProvider>
  );

describe('App smoke tests', () => {
  test('renders control panel buttons', () => {
    renderApp();
    expect(screen.getByText('End Turn')).toBeInTheDocument();
    expect(screen.getByText('Rotate')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Rules')).toBeInTheDocument();
  });

  test('turn display starts at turn 1 for player 1', () => {
    renderApp();
    expect(screen.getByText('Turn 1')).toBeInTheDocument();
    expect(screen.getByText('Player 1')).toBeInTheDocument();
  });

  test('End Turn advances turn counter and switches player', () => {
    renderApp();
    userEvent.click(screen.getByText('End Turn'));
    expect(screen.getByText('Turn 2')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });

  test('Win button triggers win popup', async () => {
    renderApp();
    userEvent.click(screen.getByText('Test Win'));
    expect(await screen.findByText('Player 1 Wins!')).toBeInTheDocument();
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });
});
