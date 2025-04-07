import React from 'react';
import { PiMapPinLineLight } from 'react-icons/pi';

const LocationSearchPanel = () => {
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
        <div key={index} className="flex items-center justify-start gap-4 mt-2 mb-2">
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
