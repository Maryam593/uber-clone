import React from "react";
import { FaCarSide, FaMapMarkerAlt, FaMapMarkedAlt } from "react-icons/fa";
import { RiArrowDownWideLine } from "react-icons/ri";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ConfirmedRide = React.forwardRef((props,ref) => {
  const confirmRider = (e) => {
    e.preventDefault()
    props.setConfirmRiderPanel(true)
    props.onClose()
  }
  useGSAP(() => {
    if (ref.current) {
      gsap.to(ref.current, { transform: 'translateY(0)', duration: 0.3 });
    }
  }, [ref]);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-[4px_4px_4px_4px_#000] rounded-t-xl">
      {/* Close icon */}
      <div className="absolute top-0 w-full flex justify-center p-3">
        <RiArrowDownWideLine
          className="text-gray-400 text-2xl cursor-pointer"
          onClick={() => props.onClose()}
        />
      </div>

      {/* Content container */}
      <div className="pt-10 px-5 flex flex-col items-center">
        {/* Heading */}
        <h3 className="text-2xl font-semibold text-black mb-2">
          Confirm your Ride
        </h3>

        {/* Car Icon */}
        <FaCarSide className="text-[100px] text-black transform scale-x-[-1] mb-4 
        p-2  animate-pulse" />

        {/* Ride Details */}
        <div className="w-full flex flex-col gap-4">
          {/* Current location */}
          <div className="flex gap-3  border border-gray-300 rounded-md p-3 items-start">
            <FaMapMarkerAlt className="text-xl text-black mt-1" />
            <div className="flex flex-col"><span className="text-black font-semibold">Sargodha</span>
            <span className="text-sm text-gray-600">
              House no. 248/2, street 1, Awan Colony, Jail Road
            </span></div>
          </div>

          {/* Destination */}
          <div className="flex gap-3 border border-gray-300 rounded-md p-3 items-start">
            <FaMapMarkedAlt className="text-xl text-black mt-1" />
            <div className="flex flex-col">
            <span className="text-black font-semibold">Sargodha</span>
            <span className="text-sm text-gray-600">
              Destination, near Zam Zam Restaurant
            </span>
            </div>
          </div>

          {/* Amount */}
          <div className="flex gap-3 border border-gray-300 rounded-md p-3 items-start">
            <BsFillCreditCard2FrontFill className="text-xl text-black mt-1" />
            <div className="flex flex-col">
              <span className="text-base font-semibold text-gray-800">Rs 355</span>
              <p className="text-gray-600 text-sm">Cash cash</p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button className="bg-black w-full text-white rounded-md p-3 mt-6 hover:bg-gray-900 transition-all duration-200 mb-2" onClick = { confirmRider}>
          Confirm the Ride Now!
        </button>
      </div>
    </div>
);
});

export default ConfirmedRide;
