export const ROUND_COUNT = 6

export const drillByRound = {
  1: {
    id: 'speed-check',
    round: 1,
    title: 'Speed Check',
    distancePaces: 8,
    puttCount: 10,
    targetType: 'ring',
    targetSizeFeet: 3,
    successRule: 'baseline-speed',
    successThreshold: 0.7,
    taskCopy: 'Walk back 8 paces.',
    taskSteps: [
      'Walk back 8 paces.',
      'Hit 10 putts.',
      'Goal: inside 3 ft.',
    ],
    contextCopy: "We'll check your speed.",
    animationVariant: 'speed',
    resultRules: ['inside-count', 'finish-pattern', 'routine-time'],
    depth: {
      skill: 'Baseline pace control',
      setup: '8 paces, 10 putts, 3 ft ring',
      golferDoes: 'Hits one set and marks every finish.',
      measured: 'Inside target, miss depth, miss side, elapsed set time',
      success: '7 of 10 inside the 3 ft ring',
      failure: 'Short, long, side, rushed, or scattered pattern',
      insight: 'Shows the first speed pattern.',
      next: 'Adaptive Round 2',
      difference: 'Diagnoses the golfer instead of training one fix.',
    },
  },
  3: {
    id: 'ladder',
    round: 3,
    title: 'Ladder',
    distanceSet: [5, 8, 12],
    puttCount: 9,
    targetType: 'ladder',
    targetSizeFeet: 3,
    successRule: 'ladder-proximity',
    successThreshold: 2,
    taskCopy: 'Three distances. Match the speed.',
    contextCopy: '3 balls each.',
    animationVariant: 'ladder',
    resultRules: ['inside-count', 'distance-buckets'],
    loggingGroups: [
      { label: '5 paces', count: 3 },
      { label: '8 paces', count: 3 },
      { label: '12 paces', count: 3 },
    ],
    depth: {
      skill: 'Speed change across distances',
      setup: '5, 8, and 12 paces; 3 putts each',
      golferDoes: 'Changes distance without changing the whole routine.',
      measured: 'Inside count by distance bucket',
      success: 'At least 2 of 3 inside from each distance',
      failure: 'One distance falls behind the others',
      insight: 'Names the strongest and weakest distance.',
      next: 'Start Line',
      difference: 'Tests distance adjustment, not one repeated putt.',
    },
  },
  4: {
    id: 'start-line',
    round: 4,
    title: 'Start Line',
    distancePaces: 6,
    puttCount: 10,
    targetType: 'gate',
    targetSizeFeet: 3,
    successRule: 'start-line',
    successThreshold: 0.7,
    taskCopy: 'Start it through the gate.',
    contextCopy: 'Begin on line.',
    animationVariant: 'gate',
    resultRules: ['center-line-count', 'side-pattern'],
    depth: {
      skill: 'Start direction',
      setup: '6 paces, gate near the ball, 10 putts',
      golferDoes: 'Starts each ball through the gate.',
      measured: 'Center-line finishes and side bias',
      success: '7 of 10 finish on the center line',
      failure: 'Left or right bias stays visible',
      insight: 'Shows whether the start line tightened.',
      next: 'Make Zone',
      difference: 'Focuses on line, not distance control.',
    },
  },
  5: {
    id: 'make-zone',
    round: 5,
    title: 'Make Zone',
    distanceSet: [4, 5],
    puttCount: 10,
    targetType: 'make',
    targetSizeFeet: 1,
    successRule: 'short-makes',
    successThreshold: 6,
    taskCopy: 'Make as many as you can.',
    contextCopy: 'Tap the cup for makes.',
    animationVariant: 'make',
    resultRules: ['holed-count', 'best-streak'],
    depth: {
      skill: 'Short-putt conversion',
      setup: '4 to 5 ft, 10 putts',
      golferDoes: 'Tries to hole each putt and logs makes at the cup.',
      measured: 'Holed count and best make streak',
      success: '6 or more makes',
      failure: 'Low make count or short streak',
      insight: 'Shows make rate and pressure streak.',
      next: 'Pressure Test',
      difference: 'Scores the cup, not a finish ring.',
    },
  },
  6: {
    id: 'pressure-test',
    round: 6,
    title: 'Pressure Test',
    distanceSet: ['short', 'medium', 'long'],
    puttCount: 10,
    targetType: 'mixed',
    targetSizeFeet: 3,
    successRule: 'pressure-pass',
    taskCopy: 'Pass the set.',
    contextCopy: 'Short. Medium. Long.',
    animationVariant: 'mixed',
    resultRules: ['holed-count', 'inside-count', 'pressure-pass'],
    loggingGroups: [
      { label: 'short makes', count: 3 },
      { label: 'medium speed', count: 3 },
      { label: 'long lags', count: 4 },
    ],
    depth: {
      skill: 'Transfer under consequence',
      setup: '3 short, 3 medium, 4 long putts',
      golferDoes: 'Combines make putts, speed putts, and lag putts.',
      measured: 'Short makes, medium/long proximity, total inside',
      success: '2 short makes and 7 total inside target',
      failure: 'Misses the pass mark',
      insight: 'Passes Level 1 or asks for a run back.',
      next: 'Putting Level 1 complete',
      difference: 'Combines the skills under a pass/fail finish.',
    },
  },
}

