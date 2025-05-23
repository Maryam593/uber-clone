import React, { useState } from "react";
import { FaCar } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCaravan } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiArrowDownWideLine } from "react-icons/ri";

const IsLocationAvailable = React.forwardRef((props,ref) => {
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
  useGSAP(() => {
    if (ref.current) {
      gsap.to(ref.current, { transform: 'translateY(0)', duration: 0.3 });
    }
  }, [ref]);

  // State to track the active vehicle
  const [activeIndex, setActiveIndex] = useState(null);

  // Handle vehicle selection
  const handleVehicleClick = (index) => {
    setActiveIndex(index);
    console.log("Vehicle clicked, opening ConfirmRide Panel");
    props.setConfirmRidePanel(true)
    props.onClose()
  };
  const handleClose = () => {
    if (ref.current) {
      gsap.to(ref.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: "power2.out",
        onComplete: props.onClose 
      });
    } else {
      props.onClose();
    }
  };
  

  return (
    <div className="bg-white w-full  fixed z-10 bottom-0 px-2 py-4 shadow-[4px_4px_4px_4px_#000] rounded-md ">
       <h5 className="text-xl absolute top-0 p-3 mb-5 w-full flex justify-center" onClick={handleClose}><RiArrowDownWideLine className="text-gray-400" /></h5>
      <h3 className="text-2xl font-semibold mb-5 mt-5">Choose a Vehicle</h3>
     
      {vehicles.map((vehicle, index) => (
        <div
          key={index}
          className={`w-full flex items-center mb-2 justify-between p-4 gap-3 border-2 rounded-md ${
            activeIndex === index ? "border-black" : "bg-gray-200 border-gray-200"
          }`}
          onClick={() => handleVehicleClick(index)}
        > 
          <h1>{vehicle.icon}</h1>
          <div className="w-1/2 p-2 flex flex-col ml-2" >
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
});

export default IsLocationAvailable;

