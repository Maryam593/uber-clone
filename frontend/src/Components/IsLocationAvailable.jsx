// import React from "react";
// import { FaCar } from "react-icons/fa";
// import { RiAccountPinCircleFill } from "react-icons/ri";
// import { RiMotorbikeFill } from "react-icons/ri";
// import { FaCaravan } from "react-icons/fa";

// const IsLocationAvailable = () => {
//   return (
//     <div className="bg-white w-full fixed z-10 bottom-0 px-2 py-4 ">
//         <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
//       <div className=" w-full flex items-center mb-2 justify-between p-4 gap-3 border-2 border-black rounded-md">
//         <h1>
//           <FaCar className="text-5xl text-black" />
//         </h1>
//         <div className=" w-1/2 p-2 flex flex-col ml-2">
//           <h4 className="font-medium text-black flex text-base">
//             UberGo
//             <span className="flex items-center ml-2 text-black">
//               <RiAccountPinCircleFill className="text-lg" /> 4
//             </span>
//           </h4>
//           <h5 className="text-black text-sm font-medium">2 Mins Away</h5>
//           <p className="text-gray-600 text-xs font-normal ">Affordable, compact rides</p>
//         </div>
//         <div className="flex items-baseline">
//           <span className="text-black text-md">Rs</span>
//           <h2 className="text-black font-semibold text-4xl p-2">455</h2>
//         </div>
//       </div>
//       {/* bike */}
//       <div className=" w-full flex items-center mb-2 justify-between p-4 gap-3 border-2 border-black rounded-md">
//         <h1>
//           <RiMotorbikeFill className="text-5xl text-black" />
//         </h1>
//         <div className=" w-1/2 p-2 flex flex-col ml-2">
//           <h4 className="font-medium text-black flex text-base">
//             Moto
//             <span className="flex items-center ml-2 text-black">
//               <RiAccountPinCircleFill className="text-lg" /> 1
//             </span>
//           </h4>
//           <h5 className="text-black text-sm font-medium">5 Mins Away</h5>
//           <p className="text-gray-600 text-xs font-normal ">Affordable, motorcycle rides</p>
//         </div>
//         <div className="flex items-baseline">
//           <span className="text-black text-md">Rs</span>
//           <h2 className="text-black font-semibold text-4xl p-2">255</h2>
//         </div>
//       </div>
//       {/* Rickshaw */}
//       <div className=" w-full flex items-center mb-2 justify-between p-4 gap-3 border-2 border-black rounded-md">
//         <h1>
//           <FaCaravan className="text-5xl text-black" />
//         </h1>
//         <div className=" w-1/2 p-2 flex flex-col ml-2">
//           <h4 className="font-medium text-black flex text-base">
//             RickShaw
//             <span className="flex items-center ml-2 text-black">
//               <RiAccountPinCircleFill className="text-lg" /> 3
//             </span>
//           </h4>
//           <h5 className="text-black text-sm font-medium">5 Mins Away</h5>
//           <p className="text-gray-600 text-xs font-normal ">Affordable, Rickshaw rides</p>
//         </div>
//         <div className="flex items-baseline">
//           <span className="text-black text-md">Rs</span>
//           <h2 className="text-black font-semibold text-4xl p-2">355</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IsLocationAvailable;


import React, { useState } from "react";
import { FaCar } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCaravan } from "react-icons/fa";

const IsLocationAvailable = () => {
  // Vehicle data array
  const vehicles = [
    {
      name: "UberGo",
      icon: <FaCar className="text-5xl text-black" />,
      price: 455,
      distance: 2,
      description: "Affordable, compact rides",
      available: 4
    },
    {
      name: "Moto",
      icon: <RiMotorbikeFill className="text-5xl text-black" />,
      price: 255,
      distance: 5,
      description: "Affordable, motorcycle rides",
      available: 1
    },
    {
      name: "RickShaw",
      icon: <FaCaravan className="text-5xl text-black" />,
      price: 355,
      distance: 5,
      description: "Affordable, Rickshaw rides",
      available: 3
    }
  ];

  // State to track the active vehicle
  const [activeIndex, setActiveIndex] = useState(null);

  // Handle vehicle selection
  const handleVehicleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white w-full translate-y-full fixed z-10 bottom-0 px-2 py-4">
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      {vehicles.map((vehicle, index) => (
        <div
          key={index}
          className={`w-full flex items-center mb-2 justify-between p-4 gap-3 border-2 rounded-md ${
            activeIndex === index ? "border-black" : "bg-gray-200 border-gray-200"
          }`}
          onClick={() => handleVehicleClick(index)}
        >
          <h1>{vehicle.icon}</h1>
          <div className="w-1/2 p-2 flex flex-col ml-2">
            <h4 className="font-medium text-black flex text-base">
              {vehicle.name}
              <span className="flex items-center ml-2 text-black">
                <RiAccountPinCircleFill className="text-lg" /> {vehicle.available}
              </span>
            </h4>
            <h5 className="text-black text-sm font-medium">{vehicle.distance} Mins Away</h5>
            <p className="text-gray-600 text-xs font-normal">{vehicle.description}</p>
          </div>
          <div className="flex items-baseline">
            <span className="text-black text-md">Rs</span>
            <h2 className="text-black font-semibold text-4xl p-2">{vehicle.price}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IsLocationAvailable;

