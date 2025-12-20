# Follow The Path
Product Requirements Document (PRD)

## Overview
"Follow The Path" is a memory-based game where players observe and replicate sequences of highlighted squares on a grid. The game features multiple stages with increasing complexity, a hearts/lives system, and a scoring mechanism that persists across sessions.


## Goals
- Create a progressive memory challenge across 5 stages with 5 levels each.
- Provide quick feedback and a clear sense of advancement.
- Persist scores and present a leaderboard sorted by high score.

## Non-Goals
- Multiplayer or real-time competitive gameplay.
- Online backend or cloud storage.

## User Flow
1. Enter player name.
2. Select a stage or start from the beginning.
3. Watch the game play the path sequence.
4. Replay the path by clicking/tapping squares.
5. Receive success or failure feedback.
6. Advance, retry, or end the run.
7. Update and persist score.
8. View leaderboard.

## Gameplay Rules
- Each level generates a unique path.
- Path lights up squares in sequence ("Playback mode").
- Player repeats squares in exact order ("Input mode").
- Mistakes or timeouts consume a heart.
- Zero hearts = game over.
- Completing a level unlocks the next one.

## Hearts / Lives System
- Player starts with a fixed number of hearts.
- Lost heart on:
  - Wrong square.
  - Timer expiration.
- Hearts displayed in HUD.
- Hearts reset when starting a new game (or optional rule variant).

## Progression System
- 5 stages total.
- Stage grid sizes:
  - Stage 1 -> 4x4
  - Stage 2 -> 5x5
  - Stage 3 -> 6x6
  - Stage 4 -> 7x7
  - Stage 5 -> 8x8
- Each stage contains 5 levels.
- Level complexity increases by required turn count:
  - Level 1 = 0 turns (straight line)
  - Level 2-5 = rising number of required turns

## Difficulty Parameters (Per Stage)
- Playback speed (ms per square).
- Player response time (seconds).
- Required number of turns per level.
- Optional minimum path length.

## Scoring
- Points awarded for each completed level.
- Bonuses:
  - Faster completion.
  - Higher stages.
- Scores persist across sessions.

## Leaderboard
- Structured as: `{ playerName: highestScore }`.
- Stored in localStorage.
- Sorted descending by score.

## UI Requirements
### Grid
- Squares show idle, active (lit), and selected states.
- Clear visibility with good contrast.

### HUD
- Stage
- Level
- Timer
- Current score
- Hearts remaining

### Feedback States
- Watch
- Your Turn
- Success
- Fail

### Buttons
- Start
- Next Level
- Retry
- Stage Select
- Leaderboard
- Reset Progress

### Navigation
Consistent layout with a clear primary action for each state.

## Configuration (Game Parameters)
### Stages/Levels
- Number of stages.
- Levels per stage.
- Base grid size + stage increment.

### Path Generation
- Min/max path length.
- Required turns per level.
- Start and end constraints (e.g., start on edge).

### Timing
- Playback speed.
- Input mode time limit.

### Hearts
- Starting hearts count.
- Reset frequency (per game, per stage, etc.).

### Scoring
- Base points per level.
- Time bonus multiplier.
- Stage difficulty multiplier.

### Persistence
- Enable/disable localStorage.
- Max leaderboard size.
- Reset behavior.

### UI Options
- Toggle timer visibility.
- Toggle leaderboard visibility.

## Persistence
localStorage should store:
- Current player name.
- High score per player.
- Last unlocked stage/level (optional).

## Accessibility
- High-contrast color scheme for states.
- Optional keyboard input support.

## Success Criteria
- Complete progression from Stage 1 Level 1 to Stage 5 Level 5.
- Leaderboard and scores persist on refresh.
- Timing and rules behave consistently.
- Hearts decrement properly and end the run at zero.
- Config changes adjust gameplay without breaking progression.

