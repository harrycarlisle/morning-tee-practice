# Morning Tee Practice Product Clarity Audit

## Executive summary

Blunt assessment: Morning Tee Practice is useful underneath, but it is not clear enough for a brand-new golfer in the first 30 seconds. The drill logic is much better than the visible experience. The app currently feels like a clean prototype with good components, not yet like a trusted putting practice product.

Is the product clear enough right now? Not quite. A golfer can probably tap Putting and start Speed Check, but they may not know what Morning Tee Practice is, why this first drill matters, when to put the phone down, or what counts as a good set.

Is it visually strong enough? Not yet. The green visuals are nice, but the setup graphics do not label the key objects strongly enough: start spot, hole, target ring, ball count, and finish goal. The path is pleasant, but still reads partly decorative.

Is it useful enough? Yes, the underlying drill path is useful. Speed Check, Slow Routine, Pattern Fix drills, Ladder, Make Zone, and Pressure Test now represent different practice skills. The problem is that the UI does not surface that depth early enough.

Top 5 problems:

1. Critical: Home does not say what the product is or why to trust it.
2. Critical: Speed Check does not explicitly say when to put the phone down or that logging comes after the set.
3. Critical: Setup visuals are attractive but under-labeled, so the golfer must infer too much.
4. Important: Result timing can feel wrong because the app starts timing on screen load, not when the golfer truly starts the set.
5. Important: The path looks rewarding but does not yet explain the skill sequence clearly enough.

## First 30 seconds audit

Assumption: the user has never seen the app before and opens it while standing on a real putting green.

Can they answer what this is? Partly. They see Morning Tee, Practice, and Putting. They do not see a short promise like guided putting drills.

Can they answer why they should trust it? No. There is no signal that the product is built around real putting skills, short sets, or feedback.

Can they answer what to tap? Yes. Putting Start is obvious.

Can they answer what drill they are doing? Yes after tapping Putting. Speed Check is visible.

Can they answer where to stand? Yes. Speed Check says Walk back 8 paces.

Can they answer how many balls to hit? Yes. It says Hit 10 putts.

Can they answer the goal? Partly. It says Goal: inside 3 ft. It does not say what counts as a good score, such as 7 of 10.

Can they answer when to put the phone down? No. The first drill has no phone-down cue. The button says I hit 10 putts, but the screen does not say Set this down, hit the set, then come back.

First 30 seconds verdict: It passes basic navigation. It fails trust, phone-down behavior, and clear success criteria.

## Screen-by-screen audit

### Home

What works:

- Mobile layout is clean.
- Putting is clearly the only active area.
- The disabled areas feel intentionally locked.
- The Morning Tee identity is present.

What does not work:

- The screen does not say what Morning Tee Practice actually does.
- Choose a drill is functional, but it is not motivating or explanatory.
- A new golfer does not know this is a short guided putting path, not a generic tracker.

Why it matters:

- This is the trust moment. If the app looks like a toy menu with no premise, the user may not believe the practice is worth doing.

Recommended fix:

- Add one short value line under Choose a drill.
- Keep it under 8 words if possible.

Suggested copy:

- Guided putting. Ten balls. One insight.
- Short drills for better putting.
- Start with a 10-ball speed check.

Type of issue: copy issue and visual hierarchy issue.

### Putting start

What works:

- Tapping Putting starts the drill immediately.
- No setup questionnaire appears.

What does not work:

- The transition does not frame the first drill as a baseline.
- It goes straight to Speed Check, which is good, but the user may not understand why Speed Check comes first.

Why it matters:

- The first drill should feel intentional, not random.

Recommended fix:

- Make the Speed Check screen carry the baseline framing.

Suggested copy:

- First: find your pace pattern.

Type of issue: copy issue.

### Speed Check setup

Observed in browser:

- Title: Speed Check
- Copy: Walk back 8 paces. Hit 10 putts. Goal: inside 3 ft.
- Context: We'll check your speed.
- Chips: 8 paces, 10 putts, 3 ft
- Button: I hit 10 putts

What works:

- The setup answers the most basic questions: where to stand, how many putts, and target size.
- The text is short and scannable.
- The button is clear after the golfer has completed the set.

What does not work:

- It does not say what counts as good.
- It does not say to put the phone down.
- It does not say to come back and log finish spots.
- The visual shows a green, ring, balls, and distance markers, but the repeated 8 labels are not self-explanatory.

Why it matters:

