import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Eye icons from react-icons
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  // for 2-way data binding
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // visibility state
  const [isVisible, setIsVisible] = useState(false);
  
  // for setting userData
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const userData = {
      Email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/Signin`, userData);
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.data);
        toast.success("Login Successfully", { autoClose: 1000 });
        navigate("/Home");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setEmail('');
      setPassword('');
    }

    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }
  };

  // Remember me functionality
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const isRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (isRememberMe) {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  return (
    <>
      <div className="h-screen p-7 flex justify-between flex-col">
        {/* logo */}
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png"
            alt="uber logo"
            className="w-16 mb-10"
          />
          <form onSubmit={(e) => handleSumbit(e)}>
            <h3 className="text-lg mb-2 font-medium">What's your email address?</h3>
            <input
              value={email}
              type="email"
              name="email"
              id="email"
              required
              placeholder="e.g. abc@gmail.com"
              className="px-4 py-2 mb-5 border rounded-[4px] bg-[#eeeeee] w-full text-lg placeholder:text-base"
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className="text-lg mb-2 font-medium">Password</h3>
            <div className="relative">
              <input
                value={password}
                type={isVisible ? "text" : "password"}
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern="[a-zA-Z0-9]{0,9}" // setting up the pattern
                placeholder="password"
                className="px-4 py-2 border rounded-[4px] bg-[#eeeeee] w-full text-lg placeholder:text-base mb-5"
              />
              {/* Eye icon for toggling visibility */}
              <button
                type="button"
                className="absolute right-3 top-3 text-xl"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            <label htmlFor="rememberme" className="flex gap-1 mb-2 w-full">
              <input
                type="checkbox"
                name="rememberme"
                id="rememberme"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <button
              type="submit"
              className="px-4 py-2 rounded-[4px] bg-[#0c0c0c] text-white w-full text-lg placeholder:text-semibold mb-5"
            >
              Login
            </button>
          </form>
          <p className="mb-3 text-center">
            New Here? <Link to='/user-signup' className="text-blue-600">Create an Account</Link>
          </p>

          {/* separator */}
          <div className="seprator flex items-center">
            <hr className="flex-grow bg-gray-400" />
            <span className="text-gray-600 m-2">or</span>
            <hr className="flex-grow bg-gray-400" />
          </div>
        </div>

        <div>
          <Link
            to="/captain-login"
            className="px-4 flex py-2 items-center justify-center rounded-[4px] bg-[#bc393e] text-white w-full text-lg placeholder:text-semibold mb-5"
          >
            Sign In As Captain
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
