import { FiMapPin } from "react-icons/fi";
import { MdPriceChange } from "react-icons/md";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const MiniCard = ({ property }) => {
  const {
    propertyTitle,
    verificationStatus,
    priceRange,
    propertyLocation,
    propertyImage,
  } = property;
  return (
    <div className="h-full max-w-xl mx-auto">
      <div className="overflow-hidden  shadow flex transition hover:shadow-lg hover:border-primary p-6 bg-white border rounded-xl items-start h-full">
        <img
          alt="property image"
          src={propertyImage}
          className="h-56 object-cover rounded-xl"
        />

        <div className="bg-white  pl-6">
        

            <h3 className="mt-0.5 text-xl font-semibold text-gray-900 ">
             {propertyTitle}
            </h3>
    
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
           <FiMapPin  className="inline mr-3"/>{propertyLocation}
          </p>
        
          <p className="mt-2 line-clamp-3  text-gray-500">
           <MdPriceChange  className="inline mr-3"/>{priceRange}
          </p>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          <span className="font-bold text-secondary">Status: </span>{verificationStatus}
          </p>
            
          <Link to={`${propertyTitle}`} >
          <button className="btn btn-primary btn-sm text-white my-6">
            Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
MiniCard.propTypes = {
    property: PropTypes.object.isRequired,
  };
export default MiniCard;
