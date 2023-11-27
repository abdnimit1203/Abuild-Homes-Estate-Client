import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useRole = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    
      const { data: userRole = [],isLoading } = useQuery({
        queryKey: ["user-key"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/api/v1/users?email=${user?.email}`);
          return res.data;
        }
      })
      return [userRole,isLoading]

};

export default useRole;