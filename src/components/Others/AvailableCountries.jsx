import CountrySlider from "../SwiperSliders/CountrySlider";
import HeaderText from "../HeaderText/HeaderText";
const AvailableCountries = () => {
  return (
    <div>
      <HeaderText headerText="We are available in many" headerText2=" well known countries" />
      <CountrySlider />
    </div>
  );
};

export default AvailableCountries;
