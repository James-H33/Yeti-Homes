import { Canvas } from '@react-three/fiber'
import './App.css'
import Experience from './components/Experience'

/**
 * https://codesandbox.io/s/l900i
 * https://codesandbox.io/s/l4klb
*/

function App() {
  return (
    <>
      <Canvas>
       <Experience />
      </Canvas>
    </>
  )
}

export default App
