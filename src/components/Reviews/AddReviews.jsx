import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useReviewsID from "../../hooks/useReviewsID";
import { FaQuoteLeft } from "react-icons/fa";

const AddReviews = ({ reviewData }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { _id, agentName, agentEmail, propertyTitle } = reviewData;
  // get id wise reviews
  const [reviewDataByID, refetch] = useReviewsID(_id);
//   console.log(reviewDataByID);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const myReview = {
      username: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      propertyID: _id,
      propertyTitle: propertyTitle,
      agentName: agentName,
      agentEmail: agentEmail,
      reviewDescription: data.review,
      reviewTime: new Date().getTime(),
    };
    axiosPublic.post("/api/v1/reviews", myReview).then((res) => {
      console.log(res.data);
      toast.success("Review added successfully!");
      refetch();
      document.getElementById("my_modal_3").close();
    });

    console.log(myReview);
    reset();
  };

  return (
    <div className="p-4 border-2 rounded-2xl my-4 space-y-3">
      <h2 className="text-xl font-bold">Reviews</h2>
      <hr />
      <div className="flex gap-6 flex-col md:flex-row">
        <p>You can view and also add review for this property here</p>
      
        <button
          className="btn btn-warning btn-sm"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add a review
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-warning text-neutral-800">
            <form method="dialog">
            
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg pb-4">Add you reviews here</h3>
            <div className="flex gap-2">
              <p className="underline-offset-4 underline font-semibold pb-3">
                Property Title:{" "}
              </p>
              <p> {propertyTitle}</p>
            </div>
            <div className="flex gap-2">
              <p className="underline-offset-4 underline font-semibold">
                Agent Name:{" "}
              </p>
              <p> {agentName}</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 grid grid-cols-6 gap-6 text-left justify-center items-center"
            >
              <div className="col-span-6">
                <label htmlFor="review" className="block text-sm font-medium ">
                  Your Review
                </label>

                <textarea
                  id="review"
                  name="review"
                  required
                  {...register("review")}
                  className="mt-1 w-full border-2 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3   shadow-inner"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mx-auto">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-primary bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <div>
        <hr />
        <div className="grid grid-cols-1 gap-6">
          {reviewDataByID?.map((review) => (
            
              <div className="border-warning rounded-xl  border-2 p-4" key={review._id}>
                <FaQuoteLeft className="text-neutral mb-2" />
                <p className="textarea-md text-base">{review.reviewDescription}</p>
                <div className="grid grid-cols-1 md:grid-cols-2">
                <p className="italic text-sm/relaxed text-neutral-400 pt-2"> - {review.username}</p>
                <p className="italic text-sm/relaxed text-neutral-400 pt-2 text-right">Posted - {new Date(review.reviewTime).toDateString()}</p>

                </div>
                <div className="text-sm/relaxed text-neutral-400 pt-4">
                  <hr />
                  <p className="italic">
                    Property title - {review.propertyTitle}
                  </p>
                 
                </div>
              </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};
AddReviews.propTypes = {
  reviewData: PropTypes.object.isRequired,
};
export default AddReviews;
