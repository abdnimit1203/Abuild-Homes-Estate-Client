import Banner from "../../components/Banner/Banner";
import Advertisement from "../../components/Others/Advertisement";
import AvailableCountries from "../../components/Others/AvailableCountries";
import ContactUs from "../../components/Others/ContactUs";
import MarqueeAdd from "../../components/Others/MarqueeAdd";
import OurFeatures from "../../components/Others/OurFeatures";
import Rental from "../../components/Others/Rental";
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
        <MarqueeAdd/>
      </div>
      <div>
        <OurFeatures/>
      </div>
      <div>
        <Reviews />
      </div>
      <div>
        <Rental/>
      </div>
      <div>
        <ContactUs />
      </div>
     
    </div>
  );
};

export default Home;
