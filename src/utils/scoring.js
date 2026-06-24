export const GREEN_SPACE = {
  width: 100,
  height: 140,
}

export const DEFAULT_HOLE = {
  x: 50,
  y: 42,
}

export const DEFAULT_TARGET_RADIUS = 18
export const DEFAULT_TARGET_FEET = 3

export function distanceFromHole(
  point,
  hole = DEFAULT_HOLE,
  targetRadius = DEFAULT_TARGET_RADIUS,
  targetFeet = DEFAULT_TARGET_FEET,
) {
  const dx = point.x - hole.x
  const dy = point.y - hole.y
  const distanceInMapUnits = Math.sqrt(dx * dx + dy * dy)

  return (distanceInMapUnits / targetRadius) * targetFeet
}

export function insideTarget(point, drill) {
  if (point.holed) return true

  const targetFeet = drill?.targetSizeFeet ?? DEFAULT_TARGET_FEET
  const distance = distanceFromHole(point)

  if (drill?.targetType === 'past-hole') {
    return isPastCupSafe(point, drill)
  }

  if (drill?.targetType === 'make') {
    return distance <= 1
  }

  return distance <= targetFeet
}

export function missSide(
  point,
  hole = DEFAULT_HOLE,
  targetRadius = DEFAULT_TARGET_RADIUS,
) {
  if (point.holed) return 'center'

  const dx = point.x - hole.x
  const threshold = targetRadius * 0.34

  if (dx < -threshold) return 'left'
  if (dx > threshold) return 'right'

  return 'center'
}

export function missDepth(
  point,
  hole = DEFAULT_HOLE,
  targetRadius = DEFAULT_TARGET_RADIUS,
) {
  if (point.holed) return 'pin-high'

  const dy = point.y - hole.y
  const threshold = targetRadius * 0.52

  if (dy > threshold) return 'short'
  if (dy < -threshold) return 'long'

  return 'pin-high'
}

export function mainResultPattern(points, drill, elapsedMs = 0, previousResult = null) {
  const total = drill?.puttCount ?? points.length
  const elapsedSeconds = elapsedMs > 0 ? Math.max(1, Math.ceil(elapsedMs / 1000)) : 0
  const checksRoutineTime = drill?.resultRules?.includes('routine-time')
  const completedTooFast = checksRoutineTime && isRushedRoutine(total, elapsedSeconds)
  const counts = buildCounts(points, drill)
  const outsideCount = Math.max(0, total - counts.inside)
  const evaluation = evaluateDrill({
    points,
    drill,
    counts,
    outsideCount,
    total,
    completedTooFast,
    elapsedSeconds,
    previousResult,
  })
  const processFeedback = getProcessFeedback({
    counts,
    drill,
    elapsedSeconds,
    pattern: evaluation.pattern,
    previousResult,
  })

  return {
    drillId: drill?.id,
    drillTitle: drill?.title ?? 'Putting',
    round: drill?.round ?? 1,
    total,
    insideCount: counts.inside,
    outsideCount,
    holedCount: counts.holed,
    pattern: evaluation.pattern,
    patternLabel: patternLabelForPattern(evaluation.pattern),
    headline: processFeedback?.headline ?? evaluation.headline,
    primaryMetricText: evaluation.primaryMetricText,
    primaryMetricKey: evaluation.primaryMetricKey,
    subStatText: evaluation.subStatText,
    insight: processFeedback?.insight ?? evaluation.insight,
    nextAction: processFeedback?.nextAction ?? evaluation.nextAction ?? nextActionForPattern(evaluation.pattern),
    processFeedback,
    counts,
    drillStats: evaluation.drillStats ?? null,
    elapsedSeconds,
    rushed: completedTooFast,
    success: evaluation.success,
    targetFeet: drill?.targetSizeFeet ?? DEFAULT_TARGET_FEET,
    perfectSet: total > 0 && counts.holed === total,
  }
}

