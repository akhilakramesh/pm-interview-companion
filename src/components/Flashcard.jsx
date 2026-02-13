import { useState } from 'react'
import './Flashcard.css'

const FRAMEWORKS = [
  {
    name: 'CIRCLES Method',
    details: [
      'Comprehend the situation',
      'Identify the customer',
      'Report customer needs',
      'Cut through prioritization',
      'List solutions',
      'Evaluate tradeoffs',
      'Summarize recommendation',
    ],
  },
  {
    name: 'STAR Method',
    details: [
      'Situation: Set context',
      'Task: Your responsibility',
      'Action: What YOU did',
      'Result: Quantified outcome',
    ],
  },
  {
    name: 'GAME-PM',
    details: [
      'Goals: What to achieve',
      'Actions: What initiatives',
      'Metrics: How to measure',
      'Evaluation: Is it working',
      'Prioritization: What\'s first',
      'Mitigation: What are risks',
    ],
  },
]

function Flashcard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const framework = FRAMEWORKS[currentIndex]

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev === 0 ? FRAMEWORKS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev === FRAMEWORKS.length - 1 ? 0 : prev + 1))
  }

  const handleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  return (
    <div className="flashcard-wrapper">
      <p className="flashcard-counter">
        Framework {currentIndex + 1} of {FRAMEWORKS.length}
      </p>

      <div
        className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleFlip()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? 'Click to show framework name' : 'Click to show framework details'}
      >
        <div className="flashcard-inner">
          <div className="flashcard-face flashcard-front">
            <h2 className="flashcard-title">{framework.name}</h2>
            <p className="flashcard-hint">Click to flip</p>
          </div>
          <div className="flashcard-face flashcard-back">
            <h2 className="flashcard-title">{framework.name}</h2>
            <ul className="flashcard-details">
              {framework.details.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flashcard-nav">
        <button type="button" onClick={handlePrev} className="flashcard-btn flashcard-btn-prev" aria-label="Previous framework">
          Previous
        </button>
        <button type="button" onClick={handleNext} className="flashcard-btn flashcard-btn-next" aria-label="Next framework">
          Next
        </button>
      </div>
    </div>
  )
}

export default Flashcard
