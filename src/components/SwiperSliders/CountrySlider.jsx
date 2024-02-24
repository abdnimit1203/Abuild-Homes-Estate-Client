import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
const CountrySlider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={2}
        freeMode={true}
        loop={true}
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay, FreeMode, Pagination]}
        className="mySwiper rounded-xl lg:w-[80%]"
      >
        <SwiperSlide className=" text-white rounded-2xl bg-[#28cf52c4]">
          <img
            src="/assets/home/bangladesh.jpg"
            alt="swiper img1 "
            className="rounded-t-2xl"
          />
          <p className="text-center text-xs md:text-base rounded-b-xl   font-thin py-2 ">
            Bangladesh
          </p>
        </SwiperSlide>
        <SwiperSlide className=" text-white rounded-2xl bg-[#2892cfc4]">
          <img
            src="/assets/home/paris.jpg"
            alt="swiper img1 "
            className="rounded-t-2xl"
          />
          <p className="text-center text-xs md:text-base rounded-b-xl   font-thin py-2 ">
            Paris
          </p>
        </SwiperSlide>
        <SwiperSlide className=" text-white rounded-2xl bg-[#cf2836c4]">
          <img
            src="/assets/home/london.jpg"
            alt="swiper img2 "
            className="rounded-t-2xl"
          />
          <p className="text-center text-xs md:text-base rounded-b-xl   font-thin py-2 ">
            London
          </p>
        </SwiperSlide>
        <SwiperSlide className=" text-white rounded-2xl bg-[#28c4cfc4]">
          <img
            src="/assets/home/america.jpg"
            alt="swiper img3 "
            className="rounded-t-2xl"
          />
          <p className="text-center text-xs md:text-base rounded-b-xl   font-thin py-2 ">
            USA
          </p>
        </SwiperSlide>
        <SwiperSlide className=" text-white rounded-2xl bg-[#f32f5ac4]">
          <img
            src="/assets/home/spain.jpg"
            alt="swiper img4 "
            className="rounded-t-2xl"
          />
          <p className="text-center text-xs md:text-base rounded-b-xl   font-thin py-2 ">
            Spain
          </p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CountrySlider;
