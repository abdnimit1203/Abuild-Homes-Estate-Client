import { useQuery } from "@tanstack/react-query";
import HeaderText from "../../../components/HeaderText/HeaderText";
// import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserAlt, FaUserSecret, FaUserSlash } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageUsers = () => {
    // const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data,isLoading, refetch } = useQuery({
      queryKey: ["all-users"],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/api/v1/users`
        );
        return res.data;
      },
    });
    // const propertiesData = data.propertiesData
    // const countData = data.countData
  
        const userCount = data?.reduce((count, user) => {
            return count + (user.role === 'user' ? 1 : 0);
          }, 0);
        const agentCount = data?.reduce((count, user) => {
            return count + (user.role === 'agent' ? 1 : 0);
          }, 0);
        const adminCount = data?.reduce((count, user) => {
            return count + (user.role === 'admin' ? 1 : 0);
          }, 0);
        const fraudCount = data?.reduce((count, user) => {
            return count + (user.role === 'fraud' ? 1 : 0);
          }, 0);
          console.log(userCount,agentCount,adminCount,fraudCount);
   
    const handleMakeAdminAgent = async ( id,role) => {
      
        Swal.fire({
            title: "Are you sure?",
            text: `Make this user  ${role} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Make ${role}`
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axiosSecure
                .patch(`/api/v1/users?id=${id}&role=${role}`)
                .then((res) => {
                  console.log(res.data);
                  Swal.fire({
                    title: `Role = ${role} ,has been set successfully`,
                    icon: "success"
                  });
                 
                  refetch();
                });
            }
          });
      
    };
    const handleMarkFraud= async (id,email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Mark this user as FRAUD?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Mark Fraud!"
          }).then(async(result) => {
            if  (result.isConfirmed) {
                await axiosSecure.patch(`/api/v1/users/fraud?id=${id}&email=${email}`).then((res) => {
                    console.log(res.data);
                    Swal.fire({
                      title: "Success!",
                      text: "User has been marked as FRAUD!",
                      icon: "success"
                    });
                    refetch();
                  })
            }
          });
      
    };
    const handleRemove= (id) => {
      // console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove this account from database??",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/api/v1/users/?id=${id}`)
      .then((res) => {
        console.log(res.data);
        
        Swal.fire({
          title: "Removed!",
          text: "Removed user successfully!",
          icon: "success"
        });
        refetch();
      });
        }
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
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-4 justify-between px-[5%]">

        <div className="my-8 col-span-2 lg:col-span-4
         flex flex-col glass p-6  rounded-2xl w-full  bg-primary text-white">
        <h2 className="text-xl md:text-3xl font-bold  ">Total Accounts</h2>
        <h2 className="text-3xl md:text-6xl  font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><FaUsersLine  className=" inline " /> {data?.length}</p>
          )}
        </h2>
      </div>
        <div className="my-8 flex flex-col glass p-6 rounded-2xl w-fit  bg-warning text-neutral-500 ">
        <h2 className="text-xl md:text-3xl font-bold  ">Role: user</h2>
        <h2 className="text-3xl md:text-6xl  font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><FaUserAlt   className=" inline " /> {userCount}</p>
          )}
        </h2>
      </div>
        <div className="my-8 flex flex-col glass p-6 rounded-2xl w-fit  bg-accent text-neutral-500">
        <h2 className="text-xl md:text-3xl font-bold  ">Role: Agent</h2>
        <h2 className="text-3xl md:text-6xl  font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><FaUserSecret   className=" inline " /> {agentCount}</p>
          )}
        </h2>
      </div>
        <div className="my-8 flex flex-col glass p-6 rounded-2xl w-fit  bg-primary text-white">
        <h2 className="text-xl md:text-3xl font-bold  ">Role: Admin</h2>
        <h2 className="text-3xl md:text-6xl  font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><RiAdminFill  className=" inline " /> {adminCount}</p>
          )}
        </h2>
      </div>
      <div className="my-8 flex flex-col glass p-6 rounded-2xl w-fit  bg-error text-white">
        <h2 className="text-xl md:text-3xl font-bold  ">Fraud Accounts</h2>
        <h2 className="text-3xl md:text-6xl  font-bold ">
          {isLoading ? (
            <span className="loading loading-dots text-white loading-lg"></span>
          ) : (
            <p ><FaUserSlash   className=" inline " /> {fraudCount}</p>
          )}
        </h2>
      </div>
        </div>
  
        <div className="overflow-x-auto px-[5%] rounded-2xl pb-16">
          <table className="min-w-full divide-y-2 di bg-base-200 text-sm rounded-2xl">
            <thead className="bg-primary text-white glass md:text-lg rounded-2xl ">
              <tr className="">
                <th className="whitespace-wrap  rounded-ss-2xl">
                  User name
                </th>
                <th className="whitespace-wrap  py-3">User email</th>
                <th className="whitespace-wrap  ">Role Action</th>
              
  
                <th className="whitespace-wrap   rounded-se-2xl">Remove Action</th>
  
               
              </tr>
            </thead>
  
            <tbody className="divide-y divide-gray-200 text-neutral bg-transparent">
              {data?.map((user) => (
                <tr key={user._id} className="">
                  <td className="whitespace-wrap px-4 py-3 font-semibold text-center">
                    {user.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3  font-bold text-center flex flex-col gap-2 justify-center items-center h-20">
                    {
                    user.role === "user" ? <>
                    
                     <button
                    onClick={() =>
                      handleMakeAdminAgent( user._id,"admin")
                    }
                    className="btn btn-sm btn-success text-white"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() =>
                        handleMakeAdminAgent( user._id, "agent")
                    }
                    className="btn btn-sm btn-accent  text-neutral-600"
                  >
                    Make Agent
                  </button>
                    </> 
                  : user.role ==="agent"?
                  <>
                   <button
                    onClick={() =>
                      handleMarkFraud(user._id,user.email)
                    }
                    className="btn btn-sm btn-error text-white"
                  >
                    Mark Fraud
                  </button>
                  
                  </>
                  :
                  `${user.role}`
                  }
                 
                  </td>
                 
                  <td className="whitespace-nowrap px-4 py-3  font-bold text-center">
                    <button
                    onClick={() =>
                      handleRemove( user._id)
                    }
                    className="btn btn-sm btn-secondary  text-white"
                  >
                    Remove
                  </button>
                 
                  </td>
                
                 
                  
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </>
    );
};

export default ManageUsers;