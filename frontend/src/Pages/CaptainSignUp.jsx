import React, { useContext } from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [captainData, setCaptainData] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
   const CaptainData = {
      FullName: { firstName: firstName, lastName: lastName },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        vehicle_Type: vehicleType,
        capacity: vehicleCapacity,
      },
    };
   
    try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/registerCaptain`, CaptainData)
    if(response.status === 200)
    {
      const data = response.data;
      setCaptain(data.captain)
      localStorage.setItem('token', data.Data);
      toast.success("Register Successfully", {
        autoClose: 1000
      })
      navigate('/captain-home')
    }
    } catch (error) {
      console.log(error)
      toast.error('cannot signup')
    }
    finally{
      setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleType('')
    setVehicleCapacity('')
    }
  };
  
  return (
    <>
      <div className="h-screen p-7 flex justify-between flex-col">
        {/* logo */}
        <div>
          <img
            className="w-16 mb-4"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="uber captain logo"
          />
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* first name */}
            <h3 className="text-lg mb-2 font-medium">Whats your name?</h3>
            <div className="flex gap-2 mb-2">
              <input
                value={firstName}
                type="text"
                name="name"
                id="name"
                required
                placeholder="e.g. John"
                className="px-4 py-2 border rounded-[4px] bg-[#eeeeee] text-lg placeholder:text-base w-1/2"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              {/* last name */}
              <input
                value={lastName}
                type="text"
                name="name"
                id="name"
                placeholder="e.g. Doe"
                className="px-4 py-2 border rounded-[4px] bg-[#eeeeee]  text-lg placeholder:text-base w-1/2"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            {/* email */}
            <h3 className="text-lg mb-2 font-medium">
              Whats your email address?
            </h3>
            <input
              value={email}
              type="email"
              name="email"
              id="email"
              required
              placeholder="e.g. abc@gmail.com"
              className="px-4 py-2 mb-2 border rounded-[4px] bg-[#eeeeee] w-full text-lg placeholder:text-base"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {/* password */}
            <h3 className="text-lg mb-2 font-medium">Password</h3>
            <input
              value={password}
              type={isVisible ? "text" : "password"}
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              pattern="[a-zA-Z0-9]{0,9}" //setting up the pattern
              placeholder="password"
              className="px-4 py-2 border rounded-[4px] bg-[#eeeeee] w-full text-lg placeholder:text-base mb-4"
            />
            {/* for eye visiblity  */}
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-10 top-[340px]"
            >
              {isVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {/* vehicle */}
            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="rickshaw">Rickshaw</option>
              <option value="bike">Bike</option>
            </select>
          </div>
            {/* status */}
            {/* <h3 className="text-lg mb-2 font-medium">Your Status?</h3>
            <div><input type="radio" name="active" id="active" />Active
            <input type="radio" name="inactive" id="inactive" />In Active</div> */}
            <button
              type="submit"
              className="px-4 py-2 rounded-[4px] bg-[#0c0c0c] text-white w-full text-lg placeholder:text-semibold mb-2"
            >
              Create an Account
            </button>
          </form>
          <p className="mb-3 text-center">
            Already a member?{" "}
            <Link className="text-blue-600" to="/captain-login">
              Login Here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[12px] text-gray-500 leading-tight">
            This site is protected by reCAPTCHA and the Google{" "}
            <span className="text-gray-900 underline">Privacy Policy</span> and{" "}
            <span className="text-gray-900 underline">Terms of Service</span>{" "}
            apply
          </p>
        </div>
      </div>
    </>
  );
};

export default CaptainSignUp;
