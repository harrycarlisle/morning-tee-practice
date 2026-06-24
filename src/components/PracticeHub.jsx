import {
  CircleDot,
  Flag,
  Lock,
  Mountain,
  Sprout,
  Target,
} from 'lucide-react'

const areas = [
  {
    name: 'Putting',
    state: 'available',
    Icon: CircleDot,
    cue: 'Start',
  },
  {
    name: 'Chipping',
    state: 'soon',
    Icon: Sprout,
    cue: 'Soon',
  },
  {
    name: 'Approach',
    state: 'soon',
    Icon: Flag,
    cue: 'Soon',
  },
  {
    name: 'Driving',
    state: 'soon',
    Icon: Target,
    cue: 'Soon',
  },
]

export function PracticeHub({ onStartPutting }) {
  return (
    <section className="screen practice-hub" aria-labelledby="practice-title">
      <header className="brand-row">
        <div className="brand-mark" aria-hidden="true">
          <Mountain size={18} strokeWidth={2.6} />
        </div>
        <span>Morning Tee</span>
      </header>

      <div className="hub-hero">
        <div className="hero-green" aria-hidden="true">
          <span className="hero-hole" />
          <span className="hero-ring hero-ring--inner" />
          <span className="hero-ring hero-ring--outer" />
          <span className="hero-path" />
          <span className="hero-puck" />
          <span className="hero-ball hero-ball--one" />
          <span className="hero-ball hero-ball--two" />
          <span className="hero-ball hero-ball--three" />
        </div>
        <div>
          <p className="eyebrow">Practice</p>
          <h1 id="practice-title">Choose a drill.</h1>
        </div>
      </div>

      <div className="area-grid" aria-label="Practice areas">
        {areas.map(({ name, state, Icon, cue }) => {
          const isAvailable = state === 'available'

          return (
            <button
              className={`area-card ${isAvailable ? 'is-available' : 'is-locked'}`}
              disabled={!isAvailable}
              key={name}
              onClick={isAvailable ? onStartPutting : undefined}
              type="button"
            >
              <span className="area-visual" aria-hidden="true">
                <Icon size={28} strokeWidth={2.4} />
              </span>
              <span className="area-name">{name}</span>
              <span className="area-cue">
                {!isAvailable && <Lock size={13} strokeWidth={2.5} />}
                {cue}
              </span>
            </button>
          )
        })}
      </div>

      <div className="hub-status" aria-hidden="true">
        <span className="status-puck is-live" />
        <span className="status-puck" />
        <span className="status-puck" />
        <span className="status-line" />
      </div>
    </section>
  )
}
