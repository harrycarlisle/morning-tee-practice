import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CircleDot, Smartphone } from 'lucide-react'
import { formatDistanceLabel } from '../data/puttingDrills.js'
import { ROUTINE_STEPS } from '../data/processSteps.js'
import { ProcessStage } from './ProcessStage.jsx'

const GUIDED_BALLS = 2

export function RoutineDrillTask({ drill, onAppear, onBack, onComplete }) {
  const [ballIndex, setBallIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const ballNumber = ballIndex + 1
  const isPhoneDown = ballIndex >= GUIDED_BALLS
  const step = ROUTINE_STEPS[stepIndex]
  const isFinalGuidedStep = stepIndex === ROUTINE_STEPS.length - 1
  const primaryLabel = getPrimaryLabel({ ballIndex, isFinalGuidedStep, isPhoneDown })
  const remainingBalls = drill.puttCount - GUIDED_BALLS

  useEffect(() => {
    onAppear()
  }, [drill.id, onAppear])

  function handlePrimaryAction() {
    if (isPhoneDown) {
      onComplete()
      return
    }

    if (!isFinalGuidedStep) {
      setStepIndex((currentStep) => currentStep + 1)
      return
    }

    if (ballIndex + 1 >= GUIDED_BALLS) {
      setBallIndex(GUIDED_BALLS)
      setStepIndex(0)
      return
    }

    setBallIndex((currentBall) => currentBall + 1)
    setStepIndex(0)
  }

  return (
    <section className="screen routine-drill" aria-labelledby="routine-drill-title">
      <header className="task-topbar">
        <button
          aria-label="Back to practice hub"
          className="icon-button"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <div
          className="step-pucks routine-ball-pucks"
          aria-label={`${Math.min(ballIndex, GUIDED_BALLS)} of ${drill.puttCount} balls guided`}
        >
          {Array.from({ length: drill.puttCount }, (_, index) => (
            <span
              className={`step-puck ${index < Math.min(ballIndex, GUIDED_BALLS) ? 'is-on' : ''} ${
                index === ballIndex && !isPhoneDown ? 'is-current' : ''
              }`}
              key={index}
            />
          ))}
        </div>
        <span className="task-count">
          {isPhoneDown ? '3-10' : `${ballNumber}/${drill.puttCount}`}
        </span>
      </header>

      <div className="task-title-block routine-title-block">
        <p className="eyebrow">
          <CircleDot size={16} strokeWidth={2.6} />
          Slow routine
        </p>
        <h1 id="routine-drill-title">{isPhoneDown ? 'Phone down.' : step.label}</h1>
        <p className="task-copy">
          {isPhoneDown ? 'Finish putts 3-10.' : step.action}
        </p>
        <p className="task-context">
          {isPhoneDown ? 'Same routine every time.' : `Ball ${ballNumber}: one step at a time.`}
        </p>
        <div className="task-chip-row" aria-label="Drill setup">
          <span>{formatDistanceLabel(drill)}</span>
          <span>{drill.targetSizeFeet} ft ring</span>
        </div>
      </div>

      {isPhoneDown ? (
        <div className="phone-down-card" aria-label="Phone down reminder">
          <div className="phone-pocket" aria-hidden="true">
            <Smartphone size={46} strokeWidth={2.4} />
          </div>
          <div className="remaining-balls" aria-label={`${remainingBalls} balls remaining`}>
            {Array.from({ length: remainingBalls }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="phone-routine-strip" aria-label="Routine reminder">
            {ROUTINE_STEPS.map((item) => (
              <span key={item.label}>{item.label}</span>
            ))}
          </div>
        </div>
      ) : (
        <>
          <ProcessStage className="routine-process-stage" step={step} />
          <div className="process-step-strip" aria-hidden="true">
            {ROUTINE_STEPS.map((item, index) => (
              <span
                className={index === stepIndex ? 'is-current' : ''}
                key={item.label}
              >
                {item.label}
              </span>
            ))}
          </div>
        </>
      )}

      <button className="primary-action" onClick={handlePrimaryAction} type="button">
        {primaryLabel === 'Next' || primaryLabel === 'Next putt' ? (
          <ArrowRight size={20} strokeWidth={3} />
        ) : (
          <Check size={20} strokeWidth={3} />
        )}
        {primaryLabel}
      </button>
    </section>
  )
}

function getPrimaryLabel({ ballIndex, isFinalGuidedStep, isPhoneDown }) {
  if (isPhoneDown) return 'Log results'
  if (!isFinalGuidedStep) return 'Next'
  if (ballIndex + 1 >= GUIDED_BALLS) return 'Phone down'

  return 'Next putt'
}
