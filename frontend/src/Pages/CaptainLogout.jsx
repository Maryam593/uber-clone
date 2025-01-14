import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CaptainLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in first.");
        navigate("/captain-home");
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/LogOutAsCaptain`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.message || "Cannot logout at the moment");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default CaptainLogout;
