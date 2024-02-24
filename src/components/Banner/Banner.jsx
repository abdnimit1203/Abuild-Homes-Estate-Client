import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import TypeWriterEffect from "react-typewriter-effect";

const Banner = () => {
  return (
    <motion.div 
      className="hero rounded-2xl justify-start min-h-[600px]"
      style={{ backgroundImage: "url(/assets/home/banner.png)" }}
    >
      <div className="hero-content text-left text-neutral">
        <div className="md:py-10 pl-6">
          <div className="max-w-md ">
            <h2 className=" mb-5 text-4xl leading-normal text-gray-600 font-bold">
              <TypeWriterEffect
                startDelay={1000}
                cursorColor="#3F3D56"
                multiText={[
                  "Discover Your Dream Home with ",
                  "Your Partner in Building a Lifetime of Memories.",
                  "Stay Informed. Stay Inspired. Stay Home.",
                  "Easy way to find a perfect property",
                ]}
                multiTextDelay={1000}
                typeSpeed={30}
              />
            </h2>
            <h2 className=" mb-5 text-4xl leading-normal  font-bold">
              <hr className="border-0 pt-3" />
              <span className="text-2xl text-primary">
                - ABuild Homes Estates
              </span>
            </h2>
            <div className="mb-5">
              <p className="text-white lg:text-neutral  text-lg py-6 backgrond-line  lg:bg-transparent ">
                Where every brick tells a unique and captivating story. We
                believe that a home is not just a structure; its a narrative
                waiting to unfold.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4  glass bg-[#ffffffbe] gap-6 p-4 rounded-xl items-center justify-around text-gray-700">
            <div className="">
              <h3 className="font-semibold">Location</h3>
              <select
                name="location"
                id="location"
                className="mt-1.5 w-full rounded-lg border-gray-300 bg-transparent text-gray-700 sm:text-sm pr-6 focus:outline-none"
              >
                <option value="">Select your city</option>
                <option value="dhk">Dhaka, BD</option>
                <option value="gpr">Gazipur, BD</option>
                <option value="utr">Uttara, BD</option>
                <option value="nw">New York, USA</option>
                <option value="wt">Washington, USA</option>
                <option value="prs">Paris, FR</option>
                <option value="prg">Prague, CZK</option>
              </select>
            </div>
            <div>
              <h3 className="font-semibold">Property Type</h3>
              <select
                name="location"
                id="location"
                className="mt-1.5 w-full rounded-lg border-gray-300 bg-transparent text-gray-700 sm:text-sm pr-6 focus:outline-none font-light"
              >
                <option value="">Select your city</option>
                <option value="apt">Apartment</option>
                <option value="b">Bunglow</option>
                <option value="c">FarmHouse</option>
                <option value="d">Industrial</option>
                <option value="e">Ranch</option>
              </select>
            </div>
            <div>
              <h3 className="font-semibold">Price Range</h3>
              <p className="text-sm font-light">Choose Price Range</p>
            </div>
            <div className="w-full mx-auto">
              <button className="btn  btn-square btn-primary ">
                <FaSearch className=" text-lg text-white " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