export function formatFeet(feet) {
  if (feet < 0.08) return '0 in'
  if (feet < 1) return `${Math.round(feet * 12)} in`

  const wholeFeet = Math.floor(feet)
  const inches = Math.round((feet - wholeFeet) * 12)

  if (inches === 0) return `${wholeFeet} ft`
  if (inches === 12) return `${wholeFeet + 1} ft`

  return `${wholeFeet} ft ${inches} in`
}

export function targetRadiusForFeet(targetFeet = DEFAULT_TARGET_FEET) {
  return DEFAULT_TARGET_RADIUS * (targetFeet / DEFAULT_TARGET_FEET)
}

export function nextActionForPattern(pattern) {
  const actions = {
    'mostly short': 'roll past the cup',
    'mostly long': 'die it near the cup',
    'mostly left': 'start it through the gate',
    'mostly right': 'start it through the gate',
    scattered: 'roll a simpler putt',
    'rushed routine': 'same routine every putt',
    'solid speed': 'shrink the target',
    'make streak': 'raise the pressure',
    'past-cup-success': 'ladder speed',
    'past-cup-short': 'roll past the cup',
    'softer-pace-success': 'ladder speed',
    'softer-pace-long': 'softer pace',
    'start-line-tight': 'make short putts',
    'start-line-leak': 'start it through the gate',
    'smaller-ring-success': 'ladder speed',
    'smaller-ring-loose': 'tighten the ring',
    'ladder-balanced': 'start line',
    'ladder-gap': 'repeat the weak distance',
    'make-zone-success': 'pressure test',
    'make-zone-work': 'build the make streak',
    'pressure-pass': 'Level 1 complete',
    'pressure-fail': 'run it back',
  }

  return actions[pattern] ?? 'repeat the setup'
}

export function patternLabelForPattern(pattern) {
  const labels = {
    'rushed routine': 'too fast',
    'past-cup-success': 'past cup',
    'past-cup-short': 'still short',
    'softer-pace-success': 'softer pace',
    'softer-pace-long': 'still long',
    'start-line-tight': 'tight line',
    'start-line-leak': 'line leak',
    'smaller-ring-success': 'tight speed',
    'smaller-ring-loose': 'target loose',
    'ladder-balanced': 'balanced ladder',
    'ladder-gap': 'distance gap',
    'make-zone-success': 'make zone',
    'make-zone-work': 'make work',
    'pressure-pass': 'passed',
    'pressure-fail': 'run back',
  }

  return labels[pattern] ?? pattern
}

function evaluateDrill({
  points,
  drill,
  counts,
  outsideCount,
  total,
  completedTooFast,
  elapsedSeconds,
  previousResult,
}) {
  if (completedTooFast) {
    return {
      pattern: 'rushed routine',
      headline: drill?.id === 'pattern-fix-slow-routine' ? 'Still rushed.' : "You're moving fast.",
      primaryMetricText: `${counts.inside}/${total} inside target`,
      insight: 'Fast sets make your routine harder to repeat.',
      nextAction: 'same routine every putt',
      success: false,
    }
  }

  switch (drill?.successRule) {
    case 'past-cup-speed':
      return evaluatePastCup(points, drill, total)
    case 'soften-long-misses':
      return evaluateSofterPace(counts, drill, total)
    case 'start-line':
      return evaluateStartLine(counts, drill, total)
    case 'tighten-speed':
      return evaluateSmallerRing(counts, drill, total)
    case 'routine-reset':
      return evaluateRoutineReset(counts, drill, total, elapsedSeconds, previousResult)
    case 'simplify-speed':
      return evaluateSimpleSpeed(counts, drill, outsideCount, total)
    case 'ladder-proximity':
      return evaluateLadder(points, counts, drill, total)
    case 'short-makes':
      return evaluateMakeZone(points, counts, drill, total)
    case 'pressure-pass':
      return evaluatePressureTest(points, counts, total)
    case 'baseline-speed':
    default:
      return evaluateBaseline(counts, drill, outsideCount, total)
  }
}

function evaluateBaseline(counts, drill, outsideCount, total) {
  const pattern = selectFinishPattern({ counts, outsideCount, total })

  return {
    pattern,
    headline: headlineForGenericPattern(pattern),
    primaryMetricText: `${counts.inside}/${total} inside target`,
    insight: insightForGenericPattern(pattern),
    nextAction: nextActionForPattern(pattern),
    success: counts.inside >= successCount(drill, total),
  }
}

