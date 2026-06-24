import { useRef, useState } from 'react'
import { ArrowLeft, Check, RotateCcw } from 'lucide-react'
import {
  DEFAULT_HOLE,
  GREEN_SPACE,
  distanceFromHole,
  formatFeet,
  targetRadiusForFeet,
} from '../utils/scoring.js'

const EDGE_PAD = 5
const HOLE_OFFSETS = [
  [0, 0],
  [-2.2, -1.4],
  [2.2, -1.4],
  [-2.2, 1.4],
  [2.2, 1.4],
  [0, -2.8],
  [0, 2.8],
  [-3.6, 0],
  [3.6, 0],
  [0, -4.2],
]

export function GreenTapMap({ drill, markers, onBack, onMarkersChange, onReview }) {
  const greenRef = useRef(null)
  const previewTimer = useRef(null)
  const [draggingIndex, setDraggingIndex] = useState(null)
  const [previewPoint, setPreviewPoint] = useState(null)
  const [holeSheetOpen, setHoleSheetOpen] = useState(false)

  const count = markers.length
  const remaining = Math.max(0, drill.puttCount - count)
  const isReady = count === drill.puttCount
  const holedCount = markers.filter((marker) => marker.holed).length
  const targetRadius = targetRadiusForFeet(drill.targetSizeFeet)
  const loggingGroup = currentLoggingGroup(drill, count)
  const holeOptionLimit = loggingGroup
    ? Math.min(remaining, loggingGroup.count - loggingGroup.completed)
    : remaining

  function pointFromEvent(event) {
    const rect = greenRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * GREEN_SPACE.width
    const y = ((event.clientY - rect.top) / rect.height) * GREEN_SPACE.height

    return {
      x: clamp(x, EDGE_PAD, GREEN_SPACE.width - EDGE_PAD),
      y: clamp(y, EDGE_PAD, GREEN_SPACE.height - EDGE_PAD),
    }
  }

  function showPreview(point, persist = false) {
    window.clearTimeout(previewTimer.current)
    setPreviewPoint(point)

    if (!persist) {
      previewTimer.current = window.setTimeout(() => setPreviewPoint(null), 900)
    }
  }

  function addMarker(event) {
    if (event.target.closest('[data-marker]')) return
    if (event.target.closest('[data-hole-target]')) return
    if (markers.length >= drill.puttCount) return

    const point = pointFromEvent(event)
    onMarkersChange([...markers, point])
    showPreview(point)
  }

  function addHoledPutts(amount) {
    if (amount === 0) {
      setHoleSheetOpen(false)
      return
    }

    const startIndex = markers.length
    const madeMarkers = Array.from({ length: amount }, (_, index) =>
      makeHoledMarker(startIndex + index),
    )

    onMarkersChange([...markers, ...madeMarkers].slice(0, drill.puttCount))
    setPreviewPoint(DEFAULT_HOLE)
    setHoleSheetOpen(false)
  }

  function updateMarker(index, event) {
    const point = pointFromEvent(event)
    onMarkersChange(
      markers.map((marker, markerIndex) =>
        markerIndex === index ? { ...marker, ...point, holed: false } : marker,
      ),
    )
    showPreview(point, true)
  }

  function startDrag(index, event) {
    event.preventDefault()
    event.stopPropagation()
    setDraggingIndex(index)
    event.currentTarget.setPointerCapture(event.pointerId)
    updateMarker(index, event)
  }

  function moveDrag(index, event) {
    if (draggingIndex !== index) return
    updateMarker(index, event)
  }

  function endDrag(event) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setDraggingIndex(null)
    previewTimer.current = window.setTimeout(() => setPreviewPoint(null), 450)
  }

  function resetMarkers() {
    onMarkersChange([])
    setPreviewPoint(null)
    setHoleSheetOpen(false)
  }

  return (
    <section className="screen green-tap-map" aria-labelledby="map-title">
      <header className="task-topbar map-topbar">
        <button
          aria-label="Back to drill"
          className="icon-button icon-button--light"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <div className="map-pucks" aria-label={`${count} of ${drill.puttCount} putts placed`}>
          {Array.from({ length: drill.puttCount }, (_, index) => (
            <span
              className={`map-puck ${index < count ? 'is-filled' : ''}`}
              key={index}
            />
          ))}
        </div>
        <button
          aria-label="Clear finish spots"
          className="icon-button icon-button--light"
          disabled={count === 0}
          onClick={resetMarkers}
          type="button"
        >
          <RotateCcw size={20} strokeWidth={2.4} />
        </button>
      </header>

      <div className="map-heading">
        <h1 id="map-title">{isReady ? 'Review?' : 'Log results'}</h1>
        <p>{holedCount > 0 ? `${holedCount} holed` : `${count}/${drill.puttCount} marked`}</p>
        {!isReady && (
          <div className="map-instructions">
            {loggingGroup && (
              <span className="map-order-pill">
                Logging {loggingGroup.label} - {loggingGroup.completed}/{loggingGroup.count}
              </span>
            )}
            <span>Tap the hole for makes.</span>
            <span>Tap the green for misses.</span>
          </div>
        )}
      </div>

      <div
        aria-label="Top-down putting green"
        className={`green-field green-field--${drill.targetType} ${
          draggingIndex !== null ? 'is-dragging' : ''
        }`}
        onPointerDown={addMarker}
        ref={greenRef}
        role="application"
      >
        <svg
          aria-hidden="true"
          className="green-lines"
          viewBox={`0 0 ${GREEN_SPACE.width} ${GREEN_SPACE.height}`}
        >
          {drill.targetType === 'past-hole' && (
            <path
              className="target-zone target-zone--past"
              d={`M ${DEFAULT_HOLE.x - targetRadius} ${DEFAULT_HOLE.y} A ${targetRadius} ${targetRadius} 0 0 1 ${DEFAULT_HOLE.x + targetRadius} ${DEFAULT_HOLE.y} L ${DEFAULT_HOLE.x} ${DEFAULT_HOLE.y} Z`}
            />
          )}
          <ellipse
            className="target-ring target-ring--outer"
            cx="50"
            cy="42"
            rx={targetRadius + 10}
            ry={targetRadius + 10}
          />
          <ellipse
            className="target-ring target-ring--inner"
            cx="50"
            cy="42"
            rx={targetRadius}
            ry={targetRadius}
          />
          {(drill.targetType === 'gate' || drill.animationVariant === 'gate') && (
            <g className="map-gate">
              <line x1="45" x2="45" y1="104" y2="116" />
              <line x1="55" x2="55" y1="104" y2="116" />
            </g>
          )}
          {Array.isArray(drill.distanceSet) && (
            <g className="map-distance-tags">
              {drill.distanceSet.map((tag, index) => (
                <text key={tag} x={30 + index * 20} y={112 + index * 6}>
                  {tag}
                </text>
              ))}
            </g>
          )}
          {previewPoint && (
            <line
              className="distance-line"
              x1={DEFAULT_HOLE.x}
              x2={previewPoint.x}
              y1={DEFAULT_HOLE.y}
              y2={previewPoint.y}
            />
          )}
        </svg>

        <span className="map-flag" aria-hidden="true" />
        {remaining > 0 && <span className="map-hole-hint">Tap cup</span>}
        <button
          aria-label="Log holed putts"
          className="map-hole-button"
          data-hole-target
          disabled={remaining === 0}
          onPointerDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setHoleSheetOpen(true)
          }}
          type="button"
        >
          <span className="map-hole" aria-hidden="true" />
        </button>

        {markers.map((marker, index) => (
          <button
            aria-label={
              marker.holed
                ? `Putt ${index + 1} holed`
                : `Putt ${index + 1} finish spot`
            }
            className={`finish-marker ${marker.holed ? 'is-holed' : ''} ${
              draggingIndex === index ? 'is-dragging' : ''
            }`}
            data-marker
            key={`${index}-${marker.holed ? 'holed' : 'finish'}`}
            onPointerCancel={endDrag}
            onPointerDown={(event) => startDrag(index, event)}
            onPointerMove={(event) => moveDrag(index, event)}
            onPointerUp={endDrag}
            style={pointStyle(marker)}
            type="button"
          >
            {marker.holed ? 'in' : index + 1}
          </button>
        ))}

        {previewPoint && (
          <span className="distance-badge" style={pointStyle(previewPoint)}>
            {formatFeet(distanceFromHole(previewPoint))}
          </span>
        )}
      </div>

      {holeSheetOpen && (
        <div className="hole-sheet" role="dialog" aria-label="How many went in?">
          <div className="hole-sheet-card">
            <p>{loggingGroup ? `Makes from ${loggingGroup.label}?` : 'How many went in?'}</p>
            <div className="hole-options">
              {Array.from({ length: holeOptionLimit + 1 }, (_, index) => (
                <button key={index} onClick={() => addHoledPutts(index)} type="button">
                  {index}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isReady && (
        <button className="primary-action map-review" onClick={onReview} type="button">
          <Check size={20} strokeWidth={3} />
          Review results
        </button>
      )}
    </section>
  )
}

function currentLoggingGroup(drill, count) {
  if (!drill.loggingGroups?.length) return null

  let start = 0

  for (const group of drill.loggingGroups) {
    const end = start + group.count

    if (count < end) {
      return {
        ...group,
        completed: count - start,
      }
    }

    start = end
  }

  return null
}

function makeHoledMarker(index) {
  const [xOffset, yOffset] = HOLE_OFFSETS[index % HOLE_OFFSETS.length]

  return {
    x: DEFAULT_HOLE.x + xOffset,
    y: DEFAULT_HOLE.y + yOffset,
    holed: true,
  }
}

function pointStyle(point) {
  return {
    left: `${point.x}%`,
    top: `${(point.y / GREEN_SPACE.height) * 100}%`,
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

