import { Link } from "react-router-dom";
import useAdData from "../../hooks/useAdData";
import MiniCard from "../Cards/MiniCard";
import HeaderText from "../HeaderText/HeaderText";


const Advertisement = () => {
  const [property,isLoading] = useAdData()
  const adData = property.propertiesData
  // console.log(isLoading,adData);
  return (
    <div className="flex flex-col items-center">
      <HeaderText headerText="Our Popular Properties" />
      { isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          { adData?.slice(0,6).map((property, idx) => (
            <MiniCard key={idx} property={property}></MiniCard>
          ))}
        </div>
      )}

      <Link to={"/all-properties"}>
        <button className="button button-1 px-6 my-10 rounded-xl">
          See All
        </button>
      </Link>
    </div>
  );
};

export default Advertisement;