function evaluateSimpleSpeed(counts, drill, outsideCount, total) {
  const generic = evaluateBaseline(counts, drill, outsideCount, total)

  if (generic.success) {
    return {
      ...generic,
      pattern: 'solid speed',
      headline: 'Pattern found.',
      insight: 'The closer start cleaned up the roll.',
      nextAction: 'ladder speed',
    }
  }

  return {
    ...generic,
    headline: 'Still scattered.',
    insight: 'The closer start still needs a cleaner roll.',
    nextAction: 'repeat the simple speed',
  }
}

function evaluatePastCup(points, drill, total) {
  const pastCupCount = points.filter((point) => isPastCupSafe(point, drill)).length
  const shortCount = points.filter((point) => !point.holed && missDepth(point) === 'short').length
  const success = pastCupCount >= (drill.successThreshold ?? successCount(drill, total))

  return {
    pattern: success ? 'past-cup-success' : 'past-cup-short',
    headline: success ? 'Better speed.' : 'Still short.',
    primaryMetricText: `${pastCupCount}/${total} past cup`,
    subStatText: shortCount > 0 ? `${shortCount} short` : 'No short misses',
    insight: success
      ? `You got ${pastCupCount}/${total} past the cup.`
      : 'Too many still stopped before the cup.',
    nextAction: success ? 'ladder speed' : 'roll past the cup',
    success,
    drillStats: { pastCupCount, shortCount },
  }
}

function evaluateSofterPace(counts, drill, total) {
  const longMisses = counts.long
  const success = counts.inside >= successCount(drill, total) && longMisses <= 2

  return {
    pattern: success ? 'softer-pace-success' : 'softer-pace-long',
    headline: success ? 'Misses stayed close.' : 'Still running long.',
    primaryMetricText: `${counts.inside}/${total} inside target`,
    subStatText: `${longMisses} long`,
    insight: success ? 'Your misses stayed closer.' : 'Long misses are stretching the set.',
    nextAction: success ? 'ladder speed' : 'softer pace',
    success,
    drillStats: { longMisses },
  }
}

function evaluateStartLine(counts, drill, total) {
  const centerLineCount = counts.center
  const sideBias = counts.left >= counts.right ? 'left' : 'right'
  const sideBiasCount = Math.max(counts.left, counts.right)
  const success = centerLineCount >= successCount(drill, total)
  const isRoundTwo = drill?.round === 2

  return {
    pattern: success ? 'start-line-tight' : 'start-line-leak',
    headline: success ? 'Start line tightened.' : `Still leaking ${sideBias}.`,
    primaryMetricText: `${centerLineCount}/${total} center line`,
    subStatText: success ? 'Gate held' : `${sideBiasCount} ${sideBias}`,
    insight: success ? 'Your start line tightened.' : 'Face or aim may still be leaking.',
    nextAction: success
      ? isRoundTwo ? 'ladder speed' : 'make short putts'
      : 'start it through the gate',
    success,
    drillStats: { centerLineCount, sideBias, sideBiasCount },
  }
}

function evaluateSmallerRing(counts, drill, total) {
  const success = counts.inside >= successCount(drill, total)

  return {
    pattern: success ? 'smaller-ring-success' : 'smaller-ring-loose',
    headline: success ? 'Precision held.' : 'Target got tight.',
    primaryMetricText: `${counts.inside}/${total} inside ${drill.targetSizeFeet} ft`,
    insight: success ? 'Your speed held up in the smaller ring.' : 'Good speed needs a tighter finish.',
    nextAction: success ? 'ladder speed' : 'tighten the ring',
    success,
  }
}