export const roundTwoVariants = {
  pastHole: {
    id: 'pattern-fix-past-hole',
    round: 2,
    title: 'Past the Cup',
    distancePaces: 8,
    puttCount: 10,
    targetType: 'past-hole',
    targetSizeFeet: 3,
    successRule: 'past-cup-speed',
    successThreshold: 7,
    taskCopy: 'Roll each putt past the cup.',
    contextCopy: 'Beat short misses.',
    animationVariant: 'past-hole',
    resultRules: ['past-cup-count', 'short-miss-reduction'],
    depth: {
      skill: 'Commit enough speed',
      setup: '8 paces, 10 putts, safe zone past the cup',
      golferDoes: 'Rolls every putt to finish past the cup.',
      measured: 'Past-cup finishes inside the safe zone',
      success: '7 of 10 past the cup and safe',
      failure: 'Putts still finish short',
      insight: 'Shows whether short misses improved.',
      next: 'Ladder',
      difference: 'Rewards passing the cup, not just being close.',
    },
  },
  softerPace: {
    id: 'pattern-fix-softer-pace',
    round: 2,
    title: 'Softer Pace',
    distancePaces: 8,
    puttCount: 10,
    targetType: 'ring',
    targetSizeFeet: 3,
    successRule: 'soften-long-misses',
    successThreshold: 7,
    taskCopy: 'Die it near the cup.',
    contextCopy: 'Long misses hurt.',
    animationVariant: 'soft',
    resultRules: ['inside-count', 'long-miss-control'],
    depth: {
      skill: 'Control runout',
      setup: '8 paces, 10 putts, 3 ft ring',
      golferDoes: 'Rolls softer pace without leaving it short.',
      measured: 'Inside count and long misses',
      success: '7 inside with 2 or fewer long misses',
      failure: 'Long misses keep stretching the set',
      insight: 'Shows whether misses stayed closer.',
      next: 'Ladder',
      difference: 'Penalizes long misses more than generic proximity.',
    },
  },
  startLine: {
    id: 'pattern-fix-start-line',
    round: 2,
    title: 'Start Line',
    distancePaces: 6,
    puttCount: 10,
    targetType: 'gate',
    targetSizeFeet: 3,
    successRule: 'start-line',
    successThreshold: 0.7,
    taskCopy: 'Start it through the gate.',
    contextCopy: 'Could be face or aim.',
    animationVariant: 'gate',
    resultRules: ['center-line-count', 'side-pattern'],
    depth: {
      skill: 'Start direction repair',
      setup: '6 paces, gate near the ball, 10 putts',
      golferDoes: 'Uses the gate to tighten left/right bias.',
      measured: 'Center-line finishes and side bias',
      success: '7 of 10 finish on the center line',
      failure: 'Left or right bias remains',
      insight: 'Shows whether the start line tightened.',
      next: 'Ladder',
      difference: 'Responds directly to a left/right baseline miss.',
    },
  },
  smallerRing: {
    id: 'pattern-fix-smaller-ring',
    round: 2,
    title: 'Smaller Ring',
    distancePaces: 8,
    puttCount: 10,
    targetType: 'ring',
    targetSizeFeet: 2,
    successRule: 'tighten-speed',
    successThreshold: 0.7,
    taskCopy: 'Same putt. Smaller target.',
    contextCopy: 'Level up speed.',
    animationVariant: 'small-ring',
    resultRules: ['inside-count', 'precision-target'],
    depth: {
      skill: 'Speed precision',
      setup: '8 paces, 10 putts, 2 ft ring',
      golferDoes: 'Repeats the baseline putt with a smaller target.',
      measured: 'Inside count in the 2 ft ring',
      success: '7 of 10 inside the smaller ring',
      failure: 'Good speed is not tight enough yet',
      insight: 'Shows whether precision held up.',
      next: 'Ladder',
      difference: 'Makes a good baseline harder instead of fixing a miss.',
    },
  },
  slowRoutine: {
    id: 'pattern-fix-slow-routine',
    round: 2,
    title: 'Slow Routine',
    distancePaces: 8,
    puttCount: 10,
    targetType: 'ring',
    targetSizeFeet: 3,
    successRule: 'routine-reset',
    taskCopy: 'Reset before every putt.',
    contextCopy: 'Same routine. Same roll.',
    animationVariant: 'routine',
    activeTask: 'routine',
    requiresProcessLesson: true,
    processLesson: 'same-routine',
    resultRules: ['routine-time', 'inside-count'],
    depth: {
      skill: 'Repeatable process',
      setup: '8 paces, 10 putts, 3 ft ring',
      golferDoes: 'Learns the six-step routine, then puts the phone down.',
      measured: 'Elapsed set time and inside count',
      success: 'More realistic time and better target count than Round 1',
      failure: 'Set remains rushed',
      insight: 'Shows whether routine helped pace.',
      next: 'Ladder',
      difference: 'Trains process before outcome.',
    },
  },
  simpleSpeed: {
    id: 'pattern-fix-simple-speed',
    round: 2,
    title: 'Simple Speed',
    distancePaces: 6,
    puttCount: 10,
    targetType: 'ring',
    targetSizeFeet: 3,
    successRule: 'simplify-speed',
    successThreshold: 0.7,
    taskCopy: 'Same roll. Closer start.',
    contextCopy: 'Find the pattern.',
    animationVariant: 'speed',
    resultRules: ['inside-count', 'finish-pattern'],
    depth: {
      skill: 'Simplified pace control',
      setup: '6 paces, 10 putts, 3 ft ring',
      golferDoes: 'Moves closer to find a cleaner pattern.',
      measured: 'Inside count and finish pattern',
      success: '7 of 10 inside the ring',
      failure: 'Pattern is still scattered',
      insight: 'Shows whether the closer start simplified the task.',
      next: 'Ladder',
      difference: 'Reduces difficulty instead of adding pressure.',
    },
  },
}

