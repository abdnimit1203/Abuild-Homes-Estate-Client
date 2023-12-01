
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { BsBookmarkX } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { MdLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const WishlistCard = ({ wishlist,refetch }) => {
    const axiosPublic = useAxiosPublic()
  const {
    _id,
    // propertyID,
    propertyImage,
    propertyLocation,
    priceRange,
    propertyTitle,
    // agentEmail,
    agentName,
    agentImage,
    status,
  } = wishlist;


  const handleRemove = async()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/api/v1/wishlists/${_id}`)
    .then(res=>{
        console.log(res.data)
        Swal.fire({
          title: "Removed!",
          text: `${propertyTitle} - has been removed from wishlist`,
          icon: "success"
        });
       
        refetch()
    })
    .then(err=>{
        toast.error(`${err.message}`)
    })
       
      }
    });
    
   
  }
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg max-w-sm xl:w-lg mx-auto w-full">
      <img
        alt="property image"
        src={propertyImage}
        className="h-56 w-full object-cover"
      />

      <div className="bg-white p-4 sm:p-6">
        <h3 className="mt-0.5 text-lg ">{propertyTitle}</h3>
        <p className="mt-2 line-clamp-3 text-neutral-400">
          <FiMapPin className="inline mr-3 text-primary" />
          {propertyLocation}
        </p>

        <p className="mt-2 line-clamp-3 text-sm/relaxed font-semibold">
       Agent Info
        </p>
        <hr />
        <div className="flex gap-2 py-2">
            <img src={agentImage} alt="agent image" className="w-8 border rounded-full" />
            <p>{agentName}</p>
        </div>
        <hr />
        <button className="btn-success btn btn-xs text-white my-4">Status : {status}</button>
        <p className="text-success font-semibold">Price Range : {priceRange}</p>
        <div className="flex justify-between mt-4">
            <Link to={`/dashboard/make-offer/${_id}`}>
            <button className="btn btn-success  text-white btn-sm">
               <MdLocalOffer className="text-2xl"/>  Make Offer
            </button>
            
            </Link>
            <button onClick={handleRemove} className="btn btn-sm btn-error text-white">
               <BsBookmarkX className="text-2xl"/> Remove
            </button>
        </div>
      </div>
    </article>
  );
};
WishlistCard.propTypes = {
    wishlist: PropTypes.object.isRequired,
    refetch: PropTypes.func,
  };
export default WishlistCard;
