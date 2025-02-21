import React, { useEffect, useRef, useState } from 'react';

const Circle: React.FC = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const [points, setPoints] = useState<React.ReactNode[]>([]);

  const numPoints = 6; 
  const pointSize = 10; 

  useEffect(() => {
    const circle = circleRef.current;

    if (circle) {
      const updatePoints = () => {
        const circleWidth = circle.offsetWidth;
        const radius = circleWidth / 2;
        setPoints(createPoints(radius));
      };

      updatePoints();
      window.addEventListener('resize', updatePoints);

      return () => window.removeEventListener('resize', updatePoints);
    }
  }, []);

  const test = (ev: number)=>{
    console.log(ev)
  }

  const createPoints = (radius: number): React.ReactNode[] => {
    const pointsArray = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 360) / numPoints; 
      const x = radius * Math.cos((angle * Math.PI) / 180); 
      const y = radius * Math.sin((angle * Math.PI) / 180); 

      const point = (
        <div
          key={i}
          className="point"
          style={{
            width: `${pointSize}px`,
            height: `${pointSize}px`,
            left: `calc(50% + ${x}px - ${pointSize / 2}px)`,
            top: `calc(50% + ${y}px - ${pointSize / 2}px)`,
          }}
          onClick={()=>{test(i)}}
        />
      );
      pointsArray.push(point);
    }
    return pointsArray;
  };

  return (
    <div className="circle-container">
      <div className="circle" ref={circleRef} style={{ position: 'relative', width: '15vw', height: '15vw' }}>
        {points}
      </div>
    </div>
  );
};

export default Circle;
