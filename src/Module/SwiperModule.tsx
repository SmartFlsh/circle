import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
interface DateEntries {
  [year: string]: string | undefined;
}

interface ScienceEntry {
  name: string;
  date: DateEntries;
}

type ScienceData = ScienceEntry[];

interface SwiperProps{
  data: ScienceData
  activePoint: number;
}

const SwiperModule: React.FC<SwiperProps> = ({data, activePoint}) => {
  const [delay, setDelay] = useState(activePoint)
  const SwiperRef = useRef(null)
  useGSAP(()=>{
    gsap.timeline().to(SwiperRef.current,{
      opacity: 0,
      duration: .5,
      onComplete: ()=>{
        setDelay(activePoint)
      }
    })
    .to(SwiperRef.current,{
      opacity: 1,
      duration: .5
    })
  }, [activePoint])

  return (
    <Swiper
    ref={SwiperRef}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
    >
      {Object.keys(data[delay].date).map((elem, index)=>(
        <SwiperSlide key={index}>
          <div className='swiper'>
            <h3>{elem}</h3>
            <p>{data[delay].date[elem]}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperModule;
