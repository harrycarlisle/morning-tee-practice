import { useState } from 'react'
import { ArrowRight, Info, RotateCcw, Target } from 'lucide-react'

export function ResultsCard({
  handedness,
  onContinue,
  onReplay,
  onSetHandedness,
  result,
  shouldAskHandedness,
}) {
  const [showWhy, setShowWhy] = useState(false)
  const scoreText = result.primaryMetricText ?? `${result.insideCount}/${result.total} inside target`
  const scorePercent =
    result.total === 0 ? 0 : Math.round((result.insideCount / result.total) * 100)
  const isRushed = result.pattern === 'rushed routine'
  const hasProcessFeedback = Boolean(result.processFeedback)
  const title = resultTitle(result, scoreText)
  const normalizedTitle = title.replace(/[.]$/, '')
  const normalizedScore = scoreText.replace(/[.]$/, '')
  const showStat = normalizedTitle !== normalizedScore
  const feedbackLines = isRushed && !hasProcessFeedback
    ? []
    : (result.processFeedback?.lines.filter((line) => line !== title) ?? [])
  const timingText = result.elapsedSeconds
    ? `Your set took ${formatElapsedTime(result.elapsedSeconds)}.`
    : ''
  const showTiming = timingText && (isRushed || hasProcessFeedback)
  const whyText = whyTextForResult(result)
  const summaryStats = [
    ...(result.subStatText ? [result.subStatText] : []),
    ...(result.holedCount > 0 && result.primaryMetricKey !== 'holed'
      ? [`${result.holedCount} holed`]
      : []),
  ]

  return (
    <section
      className={`screen results-screen ${result.perfectSet ? 'is-perfect' : ''}`}
      aria-labelledby="results-title"
    >
      <div className="results-visual" aria-hidden="true">
        <div className="score-orbit" style={{ '--score': `${scorePercent}%` }}>
          <span>{result.insideCount}</span>
        </div>
        <div className={`pattern-compass pattern-compass--${patternClass(result.pattern)}`}>
          <span />
        </div>
        {result.perfectSet && <div className="perfect-burst" />}
      </div>

      <div className={`result-card ${isRushed ? 'result-card--rushed' : ''}`}>
        <p className="eyebrow">
          <Target size={16} strokeWidth={2.6} />
          Round {result.round}
        </p>
        <h1 id="results-title">{title}</h1>

        <div className="result-summary">
          {showStat && <span>{scoreText}</span>}
          {summaryStats.map((stat) => (
            <span key={stat}>{stat}</span>
          ))}
        </div>

        <div className="result-why">
          <span>{whyText}</span>
          {showTiming && (
            <div className="result-timing">
              <span>{timingText}</span>
              {isRushed && <span>That's fast for {result.total} putts.</span>}
            </div>
          )}
          {isRushed && (
            <button
              aria-expanded={showWhy}
              onClick={() => setShowWhy((isOpen) => !isOpen)}
              type="button"
            >
              <Info size={15} strokeWidth={2.5} />
              Why
            </button>
          )}
          {isRushed && showWhy && (
            <p>
              Research supports using a repeatable routine. A steady final look can
              help.
            </p>
          )}
        </div>

        {feedbackLines.length > 0 && (
          <div className="process-feedback">
            {feedbackLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        )}

        <p className="coach-line">Next: {result.nextAction}.</p>

        {shouldAskHandedness && (
          <div className="handedness-card">
            <p>Which side do you putt from?</p>
            <div>
              <button onClick={() => onSetHandedness('left')} type="button">
                Left
              </button>
              <button onClick={() => onSetHandedness('right')} type="button">
                Right
              </button>
            </div>
          </div>
        )}

        {handedness && isSidePattern(result.pattern) && (
          <p className="handedness-note">Could be face or aim.</p>
        )}
      </div>

      <div className="result-actions">
        <button className="primary-action" onClick={onContinue} type="button">
          <ArrowRight size={20} strokeWidth={3} />
          Continue
        </button>
        <button className="secondary-action" onClick={onReplay} type="button">
          <RotateCcw size={18} strokeWidth={2.5} />
          Retry
        </button>
      </div>
    </section>
  )
}

function resultTitle(result, scoreText) {
  if (result.headline) return result.headline
  if (result.processFeedback?.status === 'routine-helped') return 'Better reset.'
  if (result.processFeedback?.status === 'still-rushed') return 'Still rushed.'
  if (result.pattern === 'rushed routine') return "You're moving fast."
  if (result.pattern === 'mostly short') return 'Mostly short.'
  if (result.pattern === 'mostly long') return 'Mostly long.'
  if (result.pattern === 'mostly left') return 'Mostly left.'
  if (result.pattern === 'mostly right') return 'Mostly right.'
  if (result.pattern === 'scattered') return 'Finishes spread out.'
  if (result.pattern === 'make streak') return 'Make streak.'
  if (result.pattern === 'solid speed') return "You've got the pace."

  return scoreText
}

function whyTextForResult(result) {
  if (result.insight) return result.insight

  const whyText = {
    'rushed routine': 'Fast sets make your routine harder to repeat.',
    'mostly short': 'Too many finished before the cup.',
    'mostly long': 'Pace carried past the target.',
    'mostly left': 'Start line may need a check.',
    'mostly right': 'Start line may need a check.',
    scattered: 'Start with a simpler roll.',
    'solid speed': 'Your speed is ready to tighten.',
    'make streak': 'You handled the make zone.',
  }

  if (result.processFeedback?.status === 'routine-helped') {
    return 'A repeatable routine can help your pace.'
  }

  if (result.processFeedback?.status === 'still-rushed') {
    return 'Fast sets make your routine harder to repeat.'
  }

  return whyText[result.pattern] ?? 'Keep the next target simple.'
}

function formatElapsedTime(seconds) {
  if (seconds < 60) return `${seconds} seconds`

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (remainingSeconds === 0) return `${minutes} min`

  return `${minutes} min ${remainingSeconds} sec`
}

function patternClass(pattern) {
  const classes = {
    'mostly short': 'short',
    'mostly long': 'long',
    'mostly left': 'left',
    'mostly right': 'right',
    scattered: 'speed',
    'rushed routine': 'routine',
    'solid speed': 'centered',
    'make streak': 'make',
    'past-cup-success': 'centered',
    'past-cup-short': 'short',
    'softer-pace-success': 'centered',
    'softer-pace-long': 'long',
    'start-line-tight': 'centered',
    'start-line-leak': 'left',
    'smaller-ring-success': 'centered',
    'smaller-ring-loose': 'speed',
    'routine-helped': 'routine',
    'ladder-balanced': 'centered',
    'ladder-gap': 'speed',
    'make-zone-success': 'make',
    'make-zone-work': 'make',
    'pressure-pass': 'make',
    'pressure-fail': 'speed',
  }

  return classes[pattern] ?? 'speed'
}

function isSidePattern(pattern) {
  return pattern === 'mostly left' || resultSideLeak(pattern)
}

function resultSideLeak(pattern) {
  return pattern === 'mostly right' || pattern === 'start-line-leak'
}

