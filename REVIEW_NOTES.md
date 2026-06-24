# Review Notes

Manual UX review against `PRODUCT_REVIEW_CHECKLIST.md`.

Flow reviewed:
Home -> Speed Check -> logging -> result -> Slow Routine unlock -> process lesson -> guided balls 1-2 -> balls 3-10 -> logging -> result -> Ladder unlock

## Top 5 Issues

1. Critical - Slow Routine keeps the phone in the practice loop.
   - Issue: After the first two guided balls, the user still has to tap `Rolled` after every putt from balls 3-10. At a real putting green, that pulls attention back to the screen and works against building a repeatable pre-shot routine.
   - Recommended fix: Replace balls 3-10 with a `Phone down.` screen: `Finish putts 3-10.`, `Same routine every time.`, 8 remaining balls, tiny routine pucks, and one `Log results` button.

2. Important - `Rolled` is mechanically clear but not practice-clear.
   - Issue: `Rolled` tells the user what app event to record, not what to do physically. It may make the drill feel like screen tracking instead of routine training.
   - Recommended fix: If the per-ball flow remains anywhere, rename the button to a clearer physical action such as `Next putt` or remove it for balls 3-10 in favor of `Log results`.

3. Important - Logging 10 putts can feel like a second drill.
   - Issue: After completing real reps, placing or adjusting 10 finish markers is useful but can be high friction, especially if several putts finished close together.
   - Recommended fix: Keep hole logging prominent, then add a faster non-feature-heavy logging path later, such as batch taps, larger finish clusters, or a quick `all inside` / `mostly short` helper. For now, make the hole tap target visually unmistakable.

4. Important - Slow Routine result should reward the process more directly.
   - Issue: The result card can still center on `You moved fast.` after Slow Routine if the user taps quickly through the current phone-based flow. That may punish the app interaction pattern rather than the golfer's actual routine.
   - Recommended fix: After adding `Phone down`, compare elapsed time to Round 1 and show process feedback: `Better reset.` / `Routine helped.` when time is more realistic; `Still rushed.` / `Slow the reset.` when it is still very fast.

5. Polish - Unlock animation is clear, but the earned reason is subtle.
   - Issue: The path unlock from Slow Routine to Ladder works, but the screen mostly says what unlocked, not why it is the right next step for the golfer.
   - Recommended fix: Keep the animation, but add one tiny path cue near the next puck, such as `Next: speed control`, so the Ladder unlock feels earned and connected to the result without adding a paragraph.

## Fix Status

- Issue 1: Fixed. Slow Routine now guides balls 1-2, then switches to a `Phone down.` screen for putts 3-10 with one `Log results` action.
- Issue 2: Fixed. The per-putt `Rolled` loop was removed. Guided putt transitions now use `Next`, `Next putt`, and `Phone down`.
- Issue 3: Addressed within current scope. Hole logging is more obvious with a visible `Tap cup` hint and the existing `How many went in?` batch sheet. Larger batch helpers are left for later because they would add a new logging mode.
- Issue 4: Fixed. Slow Routine results can now show `Better reset.` / `Routine helped.` when the set takes more realistic time than Round 1, or `Still rushed.` / `Slow the reset.` when it is still very fast.
- Issue 5: Not implemented. It is marked Polish and was intentionally left for later.

## 3-loop UX pass

### Loop 1

- Found: Home and Speed Check were still explaining too much before the golfer needed it.
- Fixed: Home now says `Choose a drill.` Speed Check now shows only `Walk back 8 paces.`, `Hit 10 putts.`, and `We'll check your speed.`
- Left for later: None from this loop.

### Loop 2

- Found: Logging made the user infer too much from the green visual.
- Fixed: Logging now says `Tap the hole for makes.` and `Tap the green for misses.` Slow Routine phone-down now ends with `Log results`.
- Left for later: Faster batch logging beyond hole makes; that would add a new logging mode.

### Loop 3

- Found: Results and unlock copy still had a few app-ish phrases: `Path unlock`, `You moved fast.`, and vague speed praise.
- Fixed: Rushed results now say `You're moving fast.` and `That's fast for 10 putts.` Strong speed now says `You've got the pace.` Unlock screens now say `Unlocked: Slow Routine` or `Unlocked: Ladder`.
- Left for later: Extra explanatory unlock cue such as `Next: speed control`; it remains polish.

## 10-loop product improvement sprint

### Loop 1

