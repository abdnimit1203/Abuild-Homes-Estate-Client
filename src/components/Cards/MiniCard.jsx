import { FiMapPin } from "react-icons/fi";
import { MdPriceChange } from "react-icons/md";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const MiniCard = ({ property }) => {
  const {
    _id,
    propertyTitle,
    status,
    priceRange,
    propertyLocation,
    propertyImage,
  } = property;
  return (
    <div className="h-full max-w-xl mx-auto">
      <div className="overflow-hidden  shadow flex transition hover:shadow-lg hover:border-primary hover:scale-105  p-6 bg-base-200 border rounded-xl items-start h-full text-neutral glass gap-4">
        <div className="flex-1 h-full">
          <img
            alt="property image"
            src={propertyImage}
            className="rounded-xl h-full object-cover "
          />
        </div>

        <div className="flex-1">
          <div>
            <h3 className="mt-0.5 md:text-xl font-semibold  ">{propertyTitle}</h3>

            <p className="mt-2 line-clamp-3  text-sm/relaxed  ">
              <FiMapPin className="inline mr-3" />
              {propertyLocation}
            </p>

            <p className="mt-2 line-clamp-3 text-sm lg:text-base ">
              <MdPriceChange className="inline mr-3" />
              {priceRange}
            </p>
          </div>
          <div className="flex flex-col items-start lg:flex-row lg:justify-between lg:items-center lg:mt-4 gap-3">
            <p className="mt-2  line-clamp-3 text-md/relaxed ">
              <span className="font-bold text-secondary">Status: </span>
              {status}
            </p>

            <Link to={`/properties/${_id}`}>
              <button className="btn btn-primary btn-sm lg:px-10 text-white ">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
MiniCard.propTypes = {
  property: PropTypes.object.isRequired,
};
export default MiniCard;
