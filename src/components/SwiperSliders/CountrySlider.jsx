import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
const CountrySlider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        loop={true}
        autoplay={true}
    
        pagination={{
          clickable: true,
        }}
    
        
        modules={[FreeMode, Pagination]}
        className="mySwiper rounded-xl"
      >
        <SwiperSlide className=" text-white rounded-2xl bg-[#28cf52c4]">
          <img src="/assets/home/bangladesh.jpg" alt="swiper img1 " className="rounded-t-2xl" />
          <p className="text-center rounded-b-xl   font-thin py-2 ">Bangladesh</p>
        </SwiperSlide>
        <SwiperSlide className=" text-white rounded-2xl bg-[#2892cfc4]">
          <img src="/assets/home/paris.jpg" alt="swiper img1 " className="rounded-t-2xl" />
          <p className="text-center rounded-b-xl   font-thin py-2 ">Paris</p>
        </SwiperSlide>
        <SwiperSlide className=" text-white rounded-2xl bg-[#cf2836c4]">
          <img src="/assets/home/london.jpg" alt="swiper img2 " className="rounded-t-2xl" />
          <p className="text-center rounded-b-xl   font-thin py-2 ">London</p>
        </SwiperSlide>
        <SwiperSlide className=" text-white rounded-2xl bg-[#28c4cfc4]">
          <img src="/assets/home/america.jpg" alt="swiper img3 " className="rounded-t-2xl" />
          <p className="text-center rounded-b-xl   font-thin py-2 ">USA</p>
        </SwiperSlide>
        <SwiperSlide className=" text-white rounded-2xl bg-[#f32f5ac4]">
          <img src="/assets/home/spain.jpg" alt="swiper img4 " className="rounded-t-2xl" />
          <p className="text-center rounded-b-xl   font-thin py-2 ">Spain</p>
        </SwiperSlide>
       
      </Swiper>
    </div>
  );
};

export default CountrySlider;
