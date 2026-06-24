import { useEffect } from 'react'
import { ArrowLeft, Check, CircleDot } from 'lucide-react'
import { ROUND_COUNT, formatDistanceLabel } from '../data/puttingDrills.js'

export function DrillTask({ drill, onAppear, onBack, onComplete }) {
  const distanceTags = Array.isArray(drill.distanceSet)
    ? drill.distanceSet
    : [drill.distancePaces]
  const targetScale = Math.max(0.55, drill.targetSizeFeet / 3)

  useEffect(() => {
    onAppear()
  }, [drill.id, onAppear])

  return (
    <section className="screen drill-task" aria-labelledby="drill-title">
      <header className="task-topbar">
        <button
          aria-label="Back to practice hub"
          className="icon-button"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <div className="step-pucks" aria-hidden="true">
          {Array.from({ length: ROUND_COUNT }, (_, index) => (
            <span
              className={`step-puck ${index + 1 <= drill.round ? 'is-on' : ''}`}
              key={index}
            />
          ))}
        </div>
        <span className="task-count">{drill.round}/6</span>
      </header>

      <div className="task-title-block">
        <p className="eyebrow">
          <CircleDot size={16} strokeWidth={2.6} />
          Putting
        </p>
        <h1 id="drill-title">{drill.title}</h1>
        {drill.taskSteps ? (
          <ul className="task-step-list">
            {drill.taskSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        ) : (
          <p className="task-copy">{drill.taskCopy}</p>
        )}
        <p className="task-context">{drill.contextCopy}</p>
        <div className="task-chip-row" aria-label="Drill setup">
          <span>{formatDistanceLabel(drill)}</span>
          <span>{drill.puttCount} putts</span>
          <span>{drill.targetSizeFeet} ft</span>
        </div>
      </div>

      <div className="setup-stage" aria-hidden="true">
        <div
          className={`setup-green setup-green--${drill.animationVariant}`}
          style={{ '--target-scale': targetScale }}
        >
          <span className="setup-flag" />
          <span className="setup-hole" />
          <span className="setup-ring setup-ring--target" />
          <span className="setup-ring setup-ring--soft" />
          {drill.targetType === 'past-hole' && <span className="past-zone" />}
          {(drill.targetType === 'gate' || drill.animationVariant === 'gate') && (
            <span className="setup-gate" />
          )}
          {drill.animationVariant === 'routine' && <span className="routine-pulse" />}
          <span className="walk-line" />
          <span className="walk-puck" />
          <span className="walk-label">{distanceTags[0]}</span>
          <div className="distance-tags">
            {distanceTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="ball-rack">
            {Array.from({ length: Math.min(drill.puttCount, 10) }, (_, index) => (
              <span key={index} style={{ '--i': index }} />
            ))}
          </div>
        </div>
      </div>

      <button className="primary-action" onClick={onComplete} type="button">
        <Check size={20} strokeWidth={3} />
        I hit {drill.puttCount} putts
      </button>
    </section>
  )
}
