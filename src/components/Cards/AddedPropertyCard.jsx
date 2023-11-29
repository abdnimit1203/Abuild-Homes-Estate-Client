
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FiMapPin } from "react-icons/fi";

import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
const AddedPropertyCard = ({ property,refetch }) => {
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
  } = property;


  const handleRemove = async()=>{
    
    axiosPublic.delete(`/api/v1/properties/${_id}`)
    .then(res=>{
        console.log(res.data)
     
        Swal.fire({
          position: "top-end",
       
          text: `${propertyTitle} - has been removed !`,
          showConfirmButton: false,
          timer: 2500,
          iconHtml: '<img src="https://i.ibb.co/sC2CCr2/pngegg.png" alt="removed"  />'

        })
        refetch()
    })
    .then(err=>{
        toast.error(`${err.message}`)
    })
   
  }
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg max-w-sm xl:max-w-lg mx-auto h-full bg-base-200">
      <img
        alt="property image"
        src={propertyImage}
        className="aspect-video w-full object-cover"
      />

      <div className="  p-4 sm:p-6">
        <h3 className="mt-0.5 text-lg min-h-[60px] ">{propertyTitle}</h3>
        <p className="mt-2 line-clamp-3 text-neutral-400">
          <FiMapPin className="inline mr-3 text-primary" />
          {propertyLocation}
        </p>

        <p className="mt-2 line-clamp-3 text-sm/relaxed font-semibold">
       Agent Info
        </p>
        <hr />
        <div className="flex gap-2 py-2 btn no-animation bg-gradient-to-tr from-primary to-success text-white">
            <img src={agentImage} alt="agent image" className="w-8 border rounded-full" />
            <p>{agentName}</p>
        </div>
        <hr />
        <button className={`${status}  p-1 underline text-white my-4`}>Status : {status}</button>

        <p className="text-success font-semibold">Price Range : {priceRange}</p>
        <div className="flex flex-col justify-end mt-4 gap-4">
           {
            status === "rejected"? '': <Link>
            <button className="btn btn-primary text-white w-full">
               <FaEdit className="text-2xl"/>  Update
            </button>
            
            </Link>
           }
            <button onClick={handleRemove} className="btn btn-error text-white">
               <RiDeleteBinFill className="text-2xl"/> Remove
            </button>
        </div>
      </div>
    </article>
  );
};
AddedPropertyCard.propTypes = {
    property: PropTypes.object.isRequired,
    refetch: PropTypes.func,
  };
export default AddedPropertyCard;
