import HeaderText from "../../../components/HeaderText/HeaderText";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsBuildingAdd } from "react-icons/bs";
import { useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
  const [minimum, setMinimum] = useState(0);
  console.log(minimum);
  const axiosPublic = useAxiosPublic();
  const location =useLocation()
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const priceRange = `$${data.minPrice} - $${data.maxPrice}`;
 

    // image upload to imgbb and then get an url

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data);
    const propertyData = {
      agentImage: user?.photoURL,
      ...data,
      priceRange,
      status: "pending",
      propertyImage: res.data.data.display_url,
    };
    console.log(propertyData);
    if (res.data.success) {
      axiosPublic.post("/api/v1/properties", propertyData).then((res) => {
        if (res.data?.insertedId) {
          Swal.fire({
            icon: "success",
            color: "white",
            title: "New Property Added!",
            text: "The Property is under pending status!",
            showConfirmButton: false,
            timer: 4000,
            background: "#18b47b",
          });
          reset();
          navigate(location?.state || "/");
        }
      });
    } else {
      toast.error("OOPS! Something went wrong");
    }
  };
  return (
    <section className="bg-base-200 text-neutral">
      <div>
        <HeaderText headerText="Add New Property" />
      </div>
      <div className="">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 xl:col-span-6">
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
                  name="propertyTitle"
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
              </div>
              <div className="col-span-6 ">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-neutral mb-2"
                >
                  Property Image
                </label>

                <input
                  type="file"
                  name="image"
                  {...register("image", { required: true })}
                  className="file-input file-input-bordered file-input-secondary w-full max-w-full bg-base-200 "
                />
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="propertyDetails"
                  className="block text-sm font-medium text-neutral"
                >
                  Property Details
                </label>

                <textarea
                  type="text"
                  id="propertyDetails"
                  {...register("propertyDetails", { required: true })}
                  name="propertyDetails"
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm  py-3 shadow-sm text-gray-700"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="minPrice"
                  className=" text-sm font-medium flex items-center text-neutral"
                >
                  <MdAttachMoney className="inline" /> Min Price Range
                </label>

                <input
                  type="number"
                  id="minPrice"
                  onBlurCapture={(e) => setMinimum(e.target.value)}
                  name="minPrice"
                  min={100}
                  {...register("minPrice", { required: true ,valueAsNumber:true})}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="maxPrice"
                  className=" text-sm font-medium flex items-center text-neutral"
                >
                  <MdAttachMoney className="inline text-xl" /> Max Price Range
                </label>

                <input
                  type="number"
                  id="maxPrice"
                  min={minimum}
                  name="maxPrice"
                  {...register("maxPrice", { required: true ,valueAsNumber:true})}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
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
                  {...register("propertyLocation", { required: true })}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-neutral"
                >
                  Size (sqft)
                </label>

                <input
                  type="number"
                  min={500}
                  placeholder={">500"}
                  id="size"
                  name="size"
                  {...register("size", { required: true ,valueAsNumber:true})}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="rooms"
                  className="block text-sm font-medium text-neutral"
                >
                  Rooms
                </label>

                <input
                  type="number"
                  id="rooms"
                  name="rooms"
                  min={1}
                  max={20}
                  placeholder="1-20"
                  {...register("rooms", { required: true,valueAsNumber:true })}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="parking"
                  className="block text-sm font-medium text-neutral"
                >
                  Parking
                </label>

                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder={"0-10"}
                  id="parking"
                  name="parking"
                  {...register("parking", { required: true ,valueAsNumber:true})}
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-neutral py-3 shadow-sm"
                />
              </div>
              {loading ? (
                <span className="loading loading-spinner text-primary loading-md"></span>
              ) : (
                <>
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
                      value={user?.displayName}
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
                      value={user?.email}
                      {...register("agentEmail", { required: true })}
                      className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-neutral py-3 shadow-sm"
                    />
                  </div>
                </>
              )}

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-secondary bg-secondary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-secondary focus:outline-none focus:ring active:text-secondary"
                >
                  <BsBuildingAdd className="inline text-lg mr-2" /> Add Property
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

export default AddProperty;
