import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface CircleProps{
  activePoint: [number, React.Dispatch<React.SetStateAction<number>>]
}

const Circle: React.FC<CircleProps> = ({ activePoint }) => {
  const [points, setPoints] = useState<React.ReactNode[]>([]); // Состояние для точек
  const [numPoints, setSumPoints] = useState<number>(6); // Номер активной точки
  const circleRef = useRef<HTMLDivElement | null>(null);
  
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
  }, [activePoint[0]]);

  useGSAP(()=>{
    gsap.to(circleRef.current, {
      rotation: 360,
      duration: 0,
      ease: 'power1.out',
    });
  })

  const test = (index: number) => {
    activePoint[1](index);    
    const rotate = Math.abs((index - numPoints) * (360 / numPoints))

    gsap.to(circleRef.current, {
      rotation: rotate,
      duration: 1,
      ease: 'power1.out',
    });

    const element = circleRef.current?.children[index]; // Получаем элемент точки
    const preElement = circleRef.current?.children[activePoint[0]]; // Получаем элемент точки

    console.log(activePoint)

    if (element && preElement) {
      const circle = circleRef.current;
      if (circle) {
        const circleWidth = circle.offsetWidth;
        const radius = circleWidth / 2;
        
        // Расчет новой позиции для left и top
        const angle = ((index - 1) * 360) / numPoints;
        const anglex = ((activePoint[0] - 1) * 360) / numPoints;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const xx = radius * Math.cos((anglex * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        const yy = radius * Math.sin((anglex * Math.PI) / 180);
  
        // Анимация изменения размера и положения
        gsap.to(element, {
          width: 50,
          height: 50,
          left: `calc(50% + ${x}px - 25px)`,
          top: `calc(50% + ${y}px - 25px)`,
          backgroundColor: 'white',
          duration: .5, // Длительность анимации 1 секунда
          ease: 'power1.out', // Плавная анимация
        });

        gsap.to(preElement, {
          width: pointSize,
          height: pointSize,
          left: `calc(50% + ${xx}px - ${pointSize / 2}px)`,
          top: `calc(50% + ${yy}px - ${pointSize / 2}px)`,
          backgroundColor: 'black',
          duration: .5, // Длительность анимации 1 секунда
          ease: 'power1.out', // Плавная анимация
        });
      }
    }
  };

/*   useGSAP(()=>{
    gsap.to(circleRef.current, {
      rotation: rotate,
      duration: 1,
      ease: 'power1.out',
    });
  }) */

  const createPoints = (radius: number): React.ReactNode[] => {
    const pointsArray = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = ((i - 1) * 360) / numPoints; // Сдвигаем индексы, чтобы 0 оказался сверху слева
      const x = radius * Math.cos((angle * Math.PI) / 180);
      const y = radius * Math.sin((angle * Math.PI) / 180);      

      const point = (
        <div
          key={i}
          className={`point`}
          style={{
            position: 'absolute',
            width: `${pointSize}px`,
            height: `${pointSize}px`,
            left: `calc(50% + ${x}px - ${pointSize / 2}px)`,
            top: `calc(50% + ${y}px - ${pointSize / 2}px)`,
            cursor: 'pointer',
          }}
          onClick={() => test(i)}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(0deg)',
            }}
          >
            {i + 1}
          </div>
        </div>
      );
      pointsArray.push(point);
    }
    return pointsArray;
  };

  return (
    <div className="circle-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div
        className="circle"
        ref={circleRef}
        style={{
          position: 'relative',
          width: '15vw',
          height: '15vw',
          borderRadius: '50%',
          transition: 'none', // Отключаем CSS-свойство трансформации, так как мы будем использовать GSAP
        }}
      >
        {points} {/* Отображаем точки на основе текущего состояния */}
      </div>
    </div>
  );
};

export default Circle