- Observe: Speed Check told the golfer where to stand and how many putts to hit, but the target goal was only implied by the small `3 ft` chip.
- Idea: Add one short goal line: `Goal: inside 3 ft.`
- Argument for: A real golfer on a practice green should know the success target before putting the phone down.
- Argument against: More text can slow the first screen if the drill already looks obvious.
- Decision: Implement now.
- Files changed: `src/data/puttingDrills.js`, `PRACTICE_DESIGN.md`, `PRODUCT_REVIEW_CHECKLIST.md`, `REVIEW_NOTES.md`.
- Manual testing needed: Open Speed Check on mobile and confirm the three setup lines fit without crowding the stage or CTA.

## Reference prototype scan

- Documented: The older prototype is summarized as notes because the exact HTML was not available. Useful ideas are compact mobile shell, green map clarity, puck/island path energy, and small reward moments.
- Rejected: Fake leaderboard, profile/settings, XP, social league, generic badges, hardcoded 5-putt logic, shallow scoring, and replacing the React architecture.
- Implemented: The current progress path now labels islands by practice skill and shows a tiny purpose line under `Unlocked: [Skill Name]`, so the unlock feels earned without adding XP or social mechanics.
- Files changed: `REFERENCE_SCAN.md`, `src/components/ProgressPath.jsx`, `src/App.css`, `REVIEW_NOTES.md`.
- Manual testing needed: Home -> Putting -> Speed Check -> log result -> adaptive result -> island unlock. Confirm the next skill label and purpose line fit on mobile.

## Putting Path Depth Sprint

Goal: make each putting drill teach or test a different skill instead of sharing one generic score.

### Deepened Now

- Speed Check: kept as baseline diagnosis with 70% inside target success and adaptive miss patterns.
- Slow Routine: keeps phone-down process flow and now treats routine success as time improvement plus inside-count stability or improvement.
- Past the Cup: now scores past-cup safe finishes and reports short misses.
- Softer Pace: now scores inside count plus long-miss control.
- Start Line: now scores center-line finishes and side leak.
- Smaller Ring: now scores precision inside the 2 ft target.
- Ladder: now scores 5, 8, and 12 pace buckets separately and names the strongest/weakest distance.
- Make Zone: now scores holed count and best make streak.
- Pressure Test: now replaces the generic mixed test label with pass/fail Level 1 scoring.

### Product Decisions

- Kept the same screens and logging flow.
- Did not add extra taps during physical reps.
- Did not add XP, leaderboard, profile, social, login, Supabase, or new practice areas.
- Kept visual changes minimal; only skill labels changed where needed.

### Manual Testing Needed

- Mostly short Round 1 should unlock Past the Cup.
- Mostly left or right Round 1 should unlock Start Line.
- Solid pace Round 1 should unlock Smaller Ring.
- Ladder result should show a strongest and weakest distance.
- Make Zone should show made count and best streak.
- Pressure Test should show Passed or Run it back.

## 10-putt Logging Friction Review

### Audit

- Basic Speed Check logging: Fast enough. One green tap per miss, cup tap for makes, draggable markers.
- Hole tap / make logging: Strong for normal sets. Batch make logging keeps the cup useful.
- Dragging markers on mobile: Markers are large enough and distance feedback appears while dragging.
- Ladder ordered logging: Risky before this pass because scoring assumes 5, 8, then 12 paces but the map only showed total marked.
- Pressure Test ordered logging: Risky before this pass because scoring assumes short, medium, then long groups.
- Result accuracy if user logs out of order: Still depends on honest ordered logging, but the screen now shows the active group.

### Ideas Considered

1. Ordered logging label for Ladder and Pressure Test.
   - For: Makes the current mini-set obvious without adding a screen or more practice-time phone taps.
   - Against: Still relies on the golfer logging in order after the set.
   - Decision: Implement now.

2. Optional `I forgot order` fallback.
   - For: Could prevent misleading Ladder and Pressure insights when the golfer forgets sequence.
   - Against: Adds a new branch and would need alternate scoring/result copy.
   - Decision: Document for later.

3. Faster all-short/all-long shortcuts.
   - For: Could reduce 10-tap friction for miss clusters.
   - Against: Reduces result accuracy and could turn practice into coarse self-reporting.
   - Decision: Reject for MVP.

### Implemented

- Added ordered logging groups to Ladder and Pressure Test.
- Logging now shows `Logging 5 paces - 0/3`, `Logging 8 paces - 0/3`, `Logging short makes - 0/3`, and similar group labels.
- Hole make options are capped to the current ordered group for ordered drills.

### Manual Test Cases

- Ladder: after 0, 3, and 6 markers, the label should move from 5 paces to 8 paces to 12 paces.
- Pressure Test: after 0, 3, and 6 markers, the label should move from short makes to medium speed to long lags.
- Speed Check: no ordered label should appear, and the hole sheet should still allow 0 through remaining putts.
- Ladder/Pressure hole sheet: options should stop at the current group remaining count.
