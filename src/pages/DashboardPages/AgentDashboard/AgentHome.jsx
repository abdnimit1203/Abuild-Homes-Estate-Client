import { useEffect, useState } from "react";
import HeaderText from "../../../components/HeaderText/HeaderText";
import { FiMapPin } from "react-icons/fi";
import { MdLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";


const AgentHome = () => {
    const [data,setData] = useState()
    useEffect(()=>{
        fetch('/advertisement.json')
        .then(res=>res.json())
        .then(data=>setData(data))
        console.log(data);
    },[])
    return (
        <div className="min-h-screen ">
            <div>
                <HeaderText headerText="NO INTERNET" headerText3="Kaj koro"></HeaderText>
            </div>
            <div>
                <p>{data?.length}</p>
                <div className="grid grid-cols-3 gap-6">

                {
                    data?.map((property,idx)=>(
                        <article key={idx} className="overflow-hidden rounded-lg shadow transition hover:shadow-lg max-w-sm xl:max-w-lg mx-auto">
                        <img
                          alt="property image"
                          src={property.propertyImage}
                          className="h-56 w-full object-cover"
                        />
                  
                        <div className="bg-white p-4 sm:p-6">
                          <h3 className="mt-0.5 text-lg ">{property.propertyTitle}</h3>
                          <p className="mt-2 line-clamp-3 text-neutral-400">
                            <FiMapPin className="inline mr-3 text-primary" />
                            {property.propertyLocation}
                          </p>
                  
                          <p className="mt-2 line-clamp-3 text-sm/relaxed font-semibold">
                         Agent Info
                          </p>
                          <hr />
                          <div className="flex gap-2 py-2">
                              <img src={property.agentImage} alt="agent image" className="w-8 border rounded-full" />
                              <p>{property.agentName}</p>
                          </div>
                          <hr />
                          <button className="btn-success btn btn-xs text-white my-4">Status : {status}</button>
                          <p className="text-success font-semibold">Price Range : {property.priceRange}</p>
                          <div className="flex justify-between mt-4">
                              <Link>
                              <button className="btn btn-success  text-white">
                                 <MdLocalOffer className="text-2xl"/>  Make Offer
                              </button>
                              
                              </Link>
                              {/* <button onClick={handleRemove} className="btn btn-error text-white">
                                 <BsBookmarkX className="text-2xl"/> Remove
                              </button> */}
                          </div>
                        </div>
                      </article>
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default AgentHome;