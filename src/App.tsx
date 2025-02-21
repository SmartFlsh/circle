import { useEffect, useState } from 'react';
import Circle from './Module/Circle'
import SwiperComponent from './Module/SwiperModule'
import DATA from '../info.json'


function App() {
  const [activePoint, setActivePoint] = useState<number>(0)

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
    console.log(DATA)
  }, [])

  return (
    <main>
      <div className='mainContainer'>
        <section className='section historikData'>
          <h1>Исторические даты</h1>
        </section>

        <section className='data'>
          <div>2017</div>
          <div>2020</div>
          <Circle activePoint={[activePoint, setActivePoint]} data={DATA}/>
        </section>

        <section className="section scroll">
          <div>
            <div>{activePoint + 1}/6</div>
            <div>
              <button onClick={()=>{changeActivePoint(-1)}}>left</button>
              <button onClick={()=>{changeActivePoint(1)}}>rigth</button>
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
