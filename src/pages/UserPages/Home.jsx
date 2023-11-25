
import toast from "react-hot-toast";
import Banner from "../../components/Banner/Banner";
import Advertisement from "../../components/Others/Advertisement";
import AvailableCountries from "../../components/Others/AvailableCountries";
import ContactUs from "../../components/Others/ContactUs";
import Reviews from "../../components/Reviews/Reviews";


const Home = () => {
  
  return (
    <div className="space-y-10">
      <div>
        <Banner />
      </div>
      <div>
        <AvailableCountries />
      </div>
      <div>
        <Advertisement />
      </div>
      <div>
        <Reviews/>
      </div>
      <div>
        <ContactUs />
      </div>
      
      <div>
        <h1 className="transition duration-300 ease-in-out hover:scale-95 text-xl">
          Home Sweet Home
        </h1>
        <button onClick={()=>{toast.success('Successfully toasted!')}} className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500">
          Download
        </button>
      </div>
    </div>
  );
};

export default Home;
