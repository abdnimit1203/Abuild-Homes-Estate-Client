import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth()
  const navigate = useNavigate();
  //toast

  const toastProfileUpdateSuccess = () => toast.success("Profile Updated");
  const toastProfileUpdateError = (err) => toast.error(`${err.split(":")[1]}`);

  //handle form
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;
    // console.log(displayName, photoURL);
    updateUserProfile(displayName, photoURL)
      .then(() => {
        toastProfileUpdateSuccess();
        e.target.displayName.value = "";
        e.target.photoURL.value = "";
        navigate("/user-profile");
      })
      .catch((error) => {
        console.log(error.message);
        toastProfileUpdateError(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-400 to-pink-600 py-20 md:pt-32">
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
        <h3 className="text-3xl gap-2 items-center">
          {user?.displayName}
          {user?.emailVerified ? (
            <MdVerified className="text-blue-300 inline pl-2 pb-2 text-4xl" />
          ) : (
            <p className="text-xs text-center ">(not verified)</p>
          )}
        </h3>
        <p className="">{user?.email}</p>
        {/* FOrm */}
        <form onSubmit={handleUpdateProfile}>
          <div className="relative flex lg:w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="text-center pt-10 font-bold text-xl sm:text-3xl transition duration-300 ease-in-out hover:scale-110 ">
              <h2 className=" text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                EDIT PROFILE
              </h2>
            </div>
            <div className="flex flex-col gap-4 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  name="displayName"
                  required
                  type="text"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-secondary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-secondary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-secondary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-secondary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Username
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="url"
                  name="photoURL"
                  required
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-secondary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-secondary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-secondary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-secondary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Photo URL
                </label>
              </div>
            </div>
            <div className="p-6 pt-0 md:pb-20 ">
              <motion.button whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.9 }}
                className="block w-full select-none  bg-gradient-to-tr from-pink-600 to-secondary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-secondary/20 transition-all hover:shadow-lg hover:shadow-secondary/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none rounded-xl"
                type="submit"
                data-ripple-light="true"
              >
                Update Profile
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;