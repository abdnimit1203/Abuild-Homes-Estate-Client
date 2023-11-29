import PropTypes from "prop-types";
import { BsBuildingCheck } from "react-icons/bs";
import { FaCcMastercard } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
const OfferedCard = ({ property }) => {
  const {
    agentName,

    offeredAmount,

    propertyImage,
    propertyLocation,
    propertyTitle,
    status,
    _id,
  } = property;
  return (
    <article className="flex bg-base-200 transition hover:shadow-xl flex-col w-80 mx-auto 2xl:w-96 rounded-2xl h-full">
      <div className={`${status} rounded-t-2xl`}>
        <p>{status}</p>
      </div>

      <div className=" sm:basis-56">
        <img
          alt="property image"
          src={propertyImage}
          className="aspect-video h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6 space-y-3">
          {status === "bought" && (
            <div className="flex text-4xl items-center text-center justify-center text-primary">
              <p>
                <BsBuildingCheck />
              </p>
            </div>
          )}
          <p>{propertyTitle}</p>
          <p className="text-left text-sm  line-clamp-3 lg:text-base text-neutral-400">
            <FiMapPin className="inline mr-3" />
            {propertyLocation}
          </p>
          <p className=" text-sm  line-clamp-3 lg:text-base text-neutral">
            <span>Agent name: </span>
            {agentName}
          </p>
          <p className="text-success">Offered Price : $ {offeredAmount}</p>
        </div>

        {status === "accepted" ? (
          <Link to={`/dashboard/payment/${_id}`}>
            <button className="btn btn-success w-full text-white text-xl">
              <FaCcMastercard /> Pay
            </button>
          </Link>
        ) : status === "bought" ? (
          <p className="text-sm  bg-primary text-white py-1">
            Transaction id : {property?.transacionId}{" "}
          </p>
        ) : (
          ""
        )}
      </div>
    </article>
  );
};
OfferedCard.propTypes = {
  property: PropTypes.object,
};
export default OfferedCard;
