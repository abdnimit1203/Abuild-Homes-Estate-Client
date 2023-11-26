
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
const useProperties = () => {
    const axiosSecure = useAxiosSecure()


    const {data: property=[],refetch} = useQuery({
        queryKey: ['property'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/api/v1/properties?status=verified`)
            return res.data
        }
    })
    return [property,refetch]
};

export default useProperties;