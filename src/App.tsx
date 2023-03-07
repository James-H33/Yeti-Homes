import { Canvas } from '@react-three/fiber'
import './App.css'
import Experience from './components/Experience'

function App() {
  return (
    <>
      <Canvas dpr={1}>
        <Experience />
      </Canvas>
    </>
  )
}

export default App
