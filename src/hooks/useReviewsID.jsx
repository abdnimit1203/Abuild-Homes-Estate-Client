import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReviewsID = (_id) => {
    const axiosPublic = useAxiosPublic();


    const { data: reviewDataByID = [], refetch } = useQuery({
      queryKey: ["reviewDataByID",_id],
      queryFn: async () => {
        const res = await axiosPublic.get(`/api/v1/reviews?id=${_id}`);
        return res.data;
      }
    })
    return [reviewDataByID, refetch]
};

export default useReviewsID;