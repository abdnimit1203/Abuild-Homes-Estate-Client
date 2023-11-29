import { useLoaderData } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import HeaderText from "../../../components/HeaderText/HeaderText";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { MdAttachMoney, MdLocalOffer } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const MakeOffer = () => {
  const offerData = useLoaderData();

  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  //   console.log(offerData.userEmail, user.displayName);
  //   console.log(offerData);
  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const button = document.getElementById("disable")
    button.disabled =true
    const offeredData = {
        propertyImage:offerData.propertyImage,
      ...data,
      propertyId:  offerData._id,
      status: "pending",

    };
    console.log(offeredData);
    if (data.offeredAmount >= offerData.minPrice && data.offeredAmount <= offerData.maxPrice) {
      axiosPublic.post("/api/v1/offers", offeredData).then((res) => {
        if (res.data?.insertedId) {
          Swal.fire({
            icon: "success",
            color: "white",
            title: "Your Price has been offered",
            text: "Congratuation! please wait for the confirmation!",
            showConfirmButton: false,
            timer: 4000,
            background: "#18b47b",
          });
          reset();
          navigate(location?.state || "/");
        }
      });
    } else {
      toast.error("Offered Price must be between the price range!");
    }
  };
  return (
    <section className="bg-base-200 text-neutral ">
      <div>
        <HeaderText headerText="Make an Offer!" />
      </div>
      <div className="">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 xl:col-span-6 ">
          <div className="max-w-xl lg:max-w-3xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6">
                <label
                  htmlFor="propertyTitle"
                  className="block text-sm font-medium text-neutral"
                >
                  Property Title
                </label>

                <input
                  type="text"
                  id="propertyTitle"
                  {...register("propertyTitle", { required: true })}
                  value={offerData.propertyTitle}
                  name="propertyTitle"
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
              </div>
              <div className="col-span-6 ">
                <label
                  htmlFor="propertyLocation"
                  className="block text-sm font-medium text-neutral"
                >
                  <FaMapMarkerAlt className="inline" /> Property Location
                </label>

                <input
                  type="text"
                  id="propertyLocation"
                  name="propertyLocation"
                  value={offerData.propertyLocation}
                  {...register("propertyLocation", { required: true })}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="agentName"
                  className="block text-sm font-medium text-neutral"
                >
                  Agent Name
                </label>

                <input
                  type="text"
                  id="agentName"
                  value={offerData.agentName}
                  name="agentName"
                  {...register("agentName", { required: true })}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-neutral py-3 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="agentEmail"
                  className="block text-sm font-medium text-neutral"
                >
                  Agent Email
                </label>

                <input
                  type="email"
                  id="agentEmail"
                  name="agentEmail"
                  value={offerData.agentEmail}
                  {...register("agentEmail", { required: true })}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-neutral py-3 shadow-sm"
                />
              </div>

              <div className="col-span-6 ">
                <label
                  htmlFor="offeredAmount"
                  className=" text-sm font-medium flex items-center text-neutral"
                >
                  <MdAttachMoney className="inline" /> Offerd Amount (
                  <span className="font-bold px-1 text-success">
                    Price range: {offerData.priceRange}
                  </span>
                  )
                </label>

                <input
                  type="number"
                  id="offeredAmount"
                  name="offeredAmount"
                  min={offerData.minPrice}
                  max={offerData.maxPrice}
                  {...register("offeredAmount", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
                {errors.offeredAmount?.type === "required" && (
                  <p role="alert" className="text-error text-xs pt-2">
                    enter an offered amount*
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="buyerName"
                  className="block text-sm font-medium text-neutral"
                >
                  Buyer Name
                </label>

                <input
                  type="text"
                  id="buyerName"
                  value={user.displayName}
                  name="buyerName"
                  {...register("buyerName", { required: true })}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-neutral py-3 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="buyerEmail"
                  className="block text-sm font-medium text-neutral"
                >
                  Buyer Email
                </label>

                <input
                  type="email"
                  id="buyerEmail"
                  name="buyerEmail"
                  value={user.email}
                  {...register("buyerEmail", { required: true })}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-neutral py-3 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="buyindDate"
                  className="block text-sm font-medium text-neutral mb-4"
                >
                  Buying Date
                </label>

                <Controller
                  control={control}
                  name="buyindDate"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                    showIcon
                    isClearable
                    minDate={new Date()}
                    
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                    />
                  )}
                />
                {errors.buyindDate?.type === "required" && (
                  <p role="alert" className="text-error text-xs pt-2">
                    Please select a date
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                    id="disable"
                  className="inline-block shrink-0 rounded-md border border-secondary bg-success px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-secondary focus:outline-none focus:ring active:text-secondary"
                >
                  <MdLocalOffer className="inline text-lg mr-2" /> Make Offer
                </button>
              </div>
            </form>
            <div className="my-10"></div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default MakeOffer;
