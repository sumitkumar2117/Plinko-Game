/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Game } from './Pages/Game'
import { Simulation } from './Pages/Simulation'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  axios.defaults.baseURL = 'https://stake-game-backend.vercel.app/';
  return (
    <>
     {/* <Simulation/> */}
     <Game/>
    </>
  )
}

export default App
