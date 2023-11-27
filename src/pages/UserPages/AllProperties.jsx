import { useState } from "react";
import AllPropertiesCard from "../../components/Cards/AllPropertiesCard";
import useProperties from "../../hooks/useProperties";
import HeaderText from "./../../components/HeaderText/HeaderText";
import { TbHomeSearch } from "react-icons/tb";


const AllProperties = () => {

    const [search, setSearch] = useState('')
    console.log(search);
  const [property] = useProperties();
//   console.log(property);
  const verifiedProperties = property.propertiesData;
//   console.log(verifiedProperties);
  return (
    <div>
      <HeaderText headerText="All Properties" />
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="min-w-fit ">
          {/* search bar */}
            <p className="text-lg font-semibold">Search by property name...</p>
          <div className="relative py-6">
            <label htmlFor="Search" className=" sr-only">
             Search
            </label>

            <input
              type="text"
              id="Search"
              onChange={(e)=> setSearch(e.target.value)}
              placeholder="Search for..."
              className="w-full pl-6 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm focus:outline-primary drop-shadow-lg focus:outline-offset-[3px]"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>

                <TbHomeSearch className="text-xl hover:text-primary"/>

              </button>
            </span>
            <p></p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {verifiedProperties?.filter(item=> {
            return search.toLowerCase() === ''?item : item.propertyTitle.toLowerCase().includes(search.toLowerCase())
          }).map((property) => (
            <AllPropertiesCard
              key={property._id}
              property={property}
            ></AllPropertiesCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProperties;
