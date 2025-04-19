import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import IsLocationAvailable from "../Components/IsLocationAvailable";
import ConfirmedRide from "../Components/ConfirmedRide";
import WaitForDriver from "../Components/LookingForADriver";
import LookingForADriver from "../Components/LookingForADriver";

const Home = () => {
  //form binding
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vechiclePanel, setVechiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [confrimRiderPanel, setConfirmRiderPanel] = useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const confirmeRiderPanelRef = useRef(null);

  const handleSumbit = (e) => {
    e.preventDefault();
  };
  const handleDestination = (e) => {
    setDestination(e.target.value);
  };
  const handlePickup = (e) => {
    setPickUp(e.target.value);
  };

  //   for animation
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70vh",
          opacity: 1,
          padding: 24,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0",
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );
  useGSAP(
    function () {
      if (vechiclePanel) {
        gsap.to(vehiclePanelRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(vehiclePanelRef.current, { transform: "translateY(100%)" });
      }
    },
    [vechiclePanel]
  );
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmedRidePanelRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );
  useGSAP(
    function () {
      if (confirmeRiderPanelRef) {
        gsap.to(confirmeRiderPanelRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(confirmeRiderPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmeRiderPanelRef]
  );

  return (
    <>
      <div className="h-screen relative">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png"
          alt="uber logo"
          className="w-16 absolute left-5 top-5"
        />
        <div
          className="h-screen w-screen"
          onClick={() => setVechiclePanel(false)}
        >
          <img
            className="w-full h-full"
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
        <div className="bg-white absolute bottom-0 w-full flex flex-col justify-end">
          <div className="h-[30vh]  p-5 bg-white relative">
            <h5
              className="absolute top-7 right-7 text-2xl "
              onClick={() => {
                setPanelOpen(false);
              }}
            >
              {panelOpen ? <RiArrowDownWideLine /> : <RiArrowUpWideLine />}
            </h5>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form onSubmit={handleSumbit}>
              <div className="line top-[45%] left-10 absolute bg-gray-900 rounded-full h-16 w-[2px] mt-2"></div>
              <input
                type="text"
                name="pickup"
                id=""
                placeholder="Add a pickup location"
                className="bg-[#eee] px-12 py-3 text-base rounded-lg w-full mt-6"
                onChange={handlePickup}
                onClick={() => {
                  setPanelOpen(!panelOpen);
                }}
                value={pickUp}
              />
              <input
                type="text"
                name="destination"
                onClick={() => {
                  setPanelOpen(true);
                }}
                id=""
                placeholder="Add your destination"
                className="bg-[#eee] px-12 py-3 text-base rounded-lg w-full mt-5"
                value={destination}
                onChange={handleDestination}
              />
            </form>
          </div>
          <div
            ref={panelRef}
            className={`h-0 opacity-0 bg-white w-full p-5 ${
              panelOpen ? "h-[70vh] opacity-1 p-5" : ""
            }`}
          >
            <LocationSearchPanel
              setVehiclePanel={setVechiclePanel}
              setPanelOpen={setPanelOpen}
            />
          </div>
          <hr />
          <div>
            {vechiclePanel && (
              <IsLocationAvailable
                ref={vehiclePanelRef}
                onClose={() => setVechiclePanel(false)}
                setConfirmRidePanel={setConfirmRidePanel}
              />
            )}
          </div>
        </div>
        <div>
          {confirmRidePanel && (
            <ConfirmedRide
              ref={confirmedRidePanelRef}
              onClose={() => setConfirmRidePanel(false)}
              setConfirmRiderPanel = {setConfirmRiderPanel}
            />
          )}
        </div>

        <div>
          {confrimRiderPanel && (
            <LookingForADriver
              ref={confirmeRiderPanelRef}
              onClose={() => setConfirmRiderPanel(false)}
            />
          )}
        </div>

        
      </div>
      {/* <h1>user - uber clone</h1> */}
    </>
  );
};
export default Home;