export function getFirstDrill() {
  return drillByRound[1]
}

export function selectRoundTwoDrill(result) {
  if (!result) return roundTwoVariants.simpleSpeed

  if (result.pattern === 'rushed routine') return roundTwoVariants.slowRoutine
  if (result.pattern === 'mostly short') return roundTwoVariants.pastHole
  if (result.pattern === 'mostly long') return roundTwoVariants.softerPace

  if (result.pattern === 'mostly left' || result.pattern === 'mostly right') {
    return roundTwoVariants.startLine
  }

  if (result.pattern === 'solid speed' || result.pattern === 'make streak') {
    return roundTwoVariants.smallerRing
  }

  if (result.insideCount >= Math.ceil(result.total * 0.7)) {
    return roundTwoVariants.smallerRing
  }

  return roundTwoVariants.simpleSpeed
}

export function getNextDrill(currentDrill, result) {
  if (!currentDrill || currentDrill.round >= ROUND_COUNT) return null
  if (currentDrill.round === 1) return selectRoundTwoDrill(result)

  return drillByRound[currentDrill.round + 1] ?? null
}

export function formatDistanceLabel(drill) {
  if (Array.isArray(drill.distanceSet)) {
    return drill.distanceSet.join(' / ')
  }

  return `${drill.distancePaces} paces`
}


