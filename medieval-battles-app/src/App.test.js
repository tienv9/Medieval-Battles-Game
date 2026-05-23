import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App smoke tests', () => {
  test('renders control panel buttons', () => {
    render(<App />);
    expect(screen.getByText('End Turn')).toBeInTheDocument();
    expect(screen.getByText('Rotate')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Rules')).toBeInTheDocument();
  });

  test('turn display starts at turn 0 for player 0', () => {
    render(<App />);
    expect(screen.getByText('Turn: 0 | Player 0')).toBeInTheDocument();
  });

  test('End Turn advances turn counter and switches player', () => {
    render(<App />);
    userEvent.click(screen.getByText('End Turn'));
    expect(screen.getByText('Turn: 1 | Player 1')).toBeInTheDocument();
  });

  test('Win button triggers win popup', () => {
    render(<App />);
    userEvent.click(screen.getByText('Test Win'));
    expect(screen.getByText('Player 1 Wins!')).toBeInTheDocument();
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });
});
