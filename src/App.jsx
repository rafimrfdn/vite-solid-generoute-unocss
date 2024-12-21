import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
// import QuizApp from './QuizApp.jsx'
import QuizApp from './QuizNoFetch.jsx'
import QuizCat from './QuizCat.jsx'
import './App.css'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + Solid</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
      </div>
      <span><a href="/about" class="read-the-docs">About</a> | <a href="/unocss" class="read-the-docs">Page with UnoCSS</a></span>
            <br/>
      <span><a href="/quiz" class="read-the-docs">Quiz</a> | <a href="/javascript" class="read-the-docs">Javascript Quiz</a> | <a href="/css" class="read-the-docs">CSS Quiz</a></span>
        <QuizApp/>

        <QuizCat category="JavaScript" />
        <QuizCat category="CSS" />
    </>
  )
}

export default App
