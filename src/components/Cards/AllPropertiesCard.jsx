import PropTypes from "prop-types";
import { FiMapPin } from "react-icons/fi";
import { MdPriceChange } from "react-icons/md";
import { Link } from "react-router-dom";
const AllPropertiesCard = ({ property }) => {
  const {
    _id,
    propertyImage,
    propertyLocation,
    priceRange,
    propertyTitle,
    agentEmail,
    agentName,
    agentImage,
    status,
  } = property;
  return (
    <div>
      <article className="flex bg-base-200   transition glass hover:shadow-xl border-2 rounded-2xl">
        <div className="rotate-180 p-2 [writing-mode:_vertical-lr] bg-secondary rounded-ee-2xl rounded-es-2xl ">
          <p className="text-center text-white text-xl font-semibold">
            {status}
          </p>
        </div>

        <div className="hidden sm:block sm:basis-80 lg:max-w-[30%]">
          <img
            alt="property image"
            src={propertyImage}
            className="md:aspect-video  h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between glass rounded-r-2xl text-neutral">
          <div className="border-s border-gray-900/10 p-4 sm:pr-0 sm:pb-0 sm:border-l-transparent sm:p-6">
            <a href="#">
              <h3 className="font-bold text-2xl  ">{propertyTitle}</h3>
            </a>

            <p className="mt-2 line-clamp-3 md:text-lg">
              <FiMapPin className="inline mr-3" />
              {propertyLocation}
            </p>
            <p className="mt-2 line-clamp-3 md:text-lg">
              <MdPriceChange className="inline mr-3" />
              Price Range :{" "}
              <span className="btn btn-sm btn-success no-animation text-white ">
                {priceRange}
              </span>
            </p>
            <div className="sm:flex sm:items-end sm:justify-between pt-6 items-center">
              <div className="flex gap-4  border-4 border-b-0 px-4 border-primary pt-2 rounded-2xl rounded-b-none pb-2">
                <div className="">

                    <img src={agentImage} alt="agent-image" className=" mask w-10 border mask-squircle"/>
                </div>
                    <div className="flex flex-col font-medium">
                        <p className="text-sm/relaxed">{agentName}</p>
                        <p className="text-sm/relaxed">{agentEmail}</p>
                    </div>
              </div>
              <Link to={`/property/${_id}`}>
                <button className="btn btn-primary rounded-none rounded-ee-2xl text-white">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
AllPropertiesCard.propTypes = {
  property: PropTypes.object.isRequired,
};
export default AllPropertiesCard;
