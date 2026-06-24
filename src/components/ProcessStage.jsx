export function ProcessStage({ className = '', step }) {
  return (
    <div
      className={`process-stage process-stage--${step.variant} ${className}`.trim()}
      aria-label={`${step.label} visual`}
    >
      <span className="process-cup" />
      <span className="process-ball" />
      <span className="process-marker" />
      <span className="process-player" />
      <span className="process-line" />
      <span className="process-glow" />
      <span className="process-arc process-arc--one" />
      <span className="process-arc process-arc--two" />
      <span className="process-putter" />
      <span className="process-eye" />
      <span className="process-roll-ball" />
    </div>
  )
}
