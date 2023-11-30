import { FaQuoteLeft } from "react-icons/fa";
import HeaderText from "../../../components/HeaderText/HeaderText";
import useAuth from "../../../hooks/useAuth";
import useReviewsEmail from "../../../hooks/useReviewsEmail";
import Swal from "sweetalert2";
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import toast from "react-hot-toast";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviewDataByEmail, , refetch] = useReviewsEmail(user?.email);
//   console.log(reviewDataByEmail);
const axiosPublic = useAxiosPublic()

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
      <HeaderText
        headerText={"My Reviews"}
        headerText3={"view/ manage your reviews here!"}
      />
      {
        reviewDataByEmail?.length == 0 && <p className="text-2xl font-semibold text-center">You have no reviews to show!</p>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  p-6 gap-6">
        {reviewDataByEmail?.map((review) => (
          <div
            key={review._id}
            className="w-80 2xl:w-96  glass shadow-xl  bg-warning text-neutral-700 p-6 rounded-2xl border-4 border-neutral flex flex-col justify-between gap-2 items-start text-start"
          >
            <h2 className="text-xl md:text-3xl font-bold   underline">
              Review On:
            </h2>

            <p className="text-lg ">Property title: {review.propertyTitle}</p>
            <p>Agent Name: {review.agentName}</p>
            <h2 className="text-xl font-bold   underline">
             Review time
            </h2>
            <p>{new Date(review.reviewTime).toLocaleDateString()} {new Date(review.reviewTime).toLocaleTimeString()}</p>
            <p></p>
            <h2 className="text-xl font-bold   underline">
              Your review
            </h2>
            <p className="text-lg"><FaQuoteLeft className=" mt-2 text-neutral mb-2" /> {review.reviewDescription}</p>
            <button onClick={()=>handleRemove(review._id)} className="btn-error btn btn-wide text-white">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
