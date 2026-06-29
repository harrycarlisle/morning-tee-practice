# Morning Tee Practice Design

## Product Model

- Practice should be visual-first, but not text-free.
- Use tiny text when it helps the golfer understand the task.
- Most task text should be under 10 words.
- No long paragraphs on practice screens.
- No setup questionnaire before the first drill.
- The first tap should get the user into practice quickly.
- The app should reward useful practice, not random tapping.
- Every round must have a clear purpose.
- Round 2 cannot repeat Round 1 unless the task, target, scoring, or outcome meaning changes.
- Progress should feel like a short learning path, not repeated identical rounds.
- Each next drill should respond to the previous result when useful.
- If the user struggles, repeat or simplify.
- If the user succeeds, make the next round slightly harder.
- If the user performs very well, unlock a challenge.
- Hole-outs should be easy to log by tapping the hole.
- Results should show one main pattern and one next action.
- Keep mobile-first and thumb-friendly.
- Putting improvement should not only be target-based. It should also train process.
- Pre-shot routine research supports using a repeatable routine before performance.
- Quiet-eye research supports a steady final gaze before and during the stroke.
- The app should not overclaim that one exact routine is universal.
- The app should teach a simple repeatable process golfers can use and adapt.
- Putting Level 1 should use ladder drills for speed control, gate drills for start line, clock/make drills for short putts, and pressure drills for transfer.
- Use progressive disclosure: show only the instruction needed for the current step.
- For motor learning, avoid overloading the golfer with too many internal cues.
- Favor external goals: roll it past the cup, finish inside the ring, start it through the gate.
- Use feedback after the set, not during every rep, unless the drill is explicitly a guided routine.
- For routine and quiet-eye drills, teach one simple repeatable process, then get the phone out of the way.
- Use cautious language: research supports repeatable routines and steady gaze can help under pressure.

## Research Notes

- Speed control should be trained as a feel skill across changing distances. GolfTEC's reverse ladder drill uses 5-10 balls and asks golfers to control each ball relative to the prior finish, then shorten the distance if the pattern is too hard: https://scramble.golftec.com/blog/2016/07/putting-drill-reverse-ladder-speed-control/
- Start-line practice should give immediate visual feedback. Visio's gate drill places gates across the intended line so a miss gives direct feedback about face/start direction: https://visioputting.com/through-the-gates-drill/
- Putting speed is tied to routine, contact, and matching read with pace. Titleist frames speed control as a repeatable stroke and routine skill: https://www.titleist.com/videos/instruction/putting-drill-for-consistent-speed-control
- Pressure practice should create a clear consequence for missing rather than reward volume alone. Golf State of Mind uses short putts, repeat attempts, and score pressure: https://golfstateofmind.com/a-few-of-the-best-mental-game-putting-drills/
- Short-putt and distance-control drills should include gates, competitive streaks, and ladder-style targets. Golf Monthly's expert guide includes start-line gates, short-putt pressure, and progressive distance-control ideas: https://www.golfmonthly.com/tips/ultimate-putting-improvement-guide

## Putting Level 1 Path

### Round 1: Speed Check

- 8 paces
- 10 putts
- 3 ft ring
- Purpose: establish baseline speed and finish pattern
- Task copy:
  - "Walk back 8 paces."
  - "Hit 10 putts."
  - "Goal: inside 3 ft."
- Context copy: "Find your baseline speed."
- Success copy: "Good: 7/10 inside."
- Phone-down cue: "Phone down. Hit 10 putts."
- Button: "I'm ready to log"

### Round 2: Pattern Fix

- Adaptive based on Round 1 result
- If mostly short: "Past the hole"
  - 8 paces
  - 10 putts
  - Target zone: hole to 3 ft past
  - Purpose: stop leaving putts short
  - Task copy: "Roll each putt past the cup."
- If mostly long: "Softer pace"
  - 8 paces
  - 10 putts
  - 3 ft ring
  - Long misses count harder against the score
  - Task copy: "Die it near the cup."
- If mostly left or mostly right: "Start line"
  - 6 paces
  - 10 putts
  - Small visual gate near the ball
  - Purpose: start the ball online
  - Task copy: "Start it through the gate."
- If Round 1 was strong: "Smaller ring"
  - 8 paces
  - 10 putts
  - 2 ft ring
  - Task copy: "Same putt. Smaller target."
