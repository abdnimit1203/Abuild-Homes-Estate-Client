import { HiCheckCircle } from "react-icons/hi";

const OurFeatures = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-[30%]">
        <img
          src="https://i.ibb.co/1z26NVY/sa.jpg"
          alt="home"
          className=" h-full object-cover hover:scale-90 transition duration-150 rounded-xl"
        />
      </div>
      <div className="flex-[50%] flex flex-col  justify-center p-10 gap-5 items-start">
        <p className="text-3xl text-primary font-semibold ">
          What’s Our Features
        </p>
        <p>
          Discover a curated selection of properties designed to meet diverse
          preferences and needs. From picturesque locations to modern amenities,
          each listing showcases unique features that contribute to an enriched
          living experience. Our commitment extends beyond mere transactions; we
          prioritize transparency, providing detailed
        </p>
        <div className="flex items-center justify-center gap-6">
          <HiCheckCircle className="transition hover:scale-125 duration-200 text-6xl text-primary " />
          <div className="flex-1  transition hover:scale-105 duration-200">
            <h4 className="text-xl font-bold text-primary p-2">
              Explore Property
            </h4>
            <p>
              Explore our diverse range of properties. From cozy homes to modern
              apartments, find your perfect fit with detailed descriptions and
              virtual tours. Start your property journey with confidence and
              ease.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <HiCheckCircle className=" transition hover:scale-125 duration-200 text-6xl text-primary " />
          <div className="flex-1 transition hover:scale-105 duration-200">
            <h4 className="text-xl font-bold text-primary p-2">Find Agency</h4>
            <p>
              Locate your ideal agency effortlessly. Explore our platform to
              discover a variety of agencies offering specialized services
              tailored to your needs. Find the right partner for your goals with
              ease and confidence.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 ">
          <HiCheckCircle className=" transition hover:scale-125 duration-200 text-6xl text-primary " />
          <div className="flex-1  transition hover:scale-105 duration-200">
            <h4 className="text-xl font-bold text-primary p-2">
              Property Guide
            </h4>
            <p>
              Navigate the world of real estate with our comprehensive Property
              Guide. Whether you are buying, selling, or investing, access
              valuable insights, tips, and expert advice to make informed
              decisions on your property journey. Unlock the key to successful
              real estate transactions with our guide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
