import React, { useState } from 'react';
import { useRef } from 'react';
import { PiMapPinLineLight } from 'react-icons/pi';
import {useGSAP} from "@gsap/react"
import gsap from "gsap";

const LocationSearchPanel = ({panelOpen}) => {
    const [clicked, setClicked] = useState(false);
    const vehiclepanelRef = useRef(null)
    const handleBorder = (index) => {
        setClicked(index);
    };

    useGSAP(()=> {
        if(panelOpen)
            {
                gsap.to(vehiclepanelRef.current,{
                    height:"70vh",
                    opacity: 1,
                    padding:24
                 })
            }
            else {
                gsap.to(vehiclepanelRef.current,{
                    height:"0",
                    opacity:0
                 })
            }
    }, [vehiclepanelRef])

    const locations = [
        { 
            icon: <PiMapPinLineLight className='text-2xl' />, 
            location: 'House no. 248/b, Street 1, Awan Colony, Jail Road Sargodha'
        },
        { 
            icon: <PiMapPinLineLight className='text-2xl' />, 
            location: 'Luxury Girls Hostel, Near Minhaj University, Lahore'
        },
    ];

    return (
        <div className="">
            {locations.map((location, index) => (
                <div 
                    key={index} 
                    className={`flex items-center justify-start gap-4 mt-2 mb-2 border-2 p-2 rounded-md ${clicked === index ? "border-black" : "border-gray-300"}`} 
                    onClick={() => handleBorder(index)} // Call handleBorder with the index
                    ref = {vehiclepanelRef}
                >
                    <h2 className="bg-gray-200 rounded-full p-2 font-bold">
                        {location.icon}
                    </h2>
                    <h1 className="font-semibold">
                        {location.location}
                    </h1>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;