- This is the first real practice moment. If the golfer keeps the phone in hand or does not know the success target, the product loses its real-world purpose.

Recommended fix:

- Add one phone-down line and one success rule line.
- Consider changing the CTA to make the physical sequence clearer.

Suggested copy:

- Put phone down. Hit the set.
- Good set: 7 of 10 inside.
- Then mark where they finish.
- Button: I hit all 10.

Type of issue: copy issue, visual hierarchy issue, practice-behavior issue.

### Phone-down/practice moment

What works:

- Slow Routine has a real Phone down screen after two guided balls.

What does not work:

- Speed Check and most non-routine drills do not tell the user to put the phone down.
- The timer starts when the drill screen appears, which can punish reading time or app exploration.

Why it matters:

- The app should guide setup, then get out of the way. Right now the first drill teaches the user to keep the phone available until they tap I hit 10 putts.

Recommended fix:

- For normal drills, add a compact phone-down cue on the setup screen.
- Longer term, consider a Start set button that starts timing only when the golfer is ready, but that is a product-behavior change and should be scoped separately.

Suggested copy:

- Phone down for the set.
- Come back to log finishes.
- Ready? Hit 10 putts.

Type of issue: interaction issue and product-timing issue.

### Green tap logging

Observed in browser:

- Title: Log results
- Status: 0/10 marked
- Copy: Tap the hole for makes. Tap the green for misses.
- Cup hint: Tap cup

What works:

- This is one of the clearest screens.
- The two instructions are concrete.
- Markers are numbered.
- There is no horizontal overflow at 390px width.

What does not work:

- The title Review? after all markers are placed is vague.
- For ordered drills, the new group label helps, but the app should still explicitly say ordered logging matters.

Why it matters:

- Logging is where practice can become friction. The current interaction is usable, but any ambiguity hurts result accuracy.

Recommended fix:

- Replace Review? with a more concrete final state.
- For ordered drills, add one short instruction before tapping starts.

Suggested copy:

- Ready to review.
- Check your marks.
- Log in set order.
- First 5 paces.

Type of issue: copy issue and interaction clarity issue.

### Hole/make logging

Observed in browser:

- Tapping the cup opens How many went in? with 0 through remaining putts.

What works:

- Fast make logging is strong.
- It avoids forcing a marker placement for every made putt.

What does not work:

- Tap cup is clear but visually small as a trust cue.
- A beginner may not know that holed putts count as inside target.

Why it matters:

- Makes should feel satisfying and easy. The current design is good, but the cup affordance can be stronger.

Recommended fix:

- Strengthen the cup label and add a tiny confirmation in the sheet.

Suggested copy:

- Tap cup for makes.
- Makes count inside.
- How many dropped?

Type of issue: visual hierarchy issue and copy issue.

### Results screen

Observed in browser after a fast test:

- Title: You're moving fast.
- Stats: 10/10 inside target, 10 holed
- Why: Fast sets make your routine harder to repeat.
- Timing: Your set took 10 seconds. That's fast for 10 putts.
- Next: same routine every putt.

What works:

- The result card answers what happened, why it matters, and what to do next.
- The result is compact.
- The Why button keeps research language tucked away.

What does not work:

- Timing feedback can feel false during first-time exploration because the timer starts before the golfer actually starts practicing.
- A great outcome like 10 holed can be emotionally overridden by You're moving fast.
- The app does not clearly distinguish practice time from app interaction time.

Why it matters:

- A result has to feel earned and fair. If the user thinks the app judged them incorrectly, trust drops fast.

Recommended fix:

- Soften rushed feedback when the set was also strong, or make timing start at a clearer practice-start action.
- Keep the coaching point, but avoid making the headline feel like a scold.

Suggested copy:

- Great makes. Slow the routine.
- Strong result. Quick set.
- Next: same routine every putt.
- Your set looked fast.

Type of issue: result-copy issue and timing model issue.

### Unlock/path screen

Observed in browser:

- Unlocked: Slow Routine
- Purpose: Reset before every putt.
- Path nodes: Speed, Speed, Reset, Reset, Ladder, Line, Make, Pressure

What works:

- The unlock feels lightweight and satisfying.
- The next drill name is visible.
- The purpose line helps.

What does not work:

- Duplicate visible node labels make the path feel noisy.
- The path does not explicitly read as a skill path yet.
- It does not clearly say why this next drill unlocked from the result.

Why it matters:

- The path is the habit loop. It should say you got this result, so this skill is next.

