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
    return distance <= targetFeet && point.y <= DEFAULT_HOLE.y + 2
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
  const completedTooFast = isRushedRoutine(total, elapsedSeconds)
  const counts = buildCounts(points, drill)
  const outsideCount = Math.max(0, total - counts.inside)

  let pattern = selectPattern({
    counts,
    drill,
    outsideCount,
    total,
    completedTooFast,
  })

  if (drill?.targetType === 'make' && counts.holed >= 6) {
    pattern = 'make streak'
  }

  const processFeedback = getProcessFeedback({
    drill,
    elapsedSeconds,
    pattern,
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
    pattern,
    patternLabel: patternLabelForPattern(pattern),
    nextAction: processFeedback?.nextAction ?? nextActionForPattern(pattern),
    processFeedback,
    counts,
    elapsedSeconds,
    rushed: completedTooFast,
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
  }

  return actions[pattern] ?? 'repeat the setup'
}

export function patternLabelForPattern(pattern) {
  const labels = {
    'rushed routine': 'too fast',
  }

  return labels[pattern] ?? pattern
}

function getProcessFeedback({ drill, elapsedSeconds, pattern, previousResult }) {
  if (drill?.id !== 'pattern-fix-slow-routine') return null

  const timeImproved =
    previousResult?.elapsedSeconds && elapsedSeconds > previousResult.elapsedSeconds

  if (pattern === 'rushed routine') {
    return {
      status: 'still-rushed',
      lines: ['Still rushed.', 'Slow the reset.'],
      nextAction: 'same routine every putt',
      shouldRetry: false,
    }
  }

  if (timeImproved) {
    return {
      status: 'routine-helped',
      lines: ['Better reset.', 'Routine helped.'],
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

  if (drill?.targetType === 'ring' && drill?.successRule === 'soften-long-misses') {
    counts.long += Math.floor(counts.long / 2)
  }

  return counts
}

function selectPattern({ counts, drill, outsideCount, total, completedTooFast }) {
  if (completedTooFast) return 'rushed routine'
  if (drill?.targetType === 'make' && counts.holed >= 6) return 'make streak'

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

function isRushedRoutine(total, elapsedSeconds) {
  if (!elapsedSeconds) return false

  const minimumSeconds = Math.max(24, total * 4)

  return elapsedSeconds < minimumSeconds
}