function evaluateRoutineReset(counts, drill, total, elapsedSeconds, previousResult) {
  const generic = evaluateBaseline(counts, drill, Math.max(0, total - counts.inside), total)
  const timeImproved = previousResult?.elapsedSeconds
    ? elapsedSeconds > previousResult.elapsedSeconds
    : false
  const insideImproved = previousResult?.insideCount === undefined
    ? counts.inside >= successCount(drill, total)
    : counts.inside >= previousResult.insideCount
  const success = timeImproved && insideImproved

  return {
    ...generic,
    pattern: success ? 'routine-helped' : generic.pattern,
    headline: success ? 'Better reset.' : generic.headline,
    primaryMetricText: `${counts.inside}/${total} inside target`,
    insight: success ? 'Routine helped your pace.' : generic.insight,
    nextAction: success ? 'ladder speed' : generic.nextAction,
    success,
    drillStats: { timeImproved, insideImproved },
  }
}

function evaluateLadder(points, counts, drill, total) {
  const buckets = distanceBucketStats(points, drill)
  const success = buckets.every((bucket) => bucket.inside >= (drill.successThreshold ?? 2))
  const strongest = [...buckets].sort((a, b) => b.inside - a.inside)[0]
  const weakest = [...buckets].sort((a, b) => a.inside - b.inside)[0]

  return {
    pattern: success ? 'ladder-balanced' : 'ladder-gap',
    headline: success ? 'Speeds matched.' : `${formatBucketLabel(weakest.label)} needs work.`,
    primaryMetricText: `${counts.inside}/${total} inside target`,
    subStatText: success
      ? `${formatBucketLabel(strongest.label)} strong`
      : `${formatBucketLabel(strongest.label)} strong`,
    insight: success
      ? 'You handled every distance.'
      : `${formatBucketLabel(strongest.label)} was strong. ${formatBucketLabel(weakest.label)} needs work.`,
    nextAction: success ? 'start line' : `repeat ${formatBucketLabel(weakest.label)}`,
    success,
    drillStats: { buckets, strongest, weakest },
  }
}

function evaluateMakeZone(points, counts, drill, total) {
  const bestStreak = bestHoleStreak(points)
  const success = counts.holed >= (drill.successThreshold ?? 6)

  return {
    pattern: success ? 'make-zone-success' : 'make-zone-work',
    headline: `${counts.holed}/${total} made.`,
    primaryMetricText: `${counts.holed}/${total} made`,
    primaryMetricKey: 'holed',
    subStatText: `Best streak: ${bestStreak}`,
    insight: success ? 'You held the make zone.' : 'Build the make streak.',
    nextAction: success ? 'pressure test' : 'make-zone reps',
    success,
    drillStats: { bestStreak },
  }
}

function evaluatePressureTest(points, counts, total) {
  const shortGroup = points.slice(0, 3)
  const mediumGroup = points.slice(3, 6)
  const longGroup = points.slice(6)
  const shortMakes = shortGroup.filter((point) => point.holed).length
  const mediumInside = mediumGroup.filter((point) => insideTarget(point)).length
  const longInside = longGroup.filter((point) => insideTarget(point)).length
  const success = shortMakes >= 2 && counts.inside >= Math.ceil(total * 0.7)

  return {
    pattern: success ? 'pressure-pass' : 'pressure-fail',
    headline: success ? 'Passed.' : 'Run it back.',
    primaryMetricText: `${counts.inside}/${total} inside target`,
    subStatText: `${shortMakes}/3 short made`,
    insight: success ? 'Putting Level 1 is complete.' : 'The set missed the pass mark.',
    nextAction: success ? 'Level 1 complete' : 'run it back',
    success,
    drillStats: { shortMakes, mediumInside, longInside },
  }
}

function getProcessFeedback({ counts, drill, elapsedSeconds, pattern, previousResult }) {
  if (drill?.id !== 'pattern-fix-slow-routine') return null

  const timeImproved = previousResult?.elapsedSeconds
    ? elapsedSeconds > previousResult.elapsedSeconds
    : false
  const insideImproved = previousResult?.insideCount === undefined
    ? false
    : counts.inside >= previousResult.insideCount

  if (pattern === 'rushed routine') {
    return {
      status: 'still-rushed',
      headline: 'Still rushed.',
      lines: ['Slow the reset.'],
      insight: 'Fast sets make your routine harder to repeat.',
      nextAction: 'same routine every putt',
      shouldRetry: false,
    }
  }

  if (timeImproved && insideImproved) {
    return {
      status: 'routine-helped',
      headline: 'Better reset.',
      lines: ['Routine helped.'],
      insight: 'A repeatable routine can help your pace.',
      nextAction: 'ladder speed',
      shouldRetry: false,
    }
  }

  return null
}

