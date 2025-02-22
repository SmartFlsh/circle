import { FC, useEffect, useState } from "react";
import Circle from "./Module/Circle";
import SwiperComponent from "./Module/SwiperModule";
import { gsap } from "gsap";

interface DateEntries {
  [year: string]: string | undefined;
}

interface ScienceEntry {
  name: string;
  date: DateEntries;
}

type ScienceData = ScienceEntry[];

interface AppProps {
  numberPoint: number;
  DATA: ScienceData;
}

const App: FC<AppProps> = ({ numberPoint, DATA }) => {
  const [activePoint, setActivePoint] = useState<number>(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [numPoints, setSumPoints] = useState<number>(
    numberPoint >= 2 && numberPoint <= 6? numberPoint : 6
  );
  const [isMobile, setIsMobile] = useState(false);

  const changeActivePoint = (value: number) => {
    if (value + activePoint >= numPoints) {
      setActivePoint(0);
    } else if (value + activePoint < 0) {
      setActivePoint(numPoints - 1);
    } else {
      setActivePoint((ev) => ev + value);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Проверяем, если ширина <= 768px, это мобильное устройство
    };
    handleResize(); // Выполняем проверку сразу при монтировании компонента
    window.addEventListener("resize", handleResize); // Следим за изменениями размера окна

    return () => {
      window.removeEventListener("resize", handleResize); // Убираем слушатель при размонтировании
    };
  }, []);

  useEffect(() => {
    const dataArray = Object.keys(DATA[activePoint].date).map((key) =>
      Number(key)
    );
    gsap.to(
      { value: minValue },
      {
        value: Math.min(...dataArray),
        duration: 1.5,
        ease: "power1.out",
        onUpdate: function () {
          setMinValue(Math.round(this.targets()[0].value));
        },
      }
    );
    gsap.to(
      { value: maxValue },
      {
        value: Math.max(...dataArray),
        duration: 1.5,
        ease: "power1.out",
        onUpdate: function () {
          setMaxValue(Math.round(this.targets()[0].value));
        },
      }
    );
  }, [activePoint]);

  return (
    <>
      {isMobile ? (
        <main>
          <div className="mainContainer">
            <section className="section historikData">
              <h1>Исторические даты</h1>
            </section>

            <section className="data">
              <div>{minValue}</div>
              <div>{maxValue}</div>
            </section>

            <section className="section scroll">
              <div>
                <SwiperComponent data={DATA} activePoint={activePoint} />
              </div>
            </section>

            <section className="navigation">
              <div className="scoreContainer">
                <div className="score">
                  0{activePoint + 1}/0{numPoints}
                </div>
                <div className="mainArrowContainer">
                  <div
                    className="arrowContainer"
                    onClick={() => {
                      changeActivePoint(-1);
                    }}
                  >
                    <img
                      style={{ transform: "rotate(90deg)" }}
                      className="arrow"
                      src="/arrow.png"
                      alt=""
                    />
                  </div>
                  <div
                    className="arrowContainer"
                    onClick={() => {
                      changeActivePoint(1);
                    }}
                  >
                    <img
                      style={{ transform: "rotate(-90deg)" }}
                      className="arrow"
                      src="/arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="navigationCircleContainer">
                {Array(numPoints).fill('').map((ev, index)=>(
                  <div className="navigationCircle" style={{backgroundColor: `${index === activePoint ? 'black' : '#808080b4'}`}} onClick={()=>{setActivePoint(index)}}></div>
                ))}
              </div>
            </section>
          </div>
        </main>
      ) : (
        <main>
          <div className="mainContainer">
            <section className="section historikData">
              <h1>Исторические даты</h1>
            </section>

            <section className="data">
              <div>{minValue}</div>
              <div>{maxValue}</div>
              <Circle
                activePoint={[activePoint, setActivePoint]}
                data={DATA}
                numPoints={numPoints}
              />
            </section>

            <section className="section scroll">
              <div>
                <div className="score">
                  0{activePoint + 1}/0{numPoints}
                </div>
                <div className="mainArrowContainer">
                  <div
                    className="arrowContainer"
                    onClick={() => {
                      changeActivePoint(-1);
                    }}
                  >
                    <img
                      style={{ transform: "rotate(90deg)" }}
                      className="arrow"
                      src="/arrow.png"
                      alt=""
                    />
                  </div>
                  <div
                    className="arrowContainer"
                    onClick={() => {
                      changeActivePoint(1);
                    }}
                  >
                    <img
                      style={{ transform: "rotate(-90deg)" }}
                      className="arrow"
                      src="/arrow.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div>
                <SwiperComponent data={DATA} activePoint={activePoint} />
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default App;
