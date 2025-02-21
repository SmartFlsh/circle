import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';


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
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
    >
      {Object.keys(data[activePoint].date).map((elem, index)=>(
        <SwiperSlide key={index}>
          <div style={{ padding: '20px', backgroundColor: '#f0f4ff', borderRadius: '8px' }}>
            <h3>{elem}</h3>
            <p>{data[activePoint].date[elem]}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperModule;
