import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative rounded-2xl">
      <img
        src="/assets/home/banner.png"
        alt="banner img"
        className=" rounded-2xl"
      />
      <div className="md:absolute md:pl-20 top-[10%] 2xl:top-[200px] text-neutral-700">
        <h2 className="text-2xl md:text-4xl font-bold md:w-[50%]">
          Discover Your Dream Home with <br />
          ABuild Homes Estates
        </h2>
        <p className="md:w-[50%] text-lg py-6">
          We provide a complete service for the sale, purchase or rental of real
          estate.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4  glass bg-[#ffffffbe] gap-6 p-4 rounded-xl items-center justify-around">
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
          <div >
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

            <FaSearch className=" text-lg text-white "/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
