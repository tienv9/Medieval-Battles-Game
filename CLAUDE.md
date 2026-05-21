# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `medieval-battles-app/`:

```bash
npm start       # Dev server at localhost:3000
npm test        # Run tests (watch mode)
npm run build   # Production build
```

No TypeScript, no custom ESLint config, no Jest config — everything uses Create React App defaults.

## Architecture

The game separates three concerns that must stay decoupled:

**Game engine** (`src/engine/`) — plain JS classes with no React dependency.
- `UnitBase.js` — base class: movement budget, facing (N/E/S/W), turn reset logic
- `Unit.js` — extends UnitBase with unit type and stats lookup
- `UnitTypes.js` — stat definitions for the four unit types (move range, attack range, etc.)
- `setupUnits.js` — `createUnits()` initializes the 32-unit starting state
- `Player.js` — owns a collection of units (not yet wired into game flow)

**UI** (`src/ui/`) — all React components.
- `Board.js` — renders the 10×10 grid, computes valid-move and attack-range tile sets, delegates clicks to App
- `Box.js` — single grid cell; handles color coding (green/yellow/gray for current player's units) and icons
- `ControlPanel.js` — End Turn, Rotate, Attack, End Unit Turn buttons plus turn/player display
- `CombatLog.js` — fixed-position log panel showing last combat outcome
- `RulePopUp.js` — rules overlay modal

**Utilities** (`src/utils/`) — pure functions, no React.
- `CombatUtils.js` — `getCombatBonus`, `isBehindAttack`, `resolveCombat` (returns `{ killed, logs }`), `roll`
- `directions.js` — `rotateClockwise(facing)`

**App.js** — sole source of game state via `useState`. Owns turn management and all event handlers (`handleClick`, `endTurn`, `handleRotate`, `handleToggleAttack`, `handleEndUnitTurn`). All state mutations flow through here.

## Key game rules encoded in the code

- Units face one of four directions (N/E/S/W); attacks are frontal-only.
- Side and rear attacks auto-destroy the defender without a dice roll.
- Type matchups in `CombatUtils.js`: spearmen beat cavalry, swordsmen beat spearmen, archers beat infantry, cavalry beats archers.
- Frontal combat uses d6 rolls modified by type bonuses.
- Formation movement: adjacent friendly units may move as a group; speed is determined by unit composition.
- Grid is 10×10; deployment rows are rows 8–9 (Player 0, faces N) and rows 0–1 (Player 1, faces S).