- If Round 1 was very fast: "Slow routine"
  - 8 paces
  - 10 putts
  - Breathe and step-in animation
  - Purpose: teach repeatable pre-shot process
  - Task copy: "Reset before every putt."
  - Context copy: "Same routine. Same roll."
  - Requires process lesson: "Same routine"
  - Active drill:
    - Balls 1 and 2: guide Mark, Read, Choose, Rehearse, Set, Roll.
    - Balls 3 to 10: show "Phone down."
    - Copy: "Finish putts 3-10."
    - Reminder: "Same routine every time."
    - User taps "Log results" after the set.
    - Then log all 10 finish positions.
  - Continue path: Round 3 Ladder.
- If Round 1 was scattered: "Simple speed"
  - 6 paces
  - 10 putts
  - 3 ft ring
  - Task copy: "Same roll. Closer start."

### Round 3: Ladder

- 5, 8, and 12 paces
- 3 putts from each distance, 9 total
- Purpose: adjust speed
- Task copy: "Three distances. Match the speed."
- Visual: three launch dots or distance tags

## Process Micro-Lesson

Name: Same routine

Format:

- Visual-first
- Low text
- Tiny labels only
- No paragraphs
- User can tap Next through the steps.
- User can tap Start after the sequence.
- Use Morning Tee visual style.

Steps:

1. Mark
2. Read
3. Choose
4. Rehearse
5. Set
6. Roll

Animation ideas:

- Mark: coin appears behind ball.
- Read: puck moves behind ball and a faint line appears.
- Choose: start line glows.
- Rehearse: two practice-stroke arcs appear.
- Set: putter settles and quiet dot locks on ball.
- Roll: ball rolls toward cup and finish is watched.

Tone:

- "Here's the process. Now do it."
- Do not explain the science inside the app.

### Round 4: Start Line

- 6 paces
- 10 putts
- Gate near the ball
- Purpose: start line
- Task copy: "Start it through the gate."

### Round 5: Make Zone

- 4 to 5 ft
- 10 putts
- Purpose: hole short putts
- Task copy: "Make as many as you can."
- Tapping the hole should log made putts quickly.
- Reward 6+ makes, 8+ makes, and 10/10.

### Round 6: Pressure Test

- 3 short makes
- 3 medium speed putts
- 4 long lag putts
- Purpose: combine skills under consequence
- Task copy: "Pass the set."
- End with "Putting Level 1 complete."

## Hole Logging

- The hole must be a real tap target.
- The flag must visually align with the hole.
- Tapping the hole should open a compact bottom sheet or popover.
- Logging screen copy: "Tap the hole for makes." and "Tap the green for misses."
- Bottom sheet copy: "How many went in?"
- Options: 0 to remaining putts.
- Selecting a number logs that many holed putts.
- Holed putts count as inside target.
- Holed putts should get a distinct visual state.
- If the user holes all putts, show a rare perfect-set celebration.

## Results

- Show inside target count.
- Show holed count if any.
- Show one pattern.
- Show one next action.

Pattern labels:

- mostly short
- mostly long
- mostly left
- mostly right
- scattered
- rushed routine
- solid speed
- make streak

Example result copy:

- "7/10 inside target"
- "2 holed"
- "Pattern: mostly short"
- "Next: roll past the cup."

Rushed routine result copy:

- "You're moving fast."
- "Your set took [elapsed time]."
- "That's fast for [putt count] putts."
- "Fast sets make your routine harder to repeat."
- "Research supports using a repeatable routine."
- "A steady final look can help."
- "Next: same routine every putt."

Slow Routine result copy:

- If elapsed time improves and inside-target count improves:
  - "Better reset."
  - "Routine helped."
  - "Next: ladder speed."
- If elapsed time is still too fast:
  - "Still rushed."
  - "Slow the reset."
  - Continue path still moves to Ladder.
  - Retry remains available from the result screen.

## Handedness

- Do not ask before Round 1.
- After Round 1, if the main pattern is left or right, ask once:
  - "Which side do you putt from?"
  - Left / Right
- Save this in local state.
- Use cautious feedback:
  - "Could be face or aim."
- Do not overdiagnose.

## UI Rules

- Round cards should use icons, pucks, rings, and short labels.
- Avoid paragraphs.
- Avoid long instruction text.
- Keep most screen copy under 8 words.
- Let animations explain the setup where possible.
- Setup screens should show the skill, target, and success mark before the phone goes down.
- Disabled cards should feel locked, not broken.
- Pucks and progress indicators must adapt to current putt count.
- Round 2 should unlock only after the path-fill animation completes.
- The next-round button should show the actual adaptive drill name.

