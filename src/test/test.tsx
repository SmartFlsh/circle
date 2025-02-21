import React, { useEffect, useRef } from 'react'

const Test: React.FC = () => {
  const circleRef = useRef<HTMLDivElement | null>(null)

  const numPoints = 2
  const minRadius = 140
  const maxRadius = 140

  useEffect(() => {
    const circle = circleRef.current
    if (circle) {
      const radius = Math.random() * (maxRadius - minRadius) + minRadius
      createPoints(circle, radius)
    }
  }, [])

  const createPoints = (circle: HTMLDivElement, radius: number) => {
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 360) / numPoints
      const x = radius * Math.cos((angle * Math.PI) / 180)
      const y = radius * Math.sin((angle * Math.PI) / 180)

      const point = document.createElement('div')
      point.classList.add('point')
      point.style.left = `calc(50% + ${x}px)`
      point.style.top = `calc(50% + ${y}px)`

      circle.appendChild(point)
    }
  }

  return (
    <div className="circle-container">
      <div className="circle" ref={circleRef}></div>
    </div>
  )
}

export default Test
