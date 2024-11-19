import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HeroLayout } from './components/HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <HeroLayout/>
  )
}

export default App