## Putting Path Depth Audit

### Speed Check

- Skill being trained: baseline pace control.
- Setup: 8 paces, 10 putts, 3 ft ring.
- What the golfer does: hits one set and marks every finish.
- What gets measured: inside target count, short/long pattern, left/right pattern, elapsed set time.
- Success rule: 7 of 10 inside the 3 ft ring.
- Failure pattern: mostly short, mostly long, mostly left, mostly right, rushed, or scattered.
- Result insight: one baseline pattern.
- Next recommended drill: adaptive Round 2.
- Difference: diagnoses the golfer before assigning a fix.

### Slow Routine

- Skill being trained: repeatable pre-shot process.
- Setup: 8 paces, 10 putts, 3 ft ring.
- What the golfer does: learns Mark, Read, Choose, Rehearse, Set, Roll, then puts the phone down.
- What gets measured: elapsed set time and inside target count.
- Success rule: more realistic elapsed time and target count at least as good as Round 1.
- Failure pattern: set remains rushed.
- Result insight: whether routine helped the pace.
- Next recommended drill: Ladder.
- Difference: trains process before outcome.

### Past the Cup

- Skill being trained: committing enough speed.
- Setup: 8 paces, 10 putts, safe zone past the cup.
- What the golfer does: rolls each putt to finish past the cup.
- What gets measured: past-cup safe finishes.
- Success rule: 7 of 10 past the cup and inside the safe zone.
- Failure pattern: too many putts still finish short.
- Result insight: whether short misses improved.
- Next recommended drill: Ladder.
- Difference: rewards passing the cup, not generic proximity.

### Softer Pace

- Skill being trained: controlling runout.
- Setup: 8 paces, 10 putts, 3 ft ring.
- What the golfer does: rolls softer pace without leaving it short.
- What gets measured: inside target count and long misses.
- Success rule: 7 inside with 2 or fewer long misses.
- Failure pattern: long misses keep stretching the set.
- Result insight: whether misses stayed closer.
- Next recommended drill: Ladder.
- Difference: long misses matter more than generic misses.

### Start Line

- Skill being trained: start direction.
- Setup: 6 paces, 10 putts, simple gate near the ball.
- What the golfer does: starts each putt through the gate.
- What gets measured: center-line finishes and side bias.
- Success rule: 7 of 10 center-line finishes.
- Failure pattern: left or right leak remains.
- Result insight: whether the start line tightened.
- Next recommended drill: Ladder if adaptive, Make Zone if on the main path.
- Difference: trains line instead of distance control.

### Smaller Ring

- Skill being trained: speed precision.
- Setup: 8 paces, 10 putts, 2 ft ring.
- What the golfer does: repeats the baseline putt with a smaller target.
- What gets measured: inside count in the 2 ft ring.
- Success rule: 7 of 10 inside the smaller ring.
- Failure pattern: good speed is not tight enough yet.
- Result insight: whether precision held up.
- Next recommended drill: Ladder.
- Difference: makes a good baseline harder instead of fixing a miss.

### Ladder

- Skill being trained: speed change across distances.
- Setup: 5, 8, and 12 paces; 3 putts each.
- What the golfer does: changes distance without changing the whole routine.
- What gets measured: inside target count by distance bucket.
- Success rule: at least 2 of 3 inside from each distance.
- Failure pattern: one distance falls behind the others.
- Result insight: strongest and weakest distance.
- Next recommended drill: Start Line.
- Difference: tests distance adjustment, not one repeated putt.

### Make Zone

- Skill being trained: short-putt conversion.
- Setup: 4 to 5 ft, 10 putts.
- What the golfer does: tries to hole each putt and logs makes at the cup.
- What gets measured: holed count and best make streak.
- Success rule: 6 or more makes.
- Failure pattern: low make count or short streak.
- Result insight: make rate and best streak.
- Next recommended drill: Pressure Test.
- Difference: scores the cup, not a finish ring.

### Pressure Test

- Skill being trained: transfer under consequence.
- Setup: 3 short, 3 medium, and 4 long putts.
- What the golfer does: combines make putts, speed putts, and lag putts.
- What gets measured: short makes, medium/long proximity, total inside target.
- Success rule: 2 short makes and 7 total inside target.
- Failure pattern: misses the pass mark.
- Result insight: Passed or Run it back.
- Next recommended drill: Putting Level 1 complete.
- Difference: combines the skills under a pass/fail finish.

