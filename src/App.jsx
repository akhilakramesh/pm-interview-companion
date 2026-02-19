import { useState } from 'react'
import Flashcard from './components/Flashcard'
import CompanyResearch from './components/CompanyResearch'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('frameworks')

  return (
    <div className="app">
      <h1 className="app-title">PM Interview Companion</h1>
      
      <nav className="app-nav">
        <button
          type="button"
          className={`nav-button ${activeView === 'frameworks' ? 'active' : ''}`}
          onClick={() => setActiveView('frameworks')}
        >
          Framework Flashcards
        </button>
        <button
          type="button"
          className={`nav-button ${activeView === 'research' ? 'active' : ''}`}
          onClick={() => setActiveView('research')}
        >
          Company Research
        </button>
      </nav>

      <div className="app-content">
        {activeView === 'frameworks' && <Flashcard />}
        {activeView === 'research' && <CompanyResearch />}
      </div>
    </div>
  )
}

export default App
