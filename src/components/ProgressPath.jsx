import { useEffect, useState } from 'react'
import { ArrowRight, Home, LockKeyhole, Trophy } from 'lucide-react'
import { ROUND_COUNT } from '../data/puttingDrills.js'

const baseSkillLabels = {
  1: 'Speed',
  2: 'Fix',
  3: 'Ladder',
  4: 'Line',
  5: 'Make',
  6: 'Pressure',
}

const nodePositions = [
  { x: 16, y: 76 },
  { x: 38, y: 54 },
  { x: 62, y: 76 },
  { x: 82, y: 50 },
  { x: 58, y: 28 },
  { x: 28, y: 32 },
]

const fullPathD =
  'M16 76 C25 42, 36 36, 38 54 S58 96, 62 76 S75 38, 82 50 S68 22, 58 28 S35 48, 28 32'

const segmentPaths = [
  'M16 76 C25 42, 36 36, 38 54',
  'M38 54 C40 72, 58 96, 62 76',
  'M62 76 C66 56, 75 38, 82 50',
  'M82 50 C89 62, 68 22, 58 28',
  'M58 28 C48 34, 35 48, 28 32',
]

export function ProgressPath({
  currentDrill,
  nextDrill,
  onHome,
  onNextRound,
  result,
  roundResults,
}) {
  const [unlocked, setUnlocked] = useState(false)
  const completedRound = result.round
  const isComplete = completedRound >= ROUND_COUNT || !nextDrill
  const purposeLine = isComplete
    ? 'Putting Level 1 complete.'
    : purposeLineForDrill(nextDrill)
  const fillPathD = isComplete
    ? fullPathD
    : segmentPaths[Math.max(0, completedRound - 1)] ?? fullPathD

  useEffect(() => {
    const timer = window.setTimeout(() => setUnlocked(true), 1125)

    return () => window.clearTimeout(timer)
  }, [currentDrill.id, nextDrill?.id])

  return (
    <section className="screen progress-screen" aria-labelledby="path-title">
      <header className="brand-row brand-row--center">
        <div className="brand-mark brand-mark--gold" aria-hidden="true">
          <Trophy size={17} strokeWidth={2.5} />
        </div>
        <span className="path-status">Round {completedRound} done</span>
      </header>

      <div className="path-copy">
        <p className="eyebrow">{isComplete ? 'Done' : 'Unlocked'}</p>
        <h1 id="path-title">
          {isComplete ? 'Level 1 done.' : `Unlocked: ${formatUnlockName(nextDrill.title)}`}
        </h1>
        <p className="path-purpose">{purposeLine}</p>
      </div>

      <div
        className={`path-board ${!isComplete ? 'is-filling' : ''} ${
          unlocked ? 'is-unlocked' : ''
        }`}
        aria-label="Putting progress path"
      >
        <svg aria-hidden="true" className="path-line" viewBox="0 0 100 110">
          <path
            className="path-line-base"
            d={fullPathD}
          />
          <path
            className="path-line-fill"
            d={fillPathD}
            pathLength="100"
          />
        </svg>

        {nodePositions.map((node, index) => {
          const round = index + 1
          const isCompleted = round <= completedRound
          const isNext = nextDrill?.round === round
          const state = getNodeState({ isCompleted, isNext, unlocked })

          return (
            <span
              className={`path-node path-node--${state}`}
              key={round}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {state === 'locked' ? (
                <LockKeyhole size={17} strokeWidth={2.4} />
              ) : (
                <span className="path-node-skill">
                  {nodeLabelForRound(round, currentDrill, nextDrill)}
                </span>
              )}
              <span className="path-node-label">
                {nodeLabelForRound(round, currentDrill, nextDrill)}
              </span>
            </span>
          )
        })}

        <span className="sparkle sparkle--one" />
        <span className="sparkle sparkle--two" />
        <span className="sparkle sparkle--three" />
        <span className="sweep" />
      </div>

      <div className="path-actions">
        {!isComplete && (
          <button
            className="primary-action"
            disabled={!unlocked}
            onClick={onNextRound}
            type="button"
          >
            <ArrowRight size={20} strokeWidth={3} />
            {unlocked ? formatUnlockName(nextDrill.title) : 'Unlocking'}
          </button>
        )}
        <button className="secondary-action" onClick={onHome} type="button">
          <Home size={18} strokeWidth={2.5} />
          Home
        </button>
      </div>

      <span className="path-round-count" aria-hidden="true">
        Path {roundResults.length}/{ROUND_COUNT}
      </span>
    </section>
  )
}

function getNodeState({ isCompleted, isNext, unlocked }) {
  if (isCompleted) return 'gold'
  if (isNext && unlocked) return 'open'
  if (isNext) return 'pending'

  return 'locked'
}

function formatUnlockName(title) {
  return title
    .split(' ')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
}

function nodeLabelForRound(round, currentDrill, nextDrill) {
  if (currentDrill?.round === round) return shortSkillName(currentDrill.title)
  if (nextDrill?.round === round) return shortSkillName(nextDrill.title)

  return baseSkillLabels[round] ?? `R${round}`
}

function shortSkillName(title) {
  const names = {
    'Speed Check': 'Speed',
    'Past the Cup': 'Past',
    'Softer Pace': 'Soft',
    'Start Line': 'Line',
    'Smaller Ring': 'Small',
    'Slow Routine': 'Reset',
    'Simple Speed': 'Simple',
    Ladder: 'Ladder',
    'Make Zone': 'Make',
    'Pressure Test': 'Press',
  }

  return names[title] ?? title
}

function purposeLineForDrill(drill) {
  const lines = {
    'pattern-fix-past-hole': 'Stop leaving it short.',
    'pattern-fix-softer-pace': 'Soften the pace.',
    'pattern-fix-start-line': 'Start it through the gate.',
    'pattern-fix-smaller-ring': 'Shrink the target.',
    'pattern-fix-slow-routine': 'Reset before every putt.',
    'pattern-fix-simple-speed': 'Simplify the speed.',
    ladder: 'Change speed cleanly.',
    'start-line': 'Start it on line.',
    'make-zone': 'Hole short putts.',
    'pressure-test': 'Pass the set.',
  }

  return lines[drill?.id] ?? drill?.taskCopy ?? 'Keep moving forward.'
}