Recommended fix:

- Add one earned-reason line above or below the unlock title.
- Simplify node labels so each skill appears once.

Suggested copy:

- You moved fast. Train the reset.
- Short misses? Learn past-cup speed.
- Good pace. Shrink the target.
- Path: Speed -> Reset -> Ladder -> Line -> Make -> Pressure.

Type of issue: visual hierarchy issue and progress-meaning issue.

### Slow Routine

What works:

- The micro-lesson is compact.
- Mark, Read, Choose, Rehearse, Set, Roll is clear.
- The final button says Start drill.
- The active drill guides the first two balls and then shows Phone down.

What does not work:

- The lesson does not include a tiny trust line explaining why a routine matters.
- Ball 1: one step at a time is clear, but a first-timer may wonder whether they should actually hit on Roll or just watch the animation.

Why it matters:

- This is the most differentiated teaching moment. It should feel like coaching, not just a sequence of labels.

Recommended fix:

- Add one tiny trust line before the steps or on the first step.
- Make the Roll step physically explicit.

Suggested copy:

- Same steps before every putt.
- Roll the ball now.
- Watch where it finishes.

Type of issue: copy issue.

### Later drill setup screens

What works:

- Each drill has a title, short task copy, context copy, distance, putt count, and target size.
- The drill data now has distinct scoring rules.

What does not work:

- Some drill titles are not self-explanatory for a beginner: Ladder, Start Line, Smaller Ring, Pressure Test.
- Setup copy often explains the task, but not the success rule.
- The visuals do not always clearly show the special rule. For example, Past the Cup needs a stronger safe-zone graphic, Start Line needs a more obvious gate, Ladder needs distance groups that feel actionable.

Why it matters:

- A golfer should know the skill before hitting the set.

Recommended fix:

- Add one short skill line to every drill setup.
- Add one short success line where the drill is not obvious.

Suggested copy:

- Past the Cup: Stop leaving it short.
- Softer Pace: Keep long misses close.
- Start Line: Start it through the gate.
- Smaller Ring: Same putt. Tighter target.
- Ladder: 3 balls from each distance.
- Make Zone: Hole as many as you can.
- Pressure Test: Pass the set.

Type of issue: copy issue and visual clarity issue.

## Drill clarity audit

### Speed Check

Current goal clarity: Medium. The user sees inside 3 ft, but not 7 of 10.

Current setup clarity: High for distance and ball count.

Current scoring clarity: Medium. The scoring is real, but hidden until results.

Current result clarity: Medium-high. The card is useful, but rushed timing can dominate.

Recommended fix:

- Add success rule and phone-down cue.

Suggested copy:

- Good set: 7 of 10 inside.
- Phone down. Hit 10 putts.
- Then mark every finish.

### Slow Routine

Current goal clarity: High after unlock, medium inside the lesson.

Current setup clarity: High.

Current scoring clarity: Medium. The user may not know time and inside count matter.

Current result clarity: High when it says Better reset or Still rushed.

Recommended fix:

- Add one short process-purpose line.

Suggested copy:

- Same steps before every putt.
- We will check reset and pace.

### Past the Cup

Current goal clarity: Medium-high.

Current setup clarity: Medium.

Current scoring clarity: Low before the set.

Current result clarity: High after scoring.

Recommended fix:

- Make the safe zone and success count explicit.

Suggested copy:

- Finish past the cup, inside 3 ft.
- Good set: 7 of 10 past.

### Softer Pace

Current goal clarity: Medium.

Current setup clarity: Medium.

Current scoring clarity: Low before the set.

Current result clarity: High after scoring.

Recommended fix:

- Explain the long-miss penalty in plain language.

Suggested copy:

- Keep long misses close.
- Good set: 7 inside, 2 long max.

### Start Line

Current goal clarity: Medium.

Current setup clarity: Medium.

Current scoring clarity: Low before the set.

Current result clarity: Medium-high.

Recommended fix:

- Explain gate and center line before the set.

Suggested copy:

- Start it through the gate.
- Good set: 7 of 10 center.

### Smaller Ring

Current goal clarity: Medium-high.

Current setup clarity: High.

Current scoring clarity: Medium.

Current result clarity: High.

Recommended fix:

- Make it clear this is a harder version of Speed Check.

Suggested copy:

- Same putt. Smaller circle.
- Good set: 7 of 10 inside.

### Ladder

Current goal clarity: Medium.

