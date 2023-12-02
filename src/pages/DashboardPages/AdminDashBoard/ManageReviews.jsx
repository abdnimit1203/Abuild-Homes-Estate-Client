import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/HeaderText/HeaderText";
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaQuoteLeft } from "react-icons/fa";
import { BsChatSquareQuote } from "react-icons/bs";

const ManageReviews = () => {
    const axiosPublic = useAxiosPublic()
    

    const {data: reviews =[] ,isLoading,refetch} =useQuery({
     queryKey: ['all-user-review'],
     queryFn: async()=>{
         const res = await axiosPublic.get('/api/v1/reviews')
         return res.data
     }
    })
  console.log(reviews);
  // handle remove

const handleRemove = (id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to get the review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove review"
    }).then((result) => {
      if (result.isConfirmed) {
     axiosPublic.delete(`/api/v1/reviews/${id}`)
    .then(res=>{
        console.log(res.data)
        Swal.fire({
          title: "Removed!",
          text: ` Your review has been removed `,
          icon: "success"
        });
        refetch()
    })
    .then(err=>{
        toast.error(`${err.message}`)
    })
       
      }
    })
    
   
  }
    return (
        <div>
            <HeaderText headerText="Manage Reviews"/>
            {
                isLoading? <span className="loading loading-spinner loading-lg md:w-24 text-primary flex items-center text-center mx-auto"></span>
                :
        reviews?.length == 0 && <p className="text-2xl font-semibold text-center">You have no reviews to show!</p>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  p-6 gap-6">
      <div className="my-8 col-span-1 md:col-span-2 xl:col-span-3
         flex flex-col glass p-6  rounded-2xl w-full  bg-warning text-primary">
        <h2 className="text-xl md:text-3xl font-bold  ">Total Reviews</h2>
        <h2 className="text-3xl md:text-6xl  font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><BsChatSquareQuote  className=" inline text-primary" /> {reviews.length}</p>
          )}
        </h2>
      </div>
        {reviews?.map((review) => (
          <div
            key={review._id}
            className="w-full md:w-80 2xl:w-96  glass shadow-xl  bg-warning text-neutral-700 p-6 rounded-2xl border-4 border-neutral flex flex-col justify-between gap-2 items-start text-start"
          >
            <h2 className="text-xl md:text-3xl font-bold   underline">
              Review On:
            </h2>
            <p className="text-lg ">Property title: {review.propertyTitle}</p>
            <h2 className="text-xl font-bold   underline">
             Reviewer Details
            </h2>

            <div className="w-full space-y-2">
            {
                review.userPhoto?
                <img src={review.userPhoto} alt="reviewr-photo" className="w-28 rounded-full aspect-square object-cover mx-auto " />
                :
                <p className="text-secondary">
                    No photo Available
                </p>
            }
            <p className="font-semibold">Reviewer Name: {review.username}</p>
            <p className="font-semibold">Reviewer Email: {review.userEmail}</p>
            </div>
            
            <h2 className="text-xl font-bold   underline">
              Review
            </h2>
            <p className="text-lg"><FaQuoteLeft className=" mt-2 text-neutral mb-2" /> {review.reviewDescription}</p>
            <button onClick={()=>handleRemove(review._id)} className="btn-error btn btn-wide text-white">Delete</button>
          </div>
        ))}
      </div>
        </div>
    );
};

export default ManageReviews;