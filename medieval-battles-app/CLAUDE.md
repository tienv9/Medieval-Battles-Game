# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Start Development Server**: `npm start` or `yarn dev`
- **Build for Production**: `npm run build` or `yarn build`
- **Lint Code**: `npm run lint` or `yarn lint`
- **Run All Tests**: `npm test` or `yarn test`
- **Run a Single Test**: `npm test -- --testNamePattern="TestName"` or `yarn test --testNamePattern="TestName"`

## Project Architecture

The project follows a typical React application structure with:
1. **Component-Based Structure**: UI components are organized in `src/` with reusable utilities in `src/utils/`.
2. **State Management**: Centralized state handling for game mechanics (e.g., combat, movement) likely uses React Context or a state management library.
3. **Routing**: Navigation between game views (e.g., rules, board) is managed via React Router.
4. **Combat System**: Implements directional bonuses and attack cancellation logic in `src/App.js` and related modules.
5. **UI Components**: Includes buttons, boards, and rule displays with responsive design adjustments (e.g., centering the board).