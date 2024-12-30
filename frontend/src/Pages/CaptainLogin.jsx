import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const CaptainLogin = () => {
  // for 2 way data binding 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  //for setting userData
  const [captainData, setCaptainData] = useState({})
  const handleSumbit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
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
    setCaptainData({email:email, password:password})
    console.log(captainData)
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
          <img  className='w-20 mb-3'
         src="https://www.svgrepo.com/show/505031/uber-driver.svg" 
            alt="uber captain logo"
            
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
          <p className="mb-3 text-center">Want to join a fleet? <Link className="text-blue-600" to="/captain-signup">Register as Captain</Link></p>
           {/* seprator */}
         <div className="seprator flex items-center">
            <hr className="flex-grow bg-gray-400"/>
            <span className="text-gray-600 m-2">or</span>
            <hr className="flex-grow bg-gray-400"/>
          </div>
        </div>
        
        <div>
          {/* <Link to="/user-signup">Create Account?</Link> */}
         
          <Link to ="/user-login"
            className="px-4 flex py-2 items-center justify-center rounded-[4px] bg-[#7c6339] text-white w-full text-lg placeholder:text-semibold mb-5"
          >
            Sign In As User
          </Link>
        </div>
      </div>
    </>
  );
};

export default CaptainLogin;
