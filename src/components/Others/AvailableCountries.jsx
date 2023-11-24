import CountrySlider from "../SwiperSliders/CountrySlider";
import HeaderText from "../HeaderText/HeaderText";
const AvailableCountries = () => {
  return (
    <div>
      <HeaderText headerText="We are available in many well known countries" />
      <CountrySlider />
    </div>
  );
};

export default AvailableCountries;
