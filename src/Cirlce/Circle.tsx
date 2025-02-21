import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Point from "./Point";

interface CircleProps {
  activePoint: [number, React.Dispatch<React.SetStateAction<number>>];
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
        createPoints(radius);
      };

      updatePoints();
      window.addEventListener("resize", updatePoints);

      return () => window.removeEventListener("resize", updatePoints);
    }
  }, [activePoint[0]]);

  useGSAP(() => {
    gsap.to(circleRef.current, {
      rotation: 360,
      duration: 0,
      ease: "power1.out",
    });
  });

  useEffect(()=>{
    const rotate = Math.abs((activePoint[0] - numPoints) * (360 / numPoints));

    gsap.to(circleRef.current, {
      rotation: rotate,
      duration: 1,
      ease: "power1.out",
    });
  }, [activePoint[0]])

  const createPoints = (radius: number): React.ReactNode[] => {
    const pointsArray = [];
    console.log(radius);

    for (let i = 0; i < numPoints; i++) {
      const angle = ((i - 1) * 360) / numPoints; // Сдвигаем индексы, чтобы 0 оказался сверху слева
      const x = radius * Math.cos((angle * Math.PI) / 180);
      const y = radius * Math.sin((angle * Math.PI) / 180);

      pointsArray.push(
        <Point
          key={i}
          index={i}
          pointSize={pointSize}
          x={x}
          y={y}
          activePoint={activePoint}
          active={activePoint[0] === i}
        />
      );
    }
    setPoints(pointsArray);
    return pointsArray;
  };

  return (
    <div
      className="circle-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="circle"
        ref={circleRef}
        style={{
          position: "relative",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
        }}
      >
        {points}
        <div className="info">test</div>
      </div>
    </div>
  );
};

export default Circle;
