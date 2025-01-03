import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import {UserDataContext} from "../Context/UserContext";
import {useContext} from 'react'


const UserSignUp = () => {
  // for 2 way data binding
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNumber] = useState("");
  //const [userData, setUserData] = useState({})
  const {user,setUser} = useContext(UserDataContext)
  const navigateUser = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      FullName: {
        firstName: firstName,
        lastName: lastName,
      },
      phoneNo: phoneNo,
      Email: email,
      password: password,
    };
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        toast.success("Register Successfully", { autoClose: 1000 });
        navigateUser("/home");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      // Clear form fields after API call
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
    }
  };
  
  return (
    <>
      <div className="h-screen p-7 flex justify-between flex-col">
        {/* logo */}
        <div>
          <img
            className="w-16 mb-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png"
            alt="uber logo"
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
            {/* phone number */}
            <h3 className="text-lg mb-2 font-medium">
              Whats your phone number?
            </h3>
            <input
              value={phoneNo}
              type="text"
              name="text"
              id="text"
              required
              placeholder="0XXXXXXXXXXX"
              className="px-4 py-2 mb-2 border rounded-[4px] bg-[#eeeeee] w-full 
              text-lg placeholder:text-base"
              onChange={(e) => {
                const input = e.target.value;
                // Sirf numbers allow karne ke liye
                if (/^\d+$/.test(input)) {
                  setPhoneNumber(input); // Agar sirf numbers ho to set karein
                } else {
                  toast.error("Numbers only");
                }
              }}
            />
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
              type="password"
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
            <button
              type="submit"
              className="px-4 py-2 rounded-[4px] bg-[#0c0c0c] text-white w-full text-lg placeholder:text-semibold mb-2"
            >
              Create an Account
            </button>
          </form>
          <p className="mb-3 text-center">Already have an account? <Link className="text-blue-600" to="/user-login">Login Here</Link></p>
        </div>
        <div>
       <p className="text-[12px] text-gray-500 leading-tight">This site is protected by reCAPTCHA and the Google <span className='text-gray-900 underline'>Privacy Policy</span> and <span className='text-gray-900 underline'>Terms of Service</span> apply</p>
       </div>
      </div>
      
    </>
  );
};

export default UserSignUp;
