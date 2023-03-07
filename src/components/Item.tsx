import { Image, useIntersect } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { memo, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

function Item({ url, scale, ...props }: any) {
  const isMobile = window.innerWidth < 600
  const visible = useRef(false)
  const [hovered, hover] = useState(false)
  const [hasBeenAcitvated, setHasBeenAcitvated] = useState(false)
  const ref: any = useIntersect((isVisible) => (visible.current = isVisible))
  const { height } = useThree((state) => state.viewport)

  useFrame((state, delta) => {
    let isVisible = visible.current || hasBeenAcitvated;
    let yHeight = isVisible ? 0 : -height / 2 + 1;
    let zoom = isVisible ? 1 : 1.5;
    let grayscale = hovered || isMobile ? 0 : 1;

    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, yHeight, 4, delta)
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, zoom, 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, grayscale, 4, delta)

    if (isVisible && !hasBeenAcitvated) {
      setHasBeenAcitvated(true)
    }
  })

  return (
    <group {...props}>
      <Image
        ref={ref}
        onPointerOver={() => hover(true)}
        scale={scale}
        url={url}
      />
    </group>
  )
}

function Items() {
  const isMobile = window.innerWidth < 600;
  let { width: w, height: h, aspect } = useThree((state) => state.viewport)

  w = Math.min(w, 10)

  let halfSize = w / 2
  let thridSize = w / 3
  let fourthSize = w / 4
  let fifthSize = w / 5

  if (isMobile) {
    halfSize = w / 1.2
    thridSize = w / 2.5
    fourthSize = w / 3.5
    fifthSize = w / 4.5
  }

  let setup = [
    {
      path: "1.jpg",
      scale: [thridSize, thridSize, 1],
      position: [-w / 6, 0, 0]
    },
    {
      path: "1-1.jpg",
      scale: [thridSize, thridSize, 1],
      position: [w / 7, (h / 4), 0]
    },
    {
      path: "1-2.jpg",
      scale: [halfSize, thridSize, 1],
      position: [w / 7, -(h / 4), 0]
    },

    {

      path: "2.jpg",
      scale: [2, thridSize, 1],
      position: [w / 30, -h * 0.85, 0]
    },
    {
      path: "4-1.jpg",
      scale: [thridSize, fifthSize, 1],
      position: [-w / 4, -h * 1, 0]
    },
    {

      path: "4.jpg",
      scale: [fifthSize, halfSize, 1],
      position: [w / 4, -h * 1.2, 0]
    },

    {
      path: "5.jpg",
      scale: [fifthSize, fifthSize, 1],
      position: [w / 10, -h * 1.85, 0]
    },
    {
      path: "6.jpg",
      scale: [thridSize, thridSize, 1],
      position: [-w / 4, -h * 2, 0]
    },

    {
      path: "12.jpg",
      scale: [halfSize, halfSize, 1],
      position: [-w / 4, -h * 2.8, 0]
    },
    {
      path: "8.jpg",
      scale: [halfSize, halfSize, 1],
      position: [w / 4, -h * 3.2, 0]
    }
  ]

  if (isMobile) {
   setup = [
      {
        path: "1.jpg",
        scale: [halfSize, halfSize, 1],
        position: [-w / 6, h * 0.1, 0]
      },
      {
        path: "1-1.jpg",
        scale: [halfSize, halfSize, 1],
        position: [w / 7, h * 0.3, 0]
      },
      {
        path: "1-2.jpg",
        scale: [halfSize, thridSize, 1],
        position: [w / 2.5, -(fourthSize), 0]
      },

      {
        path:"4.jpg",
        scale: [halfSize, halfSize, 1],
        position: [-(w / 2) + (w / 2), -h * 0.9, 0]
      },

      {
        path: "6.jpg",
        scale: [w, w, 1],
        position: [0, -h * 1.8, 0]
      },

      {
        path: "7.jpg",
        scale: [halfSize, halfSize, 1],
        position: [w / 2.25, -h * 2.6, 0]
      },

      {
        path: "12.jpg",
        scale: [halfSize, halfSize, 1],
        position: [-w / 2.25, -h * 2.6, 0]
      },
      {
        path: "8.jpg",
        scale: [halfSize * 2, halfSize, 1],
        position: [0, -h * 3.1, 0]
      }
    ]
  }

  const myItems = useMemo(() => {
    return setup.map((item, i) => {
      return (
        <Item
          key={i}
          url={item.path}
          scale={item.scale}
          position={item.position}
        />
      )
    })
  }, []);

  return (
    <>
      {myItems}
    </>
  )
}


export default memo(Items)
