import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = async() => {
    const toastId2 = toast.loading("signing in...");
    try{

    
   await googleSignIn()
      .then((res) => {
        console.log(res.user);
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
          role: "user",
        };

        axiosPublic.post("/api/v1/users", userInfo).then((res) => {
            if (res.data?.insertedId) {
                console.log("user added to the database");
                
              }
          
        });
        toast.success(
            "user signed in successfully!",

            { id: toastId2 }
          );

          navigate(location?.state || "/");
      }
      
      )
      .catch((err) => {
        console.log(err.message);
      })
    }catch(err){
        toast.error(err.message, { id: toastId2 });
      }
  };
  return (
    
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="flex items-center gap-6 font-semibold bg-slate-100 p-2 px-4 rounded-xl shadow-md hover:scale-110 transition delay-150 hover:shadow-success text-gray-900"
      >
        <img
          src="https://i.ibb.co/syGPgLz/google-Logo.png"
          alt="google"
          className="w-12"
        />{" "}
        Continue with Google
      </button>
  
  );
};

export default SocialLogin;
