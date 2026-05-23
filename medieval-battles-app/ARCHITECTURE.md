# Architecture

The codebase is split into three layers that don't cross: **engine** (pure game logic), **ui** (React components), and **utils** (standalone helper functions). `App.js` sits on top and connects them all.

---

## `src/App.js`

The only place that holds game state. Everything else is either a pure function or a display component.

| State / Handler | What it does |
|---|---|
| `units` | Array of all living Unit objects on the board |
| `selected` | ID of the currently selected unit, or null |
| `turn` | Turn counter; even = Player 1, odd = Player 2 |
| `attackMode` | Whether the selected unit is in attack mode |
| `combatLog` | Lines from the last combat, shown in CombatLog |
| `winner` | Set to the winning player number when the game ends |
| `handleClick(x, y)` | Main click handler — selects a unit, moves it, or fires an attack depending on state |
| `endTurn()` | Resets all units for the next player and advances the turn counter |
| `handleRotate()` | Rotates the selected unit 90° clockwise |
| `handleToggleAttack()` | Enters/exits attack mode; locks movement while active |
| `handleEndUnitTurn()` | Marks the selected unit as done for this turn (no more moves or attacks) |

---

## `src/engine/`

Plain JS classes — no React, no imports from ui or utils.

### `UnitTypes.js`
Defines the stat table for each unit type.

| Export | What it does |
|---|---|
| `UNIT_TYPES` | Object with `move` (tiles per turn) and `range` (attack reach) for archer, swordsman, spearman, cavalry |

### `UnitBase.js`
Base class with movement and turn tracking.

| Method | What it does |
|---|---|
| `constructor` | Sets position, facing, owner, and resets `moveLeft` / `hasAttacked` |
| `resetTurn()` | Restores movement and clears the attacked flag at the start of each turn |
| `moveTo(x, y, cost)` | Moves the unit and deducts the movement cost; returns false if not enough moves left |
| `rotate(newFacing)` | Changes the unit's facing direction |

### `Unit.js`
Extends UnitBase with type, stats, and the archer reload mechanic.

| Method | What it does |
|---|---|
| `constructor` | Calls UnitBase, looks up stats from `UNIT_TYPES`, initialises `reloadTurnsLeft` |
| `resetTurn()` | If the archer is reloading, counts down one turn and keeps it locked; otherwise calls the base reset |
| `canMove(distance)` | Returns true if the unit has enough movement budget left |
| `canAttack()` | Returns true if the unit hasn't attacked yet this turn |
| `attack()` | Marks the unit as having attacked; sets a 2-turn reload on archers |

### `setupUnits.js`

| Export | What it does |
|---|---|
| `createUnits()` | Builds the 32-unit starting state — 8 swordsmen + 8 spearmen in the back row, 4 cavalry + 4 archers in the front row, mirrored for both players |

---

## `src/utils/`

Pure functions with no React dependency.

### `CombatUtils.js`

| Export | What it does |
|---|---|
| `roll()` | Returns a random integer 1–6 (one die) |
| `getCombatBonus(attacker, defender)` | Returns the attack modifier based on unit type matchup (e.g. spearman vs cavalry = +2) |
| `isInFront(attacker, target)` | Returns true if the target tile is in the attacker's frontal half — used to restrict which tiles can be attacked |
| `getFlankType(attacker, defender)` | Returns `'front'`, `'side'`, or `'rear'` based on where the attacker is relative to the defender's facing |
| `isBehindAttack(attacker, defender)` | Returns true if the attacker is directly behind the defender (legacy check, still exported) |
| `resolveCombat(attacker, defender)` | Rolls dice for both sides, applies type bonuses and flank penalties (-3 side, -6 rear), and returns `{ killed, logs }` |

### `directions.js`

| Export | What it does |
|---|---|
| `rotateClockwise(facing)` | Given a facing (N/E/S/W), returns the next one clockwise |

---

## `src/ui/`

React components — display only. They receive props and call callbacks; they own no game state.

### `GameBoard.js`
Renders the 10×10 grid.

| Function | What it does |
|---|---|
| `getValidMoves()` | Computes all tiles the selected unit can move to this turn |
| `getAttackTiles()` | Computes all tiles the selected unit can attack — restricted to the frontal arc by `isInFront` |
| render | Draws every cell as a `Box`, passing move/attack highlight flags |

### `Box.js`
One grid cell.

| Function | What it does |
|---|---|
| `getColor()` | Green = current player's unit with moves left, yellow = moves spent but can still attack, grey = exhausted or enemy |
| render | Shows the unit icon (rotated to match facing), a reload overlay when reloading, and dot overlays for selection / move target / attack target |

### `ControlPanel.js`
The sidebar with all the buttons.

Buttons: **End Turn**, **Rotate**, **Attack / Cancel Attack**, **End Unit Turn**, **Rules**, **Dark / Light Mode toggle**. Each maps directly to a callback from App.js.

### `CombatLog.js`
Fixed panel in the bottom-right corner. Receives a `logs` string array and displays it. Shows "No actions yet" when empty.

### `RulePopUp.js`
Modal overlay explaining movement, combat, unit matchups, and the win condition. Opened via the Rules button.

### `WinPopUp.js`
Modal that appears when `winner` is set. Shows which player won and a **Play Again** button that reloads the page.
