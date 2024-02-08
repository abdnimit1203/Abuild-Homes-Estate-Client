import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/HeaderText/HeaderText";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, refetch } = useQuery({
    queryKey: ["sold-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/v1/offers?agentEmail=${user?.email}`
      );
      return res.data;
    },
  });
  const handleAccepted = async (title, id) => {
    // console.log(title,id);
    await axiosSecure
      .patch(`/api/v1/accepted-offer?id=${id}&title=${title}`)
      .then((res) => {
        console.log(res.data);
        toast.success("The  Offered has been accepted");
        refetch();
      });
  };
  const handleRejected = (id) => {
    // console.log(id);
    axiosSecure.patch(`/api/v1/rejected-offer?id=${id}`).then((res) => {
      console.log(res.data);
      toast.error("Offered request rejected successfully! ", {
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

      <div className="overflow-x-auto px-[5%] rounded-2xl pb-6 ">
        {
          data?.length ==0 ? <p className="text-2xl font-bold text-center border-y-2 py-4 glass bg-warning">Opp! No data available</p>:
        <table className="min-w-full divide-y-2 di bg-base-200 text-sm rounded-2xl ">
          <thead className="bg-success text-neutral glass md:text-lg rounded-2xl ">
            <tr>
              <th className="whitespace-wrap  rounded-ss-2xl">
                Property title
              </th>
              <th className="whitespace-wrap  ">Property location</th>
              <th className="whitespace-wrap  ">Buyer name</th>
              <th className="whitespace-wrap  ">Buyer email</th>

              <th className="whitespace-wrap  py-2">Offered price</th>

              <th className="whitespace-wrap  py-2 rounded-se-2xl">
                Status Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-neutral glass">
            {data?.map((property) => (
              <tr key={property._id} className="">
                <td className="whitespace-wrap font-semibold px-4 py-3 ">
                  {property.propertyTitle}
                </td>
                <td className="whitespace-nowrap px-4 py-3 ">
                  {property.propertyLocation}
                </td>
                <td className="whitespace-nowrap px-4 py-3 ">
                  {property.buyerName}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {property.buyerEmail}
                </td>
                <td className="whitespace-nowrap font-semibold text-primary px-4 py-3">
                  ${property?.offeredAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                {property.status === "pending" ? (
                  <td className="whitespace-nowrap px-4 py-3 flex flex-col gap-2">
                    <button
                      onClick={() =>
                        handleAccepted(property.propertyTitle, property._id)
                      }
                      className="btn btn-sm btn-success text-white"
                    >
                      Accept
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
        }
      </div>
      
    </>
  );
};

export default RequestedProperties;
