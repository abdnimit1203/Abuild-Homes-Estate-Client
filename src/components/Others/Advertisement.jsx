import { useEffect, useState } from "react";
import HeaderText from "../HeaderText/HeaderText";
import MiniCard from "../Cards/MiniCard";
import { Link } from "react-router-dom";

const Advertisement = () => {

    const [adData,setAdData]=useState([])
    useEffect(()=>{
        fetch('advertisement.json')
        .then((res)=>res.json())
        .then((data)=>setAdData(data))
    },[])

    return (
        <div className="flex flex-col items-center">
            <HeaderText headerText="Our Popular Properties"/>
            <div className="grid grid-cols-2 gap-6 w-full">
                {
                    adData.map((property,idx)=><MiniCard key={idx} property={property}></MiniCard>)
                }
            </div>
            <Link to={'/all-properties'}>
            <button className="button button-1 px-6 my-10 rounded-xl">
                See All
            </button>
            </Link>
        </div>
    );
};

export default Advertisement;