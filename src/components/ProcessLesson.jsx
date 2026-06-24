import { useState } from 'react'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { ROUTINE_STEPS } from '../data/processSteps.js'
import { ProcessStage } from './ProcessStage.jsx'

export function ProcessLesson({ onBack, onStart }) {
  const [stepIndex, setStepIndex] = useState(0)
  const step = ROUTINE_STEPS[stepIndex]
  const isFinal = stepIndex === ROUTINE_STEPS.length - 1

  function nextStep() {
    if (isFinal) {
      onStart()
      return
    }

    setStepIndex((currentIndex) => currentIndex + 1)
  }

  return (
    <section className="screen process-lesson" aria-labelledby="process-title">
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
          className="process-pucks"
          aria-label={`${stepIndex + 1} of ${ROUTINE_STEPS.length}`}
        >
          {ROUTINE_STEPS.map((item, index) => (
            <span
              className={`process-puck ${index <= stepIndex ? 'is-on' : ''}`}
              key={item.label}
            />
          ))}
        </div>
        <span className="task-count">{stepIndex + 1}/6</span>
      </header>

      <div className="process-title-block">
        <span className="eyebrow">Same routine</span>
        <h1 id="process-title">{step.label}</h1>
        <p>{step.action}</p>
      </div>

      <ProcessStage step={step} />

      <div className="process-step-strip" aria-hidden="true">
        {ROUTINE_STEPS.map((item, index) => (
          <span className={index === stepIndex ? 'is-current' : ''} key={item.label}>
            {item.label}
          </span>
        ))}
      </div>

      <div className="process-actions">
        <button className="primary-action" onClick={nextStep} type="button">
          {isFinal ? <Play size={19} strokeWidth={2.8} /> : <ArrowRight size={20} strokeWidth={3} />}
          {isFinal ? 'Start drill' : 'Next'}
        </button>
      </div>
    </section>
  )
}
