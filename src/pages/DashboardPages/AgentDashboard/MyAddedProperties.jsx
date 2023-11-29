import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/HeaderText/HeaderText";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import AddedPropertyCard from "../../../components/Cards/AddedPropertyCard";

const MyAddedProperties = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()

    const {data , isLoading, refetch} = useQuery({
        queryKey: ['agent-property'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/api/v1/properties?email=${user?.email}`)
            return res.data
        }
    })
    const agentProperties = data?.propertiesData
console.log(agentProperties);

  
    return (
        <div>
           <HeaderText headerText="My Added Properties"/> 

           <div>
            {
                isLoading? 
                <div className="w-fit mx-auto "><span className="loading loading-spinner text-primary w-20"></span></div>
                :   
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6 lg:px-12">

                    {
                        agentProperties?.map(property=><AddedPropertyCard key={property._id} property={property} refetch={refetch}></AddedPropertyCard>)
                    }
                </div>
            }
           </div>
        </div>
    );
};

export default MyAddedProperties;