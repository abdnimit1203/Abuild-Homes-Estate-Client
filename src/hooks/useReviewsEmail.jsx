import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReviewsEmail = (email) => {
    const axiosPublic = useAxiosPublic();

    const { data: reviewDataByEmail = [], isLoading ,refetch} = useQuery({
      queryKey: ["reviewDataByEmail"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/api/v1/reviews?email=${email}`);
        return res.data;
      }
    })
    return [reviewDataByEmail, isLoading,refetch]
};

export default useReviewsEmail;