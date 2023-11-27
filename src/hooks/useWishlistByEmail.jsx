import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useWishlistByEmail = (email) => {
    const axiosPublic = useAxiosPublic();

    const { data: wishlistDataByEmail = [],refetch } = useQuery({
      queryKey: ["wishlistDataByEmail"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/api/v1/wishlists?email=${email}`);
        return res.data;
      }
    })
    return [wishlistDataByEmail,refetch]
};

export default useWishlistByEmail;