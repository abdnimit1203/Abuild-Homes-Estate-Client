import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

// import Rating from "react-rating";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useState } from "react";
// import "swiper/css/scrollbar";

const ReviewsSlider = () => {
  const axiosPublic = useAxiosPublic();
  const [rating, setRating] = useState(5); // Initial value

  const { data: reviews = [] } = useQuery({
    queryKey: ["review-key"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/reviews");
      return res.data;
    },
  });
  // console.log(reviews);
  return (
    <div className="text-neutral">
      <div className="text-center pb-16 space-y-6">
        <h2 className="text-2xl font-semibold">
          Dont just take our word for it...
        </h2>
        <p className="text-xl">Check the latest reviews from customers</p>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 22500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, FreeMode, Pagination]}
        className="mySwiper rounded-xl h-full"
      >
        {reviews?.slice(0, 4).map((review, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex min-h-[500px] flex-col justify-center items-center text-center bg-gradient-to-tr from-secondary to-accent p-6 shadow-sm sm:p-8 lg:p-12 md:max-w-[80%] mx-auto rounded-2xl ">
              <div>
                <div className="mt-4 ">
                  <img
                    src={review?.userPhoto}
                    alt="reviewer image"
                    className="rounded-full w-28 mx-auto aspect-square object-cover"
                  />
                  <p className="text-2xl font-bold  sm:text-3xl pt-2">
                    {review?.username}
                  </p>

                  <p className="mt-4 leading-relaxed text-gray-700 max-w-2xl">
                    {review?.reviewDescription}
                  </p>
                </div>
              </div>
              <div className="pt-6">
                {/* <Rating
                  emptySymbol={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  }
                  fullSymbol={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      color="white"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  initialRating={4.5}
                  readonly
                /> */}
                <Rating style={{ maxWidth: 150 }} value={4.5} readOnly />
              </div>
              <footer className="mt-4 font-medium  text-xl sm:mt-6 bg-white p-3 rounded-xl text-slate-700">
                <BsFillBuildingsFill className="inline text-primary text-2xl" />{" "}
                Property: {review?.propertyTitle}
              </footer>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsSlider;
