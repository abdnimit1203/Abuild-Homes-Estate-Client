import { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { BsBuildingAdd } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import HeaderText from "../HeaderText/HeaderText";

const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatePropertyForm = () => {
  const propertyData = useLoaderData();
  console.log(propertyData);
  const {
    _id,
    propertyTitle,
    propertyImage,
    propertyLocation,
    propertyDetails,
    minPrice,
    maxPrice,
    agentEmail,
    agentName,
  } = propertyData;
  const [minimum, setMinimum] = useState(0);
  console.log(minimum);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const priceRange = `$${data.minPrice} - $${data.maxPrice}`;

    let imageLink = propertyImage;
    // image upload to imgbb and then get an url
    if (data.image.length) {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(res.data);
      imageLink = res.data.data.display_url;
    }
    const propertyData = {
      propertyImage: imageLink,
      propertyTitle: data.propertyTitle,
      propertyLocation: data.propertyLocation,
      priceRange: priceRange,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      agentName: data.agentName,
      agentEmail: data.agentEmail,

      //   propertyImage: res?.data.data.display_url,
    };
    console.log(propertyData);
    
      axiosPublic
        .patch(`/api/v1/properties/${_id}`, propertyData)
        .then((res) => {
         
            Swal.fire({
              icon: "success",
              color: "white",
              title: "Property Data updated!",
              text: `${propertyTitle} - data has been updated! check your added properties`,
              showConfirmButton: false,
              timer: 4000,
              background: "#18b47b",
            });
            console.log(res.data);
            reset();
            navigate(location?.state || "/");
          }
        ).catch(err=>{
            console.log(err.message);
        })
    
  };
  return (
    <section className="bg-base-200 text-neutral">
      <div>
        <HeaderText headerText="Update Property" />
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
                  defaultValue={propertyTitle}
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
                  Property Image ( leave empty if you do not want to change)
                </label>

                <input
                  type="file"
                  name="image"
                  {...register("image")}
                  className="file-input file-input-bordered file-input-primary w-full max-w-full bg-base-200 "
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
                  defaultValue={propertyDetails}
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
                  defaultValue={minPrice}
                  min={100}
                  {...register("minPrice", {
                    required: true,
                    valueAsNumber: true,
                  })}
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
                  defaultValue={maxPrice}
                  min={minimum}
                  name="maxPrice"
                  {...register("maxPrice", {
                    required: true,
                    valueAsNumber: true,
                  })}
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
                  defaultValue={propertyLocation}
                  name="propertyLocation"
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
                      value={agentName}
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
                      value={agentEmail}
                      {...register("agentEmail", { required: true })}
                      className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-neutral py-3 shadow-sm"
                    />
                  </div>
            
          

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-primary bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary"
                >
                  <BsBuildingAdd className="inline text-lg mr-2" /> Update
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

export default UpdatePropertyForm;
