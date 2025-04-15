import React, { useState } from 'react';
import { PiMapPinLineLight } from 'react-icons/pi';


const LocationSearchPanel = (props) => {
    const [clicked, setClicked] = useState(false);
    console.log(props)
    const handleBorder = (index) => {
        setClicked(index);
     
     
    };

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
        <div className="" onClick={() => {props.setVehiclePanel(true)
            props.setPanelOpen(false)
        }
        } >
            {locations.map((location, index) => (
                <div 
                    key={index} 
                    className={`flex items-center justify-start gap-4 mt-2 mb-2 border-2 p-2 rounded-md ${clicked === index ? "border-black" : "border-gray-300"}`} 
                    onClick={() => handleBorder(index)} 
                    
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
