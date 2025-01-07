import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast for error handling

const UserLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/user-login');
      }
    } catch (error) {
      console.log(error);
      toast.error('Cannot Logout at the moment');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserLogout;
