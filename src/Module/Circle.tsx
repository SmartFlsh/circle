import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Point from "./Point";

interface DateEntries {
  [year: string]: string | undefined;
}

interface ScienceEntry {
  name: string;
  date: DateEntries;
}

type ScienceData = ScienceEntry[];

interface CircleProps {
  activePoint: [number, React.Dispatch<React.SetStateAction<number>>];
  data: ScienceData;
  numPoints: number;
}

const Circle: React.FC<CircleProps> = ({ activePoint, data, numPoints }) => {
  const [points, setPoints] = useState<React.ReactNode[]>([]); 
  const [nowName, setNowName] = useState<string>('')
  const circleRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

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

    gsap.to(infoRef.current,{
      opacity: 0,
      duration: .4,
      ease: "power1.out",
      onComplete: ()=>{
        setNowName(data[activePoint[0]].name)
      }
    })

    gsap.timeline().to(circleRef.current, {
      rotation: rotate,
      duration: 1,
      ease: "power1.out",
    })
    .to(infoRef.current,{
      opacity: 1,
      duration: .5,
      ease: "power1.out",
    })
  }, [activePoint[0]])

  const createPoints = (radius: number): React.ReactNode[] => {
    const pointsArray = [];
    console.log(radius);

    for (let i = 0; i < numPoints; i++) {
      const angle = ((i - 1) * 360) / numPoints; 
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
          numPoints={numPoints}
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
      </div>
      <div className="info" ref={infoRef}>{nowName}</div>
    </div>
  );
};

export default Circle;
