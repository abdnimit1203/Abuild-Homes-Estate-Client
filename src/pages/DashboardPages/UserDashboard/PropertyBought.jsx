import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/HeaderText/HeaderText";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import OfferedCard from "../../../components/Cards/OfferedCard";


const PropertyBought = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data, isLoading} = useQuery({
        queryKey: ["buyerData"],
        queryFn: async()=>{
            const res = await axiosSecure.get(`api/v1/offers?buyerEmail=${user.email}`)
            return res.data
        }   
    })
    console.log(data);
   
    return (
        <div>
           <HeaderText headerText="Property Bought" headerText3={" Bought/ Offered properties are shown here"}></HeaderText>

           {
            isLoading? <div className="flex items-center justify-center"><span className="loading loading-spinner w-20 text-primary "></span></div> :
            <div className="text-center py-4 font-semibold text-lg">
                <p className="italic text-primary underline underline-offset-4">
                Your total Offered/ Bought property : {data.length}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center mx-auto items-center p-6 gap-6">
                    {
                        data.map(property=><OfferedCard key={property._id} property={property}></OfferedCard>)
                    }
                </div>
            
           </div>
           }
           
        </div>
    );
};

export default PropertyBought;