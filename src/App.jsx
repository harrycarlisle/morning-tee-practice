import { useCallback, useState } from 'react'
import { PracticeHub } from './components/PracticeHub.jsx'
import { DrillTask } from './components/DrillTask.jsx'
import { GreenTapMap } from './components/GreenTapMap.jsx'
import { ProcessLesson } from './components/ProcessLesson.jsx'
import { ResultsCard } from './components/ResultsCard.jsx'
import { ProgressPath } from './components/ProgressPath.jsx'
import { RoutineDrillTask } from './components/RoutineDrillTask.jsx'
import { getFirstDrill, getNextDrill } from './data/puttingDrills.js'
import { mainResultPattern } from './utils/scoring.js'
import './App.css'

const SCREENS = {
  hub: 'hub',
  processLesson: 'processLesson',
  drill: 'drill',
  map: 'map',
  results: 'results',
  path: 'path',
}

function App() {
  const [screen, setScreen] = useState(SCREENS.hub)
  const [currentDrill, setCurrentDrill] = useState(getFirstDrill())
  const [nextDrill, setNextDrill] = useState(null)
  const [markers, setMarkers] = useState([])
  const [result, setResult] = useState(null)
  const [roundResults, setRoundResults] = useState([])
  const [drillStartedAt, setDrillStartedAt] = useState(null)
  const [hitElapsedMs, setHitElapsedMs] = useState(0)
  const [handedness, setHandedness] = useState(null)

  const markDrillStarted = useCallback(() => {
    setHitElapsedMs(0)
    setDrillStartedAt(Date.now())
  }, [])

  function startPutting() {
    const firstDrill = getFirstDrill()
    setCurrentDrill(firstDrill)
    setNextDrill(null)
    setMarkers([])
    setResult(null)
    setRoundResults([])
    setHitElapsedMs(0)
    setDrillStartedAt(null)
    setScreen(SCREENS.drill)
  }

  function startDrill(drill) {
    setCurrentDrill(drill)
    setNextDrill(null)
    setMarkers([])
    setResult(null)
    setHitElapsedMs(0)
    setDrillStartedAt(null)
    setScreen(drill.requiresProcessLesson ? SCREENS.processLesson : SCREENS.drill)
  }

  function beginCurrentDrill() {
    setMarkers([])
    setResult(null)
    setHitElapsedMs(0)
    setDrillStartedAt(null)
    setScreen(SCREENS.drill)
  }

  function openMap() {
    setHitElapsedMs(drillStartedAt ? Date.now() - drillStartedAt : 0)
    setMarkers([])
    setScreen(SCREENS.map)
  }

  function reviewResults() {
    const previousResult =
      currentDrill.id === 'pattern-fix-slow-routine'
        ? roundResults.find((item) => item.round === 1)
        : null
    const nextResult = mainResultPattern(
      markers,
      currentDrill,
      hitElapsedMs,
      previousResult,
    )
    const selectedNextDrill = getNextDrill(currentDrill, nextResult)

    setResult(nextResult)
    setNextDrill(selectedNextDrill)
    setRoundResults((existingResults) => [
      ...existingResults.filter((item) => item.round !== nextResult.round),
      nextResult,
    ])
    setScreen(SCREENS.results)
  }

  function resetToHub() {
    setMarkers([])
    setResult(null)
    setNextDrill(null)
    setHitElapsedMs(0)
    setDrillStartedAt(null)
    setScreen(SCREENS.hub)
  }

  const shouldAskHandedness =
    result?.round === 1 &&
    !handedness &&
    (result.pattern === 'mostly left' || result.pattern === 'mostly right')

  return (
    <main className={`app-shell app-shell--${screen}`}>
      <div className="practice-frame">
        {screen === SCREENS.hub && <PracticeHub onStartPutting={startPutting} />}

        {screen === SCREENS.processLesson && (
          <ProcessLesson onBack={resetToHub} onStart={beginCurrentDrill} />
        )}

        {screen === SCREENS.drill && currentDrill.activeTask === 'routine' && (
          <RoutineDrillTask
            drill={currentDrill}
            onAppear={markDrillStarted}
            onBack={resetToHub}
            onComplete={openMap}
          />
        )}

        {screen === SCREENS.drill && currentDrill.activeTask !== 'routine' && (
          <DrillTask
            drill={currentDrill}
            onAppear={markDrillStarted}
            onBack={resetToHub}
            onComplete={openMap}
          />
        )}

        {screen === SCREENS.map && (
          <GreenTapMap
            drill={currentDrill}
            markers={markers}
            onBack={() => setScreen(SCREENS.drill)}
            onMarkersChange={setMarkers}
            onReview={reviewResults}
          />
        )}

        {screen === SCREENS.results && result && (
          <ResultsCard
            handedness={handedness}
            onContinue={() => setScreen(SCREENS.path)}
            onReplay={() => startDrill(currentDrill)}
            onSetHandedness={setHandedness}
            result={result}
            shouldAskHandedness={shouldAskHandedness}
          />
        )}

        {screen === SCREENS.path && result && (
          <ProgressPath
            currentDrill={currentDrill}
            nextDrill={nextDrill}
            onHome={resetToHub}
            onNextRound={() => nextDrill && startDrill(nextDrill)}
            result={result}
            roundResults={roundResults}
          />
        )}
      </div>
    </main>
  )
}

export default App
