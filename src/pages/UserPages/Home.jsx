import Banner from "../../components/Banner/Banner";
import Advertisement from "../../components/Others/Advertisement";
import AvailableCountries from "../../components/Others/AvailableCountries";
import ContactUs from "../../components/Others/ContactUs";
import MarqueeAdd from "../../components/Others/MarqueeAdd";
import RatingStars from "../../components/RatingStars/RatingStars";
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
        <Reviews />
      </div>
      <div>
        <ContactUs />
      </div>
      <div>
        <RatingStars/>
      </div>
    </div>
  );
};

export default Home;
