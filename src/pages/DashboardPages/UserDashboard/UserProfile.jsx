import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaEdit } from "react-icons/fa";
import useRole from "../../../hooks/useRole";
const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UserProfile = () => {
  const { user, updateUserProfile } = useAuth()
  const [role,isLoading] = useRole(user?.email)
  const navigate = useNavigate()
  const location = useLocation()

  const axiosPublic = useAxiosPublic()
  //toast

  const toastProfileUpdateSuccess = () => toast.success("Profile Updated");
  const toastProfileUpdateError = (err) => toast.error(`${err.split(":")[1]}`);




// modal submit
const { register, handleSubmit, reset } = useForm();
  const onSubmit =async (data) => {
   console.log(data)
   const imageFile = { image: data.image[0] };
   const res = await axiosPublic.post(image_hosting_api, imageFile, {
     headers: {
       "content-type": "multipart/form-data",
     },
   });
   console.log(res.data);
    updateUserProfile(data.displayName, res.data.data.display_url)
    .then(() => {
      toastProfileUpdateSuccess();
      axiosPublic.patch(`/api/v1/username?email=${user.email}&username=${data.displayName}`)
      .then(res=>{
        console.log(res.data)
      })
        navigate(location.pathname)
    })
    .catch((error) => {
      console.log(error.message);
      toastProfileUpdateError(error.message);
    });
  
    document.getElementById("my_modal_3").close();
    reset();
  };





  return (
    <div className="min-h-screen bg-gradient-to-tr from-primary to-sky-700 py-20 md:pt-32">
      <h2 className="text-center font-bold pb-16 text-white text-2xl lg:text-5xl">
        Welcome to Profile Manager
      </h2>
      <div className="text-white  font-semibold flex flex-col justify-center items-center border border-white w-fit mx-auto p-10 rounded-3xl gap-6 py-10">
        <motion.img
          initial={{
            x: 0,
            y: 0,
            scale: 1.8,
            rotate: 0,
    
          }}
          animate={{
            x: 0,
            y: 0,
            scale: 1.0,
            rotate: 0,
          }}
          whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
          src={user?.photoURL}
          alt=""
          className="rounded-full max-w-[220px] object-cover aspect-square"
        />
        <h3 className="text-xl lg:text-3xl gap-2 items-center">
          {user?.displayName}
          {user?.emailVerified ? (
            <MdVerified className="text-blue-300 inline pl-2 pb-2 text-4xl" />
          ) : (
            <p className="text-xs text-center ">(not verified)</p>
          )}
        </h3>
        <div>
            {
                isLoading? <span className="loading loading-spinner loading-md"></span>: role !== "user" &&
                <button className="btn btn-secondary text-white">ROLE : {role.toUpperCase()}</button>
            }
        </div>
        <p className="text-sm lg:text-xl">{user?.email}</p>
        {/* FOrm */}
       
        {/* modal */}
        <div className="flex gap-6 flex-col md:flex-row">
   
        <div className="text-center p-4 font-bold text-xl sm:text-2xl rounded-2xl transition duration-300 ease-in-out hover:scale-110 bg-white flex items-center">
             <FaEdit className="text-pink-400 inline mr-3 "/>
              <button
          className="text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          EDIT PROFILE
        </button>
            </div>
        
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box text-neutral-800 border-4 border-pink-500 bg-gradient-to-tr via-pink-400 to-white">
            <form method="dialog">
            
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold  pb-4 text-xl">Edit & update your profile<FaEdit className="inline-block text-2xl ml-2"/> </h3>
           
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 grid grid-cols-6 gap-6 text-left justify-center items-center"
            >
              <div className="col-span-6">
                <label htmlFor="review" className="block text-sm font-medium ">
                  New username
                </label>

                <input
                type="displayName"
                  id="displayName"
                  name="displayName"
                  defaultValue={user?.displayName}
                  required
                  {...register("displayName")}
                  className="mt-1 w-full border-2 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3   shadow-inner"
                />
              </div>
              <div className="col-span-6 ">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload Image
                </label>

                <input
                  type="file"
                  name="image"
                  {...register("image", { required: true })}
                  className="file-input file-input-bordered file-input-secondary w-full max-w-full bg-white"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mx-auto">
                <button
                  type="submit"
                  className="button button-2 btn-secondary hover:text-white p-4"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
        {/* modal */}
      </div>
    </div>
  );
};

export default UserProfile;