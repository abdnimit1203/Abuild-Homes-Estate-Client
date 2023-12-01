import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/HeaderText/HeaderText";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const MySoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["sold-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/v1/payments?agentEmail=${user?.email}`
      );
      return res.data;
    },
  });

  console.log(data);
  return (
    <>
      <div>
        <HeaderText headerText="My Sold Properties" />
      </div>
      <div className="my-8 flex flex-col glass p-6 rounded-2xl w-fit ml-[5%] bg-primary text-white">
        <h2 className="text-xl md:text-3xl font-bold  ">TOTAL SOLD</h2>
        <h2 className="text-3xl md:text-6xl  font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><HiOutlineBuildingOffice2 className=" inline " /> {data.length}</p>
          )}
        </h2>
      </div>
      {isLoading ? 
            <span className="loading loading-dots text-white loading-lg"></span>
          : data.length == 0 ?
            <p className="text-2xl font-bold text-center border-y-2 py-4 glass bg-primary"> No data here!</p>
            :

        <div className="overflow-x-auto w-[90%] px-2 mx-auto my-10 rounded-2xl">
          <table className="min-w-full divide-y-2 divide-gray-200 glass text-xs rounded-2xl bg-base-200">
            <thead className="ltr:text-left rtl:text-right  md:text-lg font-bold bg-primary rounded-2xl">
              <tr className="">
                <th className="whitespace-wrap px-4  text-white py-4 rounded-ss-2xl">
                  Property Title
                </th>
                <th className="whitespace-nowrap px-4  text-white py-4">
                  Property Location
                </th>
                <th className="whitespace-nowrap px-4  text-white py-4">
                  Buyer Name
                </th>
                <th className="whitespace-nowrap px-4  text-white py-4">
                  Buyer Email
                </th>
                <th className="whitespace-nowrap px-4  text-white py-4">
                  Sold Price
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data?.map((soldProperty) => (
                <tr key={soldProperty._id} className="text-neutral">
                  <td className="whitespace-wrap px-4 py-2 font-medium  md:text-lg">
                    {soldProperty.propertyTitle}
                  </td>
                  <td className="whitespace-wrap px-4 py-2  md:text-lg">
                    {soldProperty.propertyLocation}
                  </td>
                  <td className="whitespace-wrap px-4 py-2  md:text-lg">
                    {soldProperty.buyerName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  md:text-lg">
                    {soldProperty.buyerEmail}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  md:text-lg">
                    ${soldProperty?.soldPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          
          }
     
    </>
  );
};

export default MySoldProperties;
