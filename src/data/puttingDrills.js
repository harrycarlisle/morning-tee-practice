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
    successRule: 'baseline',
    taskCopy: 'Walk back 8 paces.',
    taskSteps: [
      'Walk back 8 paces.',
      'Hit 10 putts.',
      'Goal: inside 3 ft.',
    ],
    contextCopy: "We'll check your speed.",
    animationVariant: 'speed',
    resultRules: ['inside-count', 'finish-pattern', 'routine-time'],
  },
  3: {
    id: 'ladder',
    round: 3,
    title: 'Ladder',
    distanceSet: [5, 8, 12],
    puttCount: 9,
    targetType: 'ladder',
    targetSizeFeet: 3,
    successRule: 'speed-change',
    taskCopy: 'Three distances. Match the speed.',
    contextCopy: '3 putts each.',
    animationVariant: 'ladder',
    resultRules: ['inside-count', 'distance-spread'],
  },
  4: {
    id: 'gate',
    round: 4,
    title: 'Gate',
    distancePaces: 6,
    puttCount: 10,
    targetType: 'gate',
    targetSizeFeet: 3,
    successRule: 'start-line',
    taskCopy: 'Start it through the gate.',
    contextCopy: 'Begin on line.',
    animationVariant: 'gate',
    resultRules: ['inside-count', 'side-pattern'],
  },
  5: {
    id: 'make-zone',
    round: 5,
    title: 'Make Zone',
    distanceSet: [4, 5],
    puttCount: 10,
    targetType: 'make',
    targetSizeFeet: 1,
    successRule: 'makes',
    taskCopy: 'Make as many as you can.',
    contextCopy: 'Tap the cup for makes.',
    animationVariant: 'make',
    resultRules: ['holed-count', 'inside-count'],
  },
  6: {
    id: 'mixed-test',
    round: 6,
    title: 'Mixed Test',
    distanceSet: ['short', 'medium', 'long'],
    puttCount: 10,
    targetType: 'mixed',
    targetSizeFeet: 3,
    successRule: 'combine-skills',
    taskCopy: 'Short. Medium. Long.',
    contextCopy: 'Finish Level 1.',
    animationVariant: 'mixed',
    resultRules: ['holed-count', 'inside-count', 'finish-pattern'],
  },
}

export const roundTwoVariants = {
  pastHole: {
    id: 'pattern-fix-past-hole',
    round: 2,
    title: 'Past the hole',
    distancePaces: 8,
    puttCount: 10,
    targetType: 'past-hole',
    targetSizeFeet: 3,
    successRule: 'past-cup-speed',
    taskCopy: 'Roll each putt past the cup.',
    contextCopy: 'Beat short misses.',
    animationVariant: 'past-hole',
    resultRules: ['inside-count', 'short-miss-reduction'],
  },
  softerPace: {
    id: 'pattern-fix-softer-pace',
    round: 2,
    title: 'Softer pace',
    distancePaces: 8,
    puttCount: 10,
    targetType: 'ring',
    targetSizeFeet: 3,
    successRule: 'soften-long-misses',
    taskCopy: 'Die it near the cup.',
    contextCopy: 'Long misses hurt.',
    animationVariant: 'soft',
    resultRules: ['inside-count', 'weighted-long-misses'],
  },
  startLine: {
    id: 'pattern-fix-start-line',
    round: 2,
    title: 'Start line',
    distancePaces: 6,
    puttCount: 10,
    targetType: 'gate',
    targetSizeFeet: 3,
    successRule: 'start-line',
    taskCopy: 'Start it through the gate.',
    contextCopy: 'Could be face or aim.',
    animationVariant: 'gate',
    resultRules: ['inside-count', 'side-pattern'],
  },
  smallerRing: {
    id: 'pattern-fix-smaller-ring',
    round: 2,
    title: 'Smaller ring',
    distancePaces: 8,
    puttCount: 10,
    targetType: 'ring',
    targetSizeFeet: 2,
    successRule: 'tighten-speed',
    taskCopy: 'Same putt. Smaller target.',
    contextCopy: 'Level up speed.',
    animationVariant: 'small-ring',
    resultRules: ['inside-count', 'finish-pattern'],
  },
  slowRoutine: {
    id: 'pattern-fix-slow-routine',
    round: 2,
    title: 'Slow routine',
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
  },
  simpleSpeed: {
    id: 'pattern-fix-simple-speed',
    round: 2,
    title: 'Simple speed',
    distancePaces: 6,
    puttCount: 10,
    targetType: 'ring',
    targetSizeFeet: 3,
    successRule: 'simplify-speed',
    taskCopy: 'Same roll. Closer start.',
    contextCopy: 'Find the pattern.',
    animationVariant: 'speed',
    resultRules: ['inside-count', 'finish-pattern'],
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
