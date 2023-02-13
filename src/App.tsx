import { Image, Scroll, ScrollControls, useIntersect } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import './App.css'



function Item({ url, scale, ...props }: any) {
  const visible = useRef(false)
  const [hovered, hover] = useState(false)
  const ref: any = useIntersect((isVisible) => (visible.current = isVisible))
  const { height } = useThree((state) => state.viewport)
  
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, visible.current ? 0 : -height / 2 + 1, 4, delta)
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 1.5, 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 0 : 1, 4, delta)
  })

  return (
    <group {...props}>
      <Image
        ref={ref} 
        onPointerOver={() => hover(true)} 
        onPointerOut={() => hover(false)} 
        scale={scale}
        url={url} 
      />
    </group>
  )
}

function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport)

  const halfSize = w / 2
  const thridSize = w / 3
  const fourthSize = w / 4
  const fifthSize = w / 5
  
  return (
    <Scroll>
      <Item url="/1.jpg" scale={[thridSize, thridSize, 1]} position={[-w / 6, 0, 0]} />
      <Item url="/1-1.jpg" scale={[thridSize, thridSize, 1]} position={[w / 7, (fourthSize), 0]} />
      <Item url="/1-2.jpg" scale={[halfSize, thridSize, 1]} position={[w / 7, -(fourthSize), 0]} />

      <Item url="/2.jpg" scale={[2, thridSize, 1]} position={[w / 30, -h, 0]} />
      <Item url="/4-1.jpg" scale={[thridSize, fifthSize, 1]} position={[-w / 4, -h * 1, 0]} />
      <Item url="/4.jpg" scale={[fifthSize, halfSize, 1]} position={[w / 4, -h * 1.2, 0]} />
      
      <Item url="/5.jpg" scale={[fifthSize, fifthSize, 1]} position={[w / 10, -h * 1.75, 0]} />
      <Item url="/6.jpg" scale={[thridSize, thridSize, 1]} position={[-w / 4, -h * 2, 0]} />
      
      <Item url="/12.jpg" scale={[halfSize, thridSize, 1]} position={[-w / 4, -h * 2.6, 0]} />
      <Item url="/8.jpg" scale={[halfSize, halfSize, 1]} position={[w / 4, -h * 3.1, 0]} />
    </Scroll>
  )
}

function App() {

  return (
    <>
      <Canvas>
        <ScrollControls damping={0.2} pages={4}>
          <Items />
          <Scroll html style={{ width: '100%' }}>
            <h1 
              style={{ position: 'absolute', top: `20vh`, left: '10vw', fontSize: '15rem' }}>
                Yeti
            </h1>

            <h1 
              style={{ position: 'absolute', top: `75vh`, left: '10vw', fontSize: '15rem' }}>
              Homes
            </h1>

            <h1 style={{ position: 'absolute', top: '180vh', left: '10vw' }}>off grid.</h1>

            <h1 style={{ position: 'absolute', top: '250vh', right: '15vw' }}>Modern</h1>
            <h1 style={{ position: 'absolute', top: '260vh', right: '10vw' }}>Living.</h1>
            
            <div
              style={{ position: 'absolute', top: '340vh', left: '10vw' }}
              className="end-section"
              >
              <h1>
                <span>
                  Find
                </span>
              </h1>

              <h1>
                <span>
                  Your
                </span>
              </h1>

              <h1>
                <span>
                  Home
                </span>
              </h1>
            </div>

          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default App
