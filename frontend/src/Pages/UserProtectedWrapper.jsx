import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
      return; 
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/user-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setUser(data.user);
          setIsLoading(false); 
          toast.success("Authenticated Successfully", { autoClose: 1000 });
        }
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("token");
        toast.error("Please Try Again", { autoClose: 1000 });
        navigate("/user-login"); 
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading ....</div>;
  }
  return(
    <>
    <div>{children}</div>
    </>
  )

};

export default UserProtectedWrapper;