function buildCounts(points, drill) {
  const counts = {
    inside: 0,
    holed: 0,
    short: 0,
    long: 0,
    left: 0,
    right: 0,
    center: 0,
    'pin-high': 0,
  }

  points.forEach((point) => {
    if (point.holed) counts.holed += 1
    if (insideTarget(point, drill)) counts.inside += 1

    counts[missSide(point)] += 1
    counts[missDepth(point)] += 1
  })

  return counts
}

function selectFinishPattern({ counts, outsideCount, total }) {
  const strongThreshold = Math.max(4, Math.ceil(total * 0.45))

  if (counts.short >= strongThreshold && counts.short > counts.long) {
    return 'mostly short'
  }

  if (counts.long >= strongThreshold && counts.long > counts.short) {
    return 'mostly long'
  }

  if (counts.left >= strongThreshold && counts.left > counts.right) {
    return 'mostly left'
  }

  if (counts.right >= strongThreshold && counts.right > counts.left) {
    return 'mostly right'
  }

  if (counts.inside >= Math.ceil(total * 0.7) && outsideCount <= Math.floor(total * 0.3)) {
    return 'solid speed'
  }

  return 'scattered'
}

function headlineForGenericPattern(pattern) {
  const headlines = {
    'mostly short': 'Mostly short.',
    'mostly long': 'Mostly long.',
    'mostly left': 'Mostly left.',
    'mostly right': 'Mostly right.',
    scattered: 'Finishes spread out.',
    'solid speed': "You've got the pace.",
    'make streak': 'Make streak.',
  }

  return headlines[pattern]
}

function insightForGenericPattern(pattern) {
  const insights = {
    'mostly short': 'Too many finished before the cup.',
    'mostly long': 'Pace carried past the target.',
    'mostly left': 'Start line may need a check.',
    'mostly right': 'Start line may need a check.',
    scattered: 'Start with a simpler roll.',
    'solid speed': 'Your speed is ready to tighten.',
    'make streak': 'You handled the make zone.',
  }

  return insights[pattern] ?? 'Keep the next target simple.'
}

function successCount(drill, total) {
  const threshold = drill?.successThreshold ?? 0.7

  if (threshold > 0 && threshold < 1) {
    return Math.ceil(total * threshold)
  }

  return threshold
}

function isPastCupSafe(point, drill) {
  if (point.holed) return true

  const targetFeet = drill?.targetSizeFeet ?? DEFAULT_TARGET_FEET
  const distance = distanceFromHole(point)

  return distance <= targetFeet && point.y <= DEFAULT_HOLE.y + 2
}

function distanceBucketStats(points, drill) {
  const labels = drill?.distanceSet ?? []
  const bucketSize = labels.length > 0 ? Math.floor((drill.puttCount ?? points.length) / labels.length) : 0

  return labels.map((label, index) => {
    const start = index * bucketSize
    const end = index === labels.length - 1 ? points.length : start + bucketSize
    const bucketPoints = points.slice(start, end)
    const inside = bucketPoints.filter((point) => insideTarget(point, drill)).length

    return {
      label,
      total: bucketPoints.length,
      inside,
    }
  })
}

function formatBucketLabel(label) {
  return typeof label === 'number' ? `${label} paces` : label
}

function bestHoleStreak(points) {
  let current = 0
  let best = 0

  points.forEach((point) => {
    if (point.holed) {
      current += 1
      best = Math.max(best, current)
      return
    }

    current = 0
  })

  return best
}

function isRushedRoutine(total, elapsedSeconds) {
  if (!elapsedSeconds) return false

  const minimumSeconds = Math.max(24, total * 4)

  return elapsedSeconds < minimumSeconds
}
