import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/HeaderText/HeaderText";
// import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsBuildingExclamation, BsBuildingFillCheck, BsBuildingFillX } from "react-icons/bs";

const ManageProperties = () => {
    // const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data,isLoading, refetch } = useQuery({
      queryKey: ["all-properties"],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/api/v1/properties`
        );
        return res.data;
      },
    });
    // const propertiesData = data.propertiesData
    // const countData = data.countData
  
        const pendingCount = data?.propertiesData?.reduce((count, property) => {
            return count + (property.status === 'pending' ? 1 : 0);
          }, 0);
        const verifiedCount = data?.propertiesData?.reduce((count, property) => {
            return count + (property.status === 'verified' ? 1 : 0);
          }, 0);
        const rejectedCount = data?.propertiesData?.reduce((count, property) => {
            return count + (property.status === 'rejected' ? 1 : 0);
          }, 0);
          console.log(pendingCount,verifiedCount,rejectedCount);
   
    const handleVerify = async ( id) => {
      // console.log(title,id);
      await axiosSecure
        .patch(`/api/v1/make-verified?id=${id}`)
        .then((res) => {
          console.log(res.data);
          toast.success("Property has been verified");
          refetch();
        });
    };
    const handleRejected = (id) => {
      // console.log(id);
      axiosSecure.patch(`/api/v1/make-rejected?id=${id}`).then((res) => {
        console.log(res.data);
        toast.error("Property request rejected successfully! ", {
          style: {
            borderRadius: "10px",
            background: "#eb3472",
            padding: "26px 10px",
          },
        })
        refetch();
      });
    };
    console.log(data);
    return (
      <>
        <div>
          <HeaderText
            headerText="Requested Properties"
            headerText3={"all offered/requested property are here"}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 justify-between px-[5%]">

        <div className="my-8 col-span-3
         flex flex-col glass p-6  rounded-2xl w-fit  bg-primary text-white">
        <h2 className="text-xl  font-bold  ">Total Properties</h2>
        <h2 className="text-3xl   font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><HiOutlineBuildingOffice2 className=" inline " /> {data.countData}</p>
          )}
        </h2>
      </div>
        <div className="my-8 flex flex-col glass p-3 md:p-6 rounded-2xl w-fit  bg-warning text-neutral-500 ">
        <h2 className=" md:text-xl font-bold  ">Pending Properties</h2>
        <h2 className="text-3xl  font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><BsBuildingExclamation  className=" inline " /> {pendingCount}</p>
          )}
        </h2>
      </div>
        <div className="my-8 flex flex-col glass p-3 md:p-6 rounded-2xl w-fit  bg-success text-white">
        <h2 className=" md:text-xl font-bold  ">Verified Properties</h2>
        <h2 className="text-3xl font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><BsBuildingFillCheck  className=" inline " /> {verifiedCount}</p>
          )}
        </h2>
      </div>
        <div className="my-8 flex flex-col glass p-3 md:p-6 rounded-2xl w-fit  bg-error text-white">
        <h2 className=" md:text-xl font-bold  ">Rejected Properties</h2>
        <h2 className="text-3xl  font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><BsBuildingFillX  className=" inline " /> {rejectedCount}</p>
          )}
        </h2>
      </div>
        </div>
  
        <div className="overflow-x-auto px-[5%] rounded-2xl pb-16">
          <table className="min-w-full divide-y-2 di bg-base-200 text-sm rounded-2xl">
            <thead className="bg-success text-neutral glass md:text-lg rounded-2xl ">
              <tr>
                <th className="whitespace-wrap  rounded-ss-2xl">
                  Property title
                </th>
                <th className="whitespace-wrap  ">Property location</th>
                <th className="whitespace-wrap  ">Agent name</th>
                <th className="whitespace-wrap  ">Agent email</th>
  
                <th className="whitespace-wrap  py-2">$ Price Range</th>
  
                <th className="whitespace-wrap  py-2 rounded-se-2xl">
                  Status Action
                </th>
              </tr>
            </thead>
  
            <tbody className="divide-y divide-gray-200 text-neutral glass">
              {data?.propertiesData?.map((property) => (
                <tr key={property._id} className="">
                  <td className="whitespace-wrap px-4 py-3 font-semibold">
                    {property.propertyTitle}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 ">
                    {property.propertyLocation}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 ">
                    {property.agentName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {property.agentEmail}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    ${property.priceRange}
                  </td>
                  {property.status === "pending" ? (
                    <td className="whitespace-nowrap px-4 py-3 flex flex-col gap-2">
                      <button
                        onClick={() =>
                          handleVerify( property._id)
                        }
                        className="btn btn-sm btn-success text-white"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleRejected(property._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        Reject
                      </button>
                    </td>
                  ) : (
                    <td className={`${property.status}ed whitespace-nowrap px-4 py-2 font-bold `}>
                      {property.status}
                    </td>
                  )}
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </>
    );
};

export default ManageProperties;