# Product Review Checklist

Use this checklist before considering Morning Tee Practice product logic done.

## Product Boundaries

- Do not add Supabase before the MVP is stable.
- Do not add login.
- Do not add chipping, approach, or driving functionality.
- Do not connect to LifeOS.
- Do not connect to morning-tee-radar-feed.

## Copy Quality

- Main result copy should be clear to a normal golfer.
- Avoid vague labels as the main learning moment.
- Rushed routine copy should say:
  - "You're moving fast."
  - "Your set took [elapsed time]."
  - "That's fast for [putt count] putts."
  - "Research supports using a repeatable routine."
  - "Next: same routine every putt."
- Keep main-card copy concise.
- Put longer explanation behind a small info control or expandable detail.
- Avoid overclaims:
  - Use "Research supports..."
  - Use "A repeatable routine can help..."
  - Use "A steady final look can help..."
  - Do not use "Research proves..."
  - Do not use "This guarantees..."
  - Do not use "Always do this exact routine..."

## Result Card Hierarchy

- The result card should answer:
  - What happened?
  - Why it matters?
  - What should I do next?
- Rushed example:
  - Title: "You're moving fast."
  - Stat: "5/10 inside target"
  - Timing: "Your set took [elapsed time]."
  - Substat: "1 holed"
  - Why: "Fast sets make your routine harder to repeat."
  - Next: "Same routine every putt."
- Keep results short and scan-friendly.

## First Drill Clarity

- Speed Check should be understandable without guessing from animation.
- It should show:
  - "Walk back 8 paces."
  - "Hit 10 putts."
  - "Goal: inside 3 ft."
- It should not show logging instructions before the golfer has hit the set.

## Slow Routine Lesson

- Tapping Slow routine opens the process lesson first.
- The lesson clearly walks through:
  - Mark
  - Read
  - Choose
  - Rehearse
  - Set
  - Roll
- Each step has:
  - One word label
  - One short action line
  - One visual change
- The Start button should not feel broken.
- If Next is the primary control, do not show a Start button early.
- Final step primary button should say "Start drill."

## Process Step Content

- Mark: "Place the ball."
- Read: "See the slope."
- Choose: "Pick a start line."
- Rehearse: "Feel the stroke."
- Set: "Eyes quiet."
- Roll: "Watch the finish."

## Active Slow Routine Drill

- Start drill opens the active Slow Routine drill, not a generic duplicate.
- Balls 1 and 2 guide:
  - Mark
  - Read
  - Choose
  - Rehearse
  - Set
  - Roll
- Balls 3 to 10 move to a phone-down screen:
  - Mark
  - Read
  - Choose
  - Rehearse
  - Set
  - Roll
- Phone-down copy should say:
  - "Phone down."
  - "Finish putts 3-10."
  - "Same routine every time."
- User taps "Log results" once after finishing the set.
- Then user logs all 10 finish positions on the green.
- Continue path after Round 2 should move to Ladder or another real putting skill.

## Logging Clarity

- Logging should show:
  - "Tap the hole for makes."
  - "Tap the green for misses."
- The hole target should be visibly tappable.
- The hole picker should feel fast, not like a form.

## Path And Tracker

- The path should feel connected to the round tracker.
- On unlock:
  - Animate the path from Round 1 to Round 2.
  - Fill the dashed route progressively.
  - Then pop Round 2.
- Do not make the path look random or disconnected.
- Keep score visible but secondary to path progress.
- Make the path meaning clear.

## Manual Test Checklist

- Round 1 rushed time unlocks Slow routine.
- Slow routine opens the process lesson.
- Start/Next controls make sense.
- Final lesson step starts the actual drill.
- Result copy is clear to a normal golfer.
- Rushed results show actual elapsed time.
- Slow Routine uses phone-down flow before logging.
- Round 2 continues to Ladder.
- Mobile layout has no horizontal overflow.
- Buttons are tappable.
- `npm run lint` passes.
- `npm run build` passes.
