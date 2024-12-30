import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const UserLogin = () => {
  // for 2 way data binding 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  //for setting userData
  const [userData, setUserData] = useState({})
  const handleSumbit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }
    setEmail('');
    setPassword('')
    setUserData({email:email, password:password})
    console.log(userData)
  }
  //rememberme
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(()=> {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password')
    const isRememberMe = localStorage.getItem('rememberMe') === 'true';

    if(isRememberMe)
    {setEmail(storedEmail)
      setPassword(storedPassword)
    }
  },[])
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
          <form onSubmit={(e)=>handleSumbit(e)}>
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
              className="px-4 py-2 mb-5 border rounded-[4px] bg-[#eeeeee] w-full text-lg placeholder:text-base"
              onChange={(e)=> {
                setEmail(e.target.value)
              }}
            />
            <h3 className="text-lg mb-2 font-medium">Password</h3>
            <input
            value={password}
              type="password"
              name="password"
              id="password"
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              required
              pattern="[a-zA-Z0-9]{0,9}" //setting up the pattern
              placeholder="password"
              className="px-4 py-2 border rounded-[4px] bg-[#eeeeee] w-full text-lg placeholder:text-base mb-5"
            />

            <label htmlFor="rememberme" className="flex gap-1 mb-2 w-full">
              <input type="checkbox" name="rememberme" id="rememberme" checked={rememberMe} onChange={()=>{setRememberMe(!rememberMe)}}/>
              Remember Me
            </label>
            <button
              type="submit"
              className="px-4 py-2 rounded-[4px] bg-[#0c0c0c] text-white w-full text-lg placeholder:text-semibold mb-5"
            >
              Login
            </button>
          </form>
          <p className="mb-3 text-center">New Here? <Link to='/user-signup' className="text-blue-600" >Create an Account</Link></p>
           {/* seprator */}
         <div className="seprator flex items-center">
            <hr className="flex-grow bg-gray-400"/>
            <span className="text-gray-600 m-2">or</span>
            <hr className="flex-grow bg-gray-400"/>
          </div>
        </div>
        
        <div>
          {/* <Link to="/user-signup">Create Account?</Link> */}
         
          <Link to ="/captain-login"
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
