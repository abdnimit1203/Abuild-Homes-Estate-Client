import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAdData = () => {
    const axiosPublic = useAxiosPublic();

    const { data: adData = [], isLoading } = useQuery({
      queryKey: ["adData"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/api/v1/properties?status=verified`);
        return res.data;
      }
    })
    return [adData, isLoading]
};

export default useAdData;