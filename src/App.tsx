import { useEffect, useState } from 'react';
import Circle from './Module/Circle'
import SwiperComponent from './Module/SwiperModule'
import DATA from '../info.json'
import { gsap } from "gsap";


function App() {
  const [activePoint, setActivePoint] = useState<number>(0)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [numPoints, setSumPoints] = useState<number>(6); 

  const changeActivePoint = (value: number)=>{
    if(value + activePoint >= 6){
      setActivePoint(0)
    }else if(value + activePoint < 0){
      setActivePoint(5)
    }else{
      setActivePoint(ev=>ev + value)
    }
  }

  useEffect(()=>{
    const dataArray = Object.keys(DATA[activePoint].date).map(key => Number(key))
    gsap.to({value: minValue}, {
      value: Math.min(...dataArray),
      duration: 1.5,
      ease: "power1.out",
      onUpdate: function(){
        setMinValue(Math.round(this.targets()[0].value))
      }
    })
    gsap.to({value: maxValue}, {
      value: Math.max(...dataArray),
      duration: 1.5,
      ease: "power1.out",
      onUpdate: function(){
        setMaxValue(Math.round(this.targets()[0].value))
      }
    })
  }, [activePoint])

  return (
    <main>
      <div className='mainContainer'>
        <section className='section historikData'>
          <h1>Исторические даты</h1>
        </section>

        <section className='data'>
          <div>{minValue}</div>
          <div>{maxValue}</div>
          <Circle activePoint={[activePoint, setActivePoint]} data={DATA} numPoints={numPoints}/>
        </section>

        <section className="section scroll">
          <div>
            <div className='score'>0{activePoint + 1}/06</div>
            <div className='mainArrowContainer'>
              <div className='arrowContainer'>
                <img style={{transform: 'rotate(90deg)'}} onClick={()=>{changeActivePoint(-1)}} className='arrow' src="/arrow.png" alt="" />
              </div>
              <div className='arrowContainer'>
                <img style={{transform: 'rotate(-90deg)'}} onClick={()=>{changeActivePoint(1)}} className='arrow' src="/arrow.png" alt="" />
              </div>
            </div>
          </div>

          <div>
            <SwiperComponent data={DATA} activePoint={activePoint}/>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
