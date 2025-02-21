import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PointProps {
  index: number;
  pointSize: number;
  x: number;
  y: number;
  activePoint: [number, React.Dispatch<React.SetStateAction<number>>];
  active: boolean;
  numPoints: number
}

const Point: React.FC<PointProps> = ({
  index,
  pointSize,
  x,
  y,
  activePoint,
  active,
  numPoints,
}) => {
  const pointRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pointRef.current) return;

    gsap.to(pointRef.current, {
      width: active ? 50 : 10,
      height: active ? 50 : 10,
      left: `calc(50% + ${x}px - ${active ? 25 : 5}px)`,
      top: `calc(50% + ${y}px - ${active ? 25 : 5}px)`,
      backgroundColor: active ? "white" : "black",
      duration: 0.5,
      ease: "power1.out",
    });

    const rotate = activePoint[0] * (360 / numPoints);

    if (active) {
      gsap
        .timeline()
        .to(pointRef.current.children[0], {
          rotate: rotate,
          duration: 0,
          ease: "power1.out",
        })
        .to(pointRef.current.children[0], {
          opacity: active ? 1 : 0,
          duration: 0.3,
          ease: "power1.out",
        });
    } else {
      gsap
        .timeline()
        .to(pointRef.current.children[0], {
          opacity: active ? 1 : 0,
          duration: 0.3,
          ease: "power1.out",
        })
        .to(pointRef.current.children[0], {
          rotate: rotate,
          duration: 0,
          ease: "power1.out",
        });
    }
  }, [active, x]);

  const mouseEnter = () => {
    if (!pointRef.current) return;
    const rotate = activePoint[0] * (360 / numPoints);
    gsap
      .timeline()
      .to(pointRef.current.children[0], {
        rotate: rotate,
        duration: 0,
        ease: "power1.out",
      })
      .to(pointRef.current.children[0], {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      });

    gsap.to(pointRef.current, {
      width: 50,
      height: 50,
      left: `calc(50% + ${x}px - ${25}px)`,
      top: `calc(50% + ${y}px - ${25}px)`,
      backgroundColor: "white",
      duration: 0.5,
      ease: "power1.out",
    });
  };

  const mouseLeave = () => {
    if (!pointRef.current || active) return;
    const rotate = activePoint[0] * (360 / numPoints);
    gsap
      .timeline()
      .to(pointRef.current.children[0], {
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
      })
      .to(pointRef.current.children[0], {
        rotate: rotate,
        duration: 0,
        ease: "power1.out",
      });

    gsap.to(pointRef.current, {
      width: 10,
      height: 10,
      left: `calc(50% + ${x}px - ${5}px)`,
      top: `calc(50% + ${y}px - ${5}px)`,
      backgroundColor: "black",
      duration: 0.5,
      ease: "power1.out",
    });
  };

  return (
    <>
      <div
        ref={pointRef}
        className={`point`}
        style={{
          width: `${pointSize}px`,
          height: `${pointSize}px`,
          left: `calc(50% + ${x}px - ${pointSize / 2}px)`,
          top: `calc(50% + ${y}px - ${pointSize / 2}px)`,
        }}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={() => activePoint[1](index)} 
      >
        <div style={{ color: "black", writingMode: "horizontal-tb" }}>
          {index + 1}
        </div>
      </div>
    </>
  );
};

export default Point;
