
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
const useProperties = (sort) => {
    console.log(sort);
    const axiosSecure = useAxiosSecure()


    const {data: property=[],isLoading,refetch} = useQuery({
        queryKey: ['property',sort],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/api/v1/properties?status=verified&sort=${sort}`)
            return res.data
        }
    })
    return [property,isLoading,refetch]
};

export default useProperties;