Current setup clarity: Medium-high after ordered labels.

Current scoring clarity: Medium.

Current result clarity: High because strongest and weakest distance are named.

Recommended fix:

- Add ordered setup copy before the set.

Suggested copy:

- 3 balls from each distance.
- Log them in order.
- Goal: 2 of 3 inside each.

### Make Zone

Current goal clarity: High.

Current setup clarity: Medium.

Current scoring clarity: High after result, medium before set.

Current result clarity: High.

Recommended fix:

- Explain makes and streak before the set.

Suggested copy:

- Make as many as you can.
- We track makes and best streak.

### Pressure Test

Current goal clarity: Medium.

Current setup clarity: Medium.

Current scoring clarity: Low before set.

Current result clarity: High after pass/fail.

Recommended fix:

- Explain pass criteria before the set.

Suggested copy:

- Pass the set.
- 2 short makes. 7 total inside.
- Log in order.

## Biggest product gaps

1. Critical: First screen lacks product promise and trust.
2. Critical: First drill lacks phone-down instruction.
3. Critical: Setup screens do not show success criteria before the set.
4. Critical: Timing feedback can feel unfair because timing starts on screen appearance.
5. Important: Setup visuals need clearer labels for start spot, target, hole, and goal.
6. Important: Path screen needs an earned-reason line and cleaner skill sequence.
7. Important: Drill-specific scoring exists, but setup copy does not consistently reveal it.
8. Important: Ordered logging is better, but Ladder and Pressure still need a pre-set order cue.
9. Nice later: Stronger visual polish for target zones, gate, and ladder distances.
10. Nice later: Better celebration hierarchy for genuinely strong sets.

## Do not fix yet

These are tempting, but they should wait:

- XP
- Leaderboard
- Profile
- Social features
- Course mode
- Supabase
- Login
- Full redesign
- More practice areas
- Photo analysis
- Stats dashboard
- Production analytics

Why wait: the core putting loop still needs clearer setup, trust, phone-down behavior, and result fairness. Adding systems now would make the product busier without solving the first-use problem.

## Recommended next sprint

Sprint theme: Make setup screens obvious.

Scope:

- Home promise line.
- First drill phone-down cue.
- Success rule line on setup screens.
- Better CTA copy for the physical practice moment.
- Minimal visual labels for hole, start spot, target, and balls.
- No new drills, no account system, no persistence, no full redesign.

Why this sprint first:

- It fixes the first 30 seconds.
- It helps every drill, not just Speed Check.
- It makes the existing deeper scoring visible before the golfer practices.
- It keeps the app mobile-first and low-text.

Suggested implementation prompt:

```text
Implement the recommended "Make setup screens obvious" sprint for Morning Tee Practice.

Repo: C:\dev\morning-tee-practice

Do not add Supabase, login, leaderboard, XP, profile, social features, new practice areas, deployment, or production analytics. Do not redesign the whole app.

Goal: Fix first-use clarity and setup clarity without adding friction.

Implement:
1. Home: add one short promise line under "Choose a drill."
   Copy: "Guided putting. Ten balls. One insight."
2. Speed Check setup: add clear physical sequence and success rule.
   Copy:
   - "Phone down. Hit 10 putts."
   - "Good set: 7 of 10 inside."
   - "Then mark every finish."
3. All drill setup screens: show one short skill line and one short success line from drill metadata.
4. Update CTA copy from "I hit X putts" to "Log my X putts" or "I hit all X" after adding the phone-down cue.
5. Add minimal visual labels to the setup graphic where useful:
   - "Start"
   - "Cup"
   - "Target"
6. Keep copy short, mobile-first, and thumb-friendly.
7. Do not add screens.
8. Update PRODUCT_CLARITY_AUDIT.md or REVIEW_NOTES.md with what was fixed.
9. Run npm.cmd run lint and npm.cmd run build.
10. Smoke test Home -> Putting -> Speed Check -> logging -> result -> path.
```

## Validation notes

Browser inspection was available and used at mobile viewport size 390 x 844 against local Vite at http://localhost:5173.

Screens inspected in-browser:

- Home
- Speed Check
- Log results
- Hole/make sheet
- Review-ready logging state
- Results
- Unlock/path
- Same Routine lesson
- Slow Routine active drill

Source inspected for:

- Later drill setup data
- Slow Routine phone-down behavior
- ResultsCard
- ProgressPath
- GreenTapMap

No app code was changed in this audit.
