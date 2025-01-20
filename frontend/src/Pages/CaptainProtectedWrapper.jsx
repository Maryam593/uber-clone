import React, { useContext, useEffect, useState}from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CaptainProtectedWrapper = ({children}) => {
   const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const {captain, setCaptain} = useContext(CaptainDataContext)
    const [isLoading, setIsLoading]= useState(true)
    useEffect(()=> {
        if(!token)
        {navigate('/captain-login')}
        axios.get(`${import.meta.env.VITE_BASE_URL}/CaptainProfile`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=> {
           try{
            if(response.status === 200)
            {const data = response.data
            setCaptain(data.captain)
            setIsLoading(false)
            toast.success("Captain Authenticated Successfully", {autoClose:1000})

            }
           }
        catch(error){
            localStorage.removeItem('token')
            toast.error("Cannot Authenticate at the moment, Please Try Again",{autoClose:1000})
            navigate('/captain-login')
        }
        })
    },[token])
    
    if(isLoading)
    {
        return (<><div>Loading ....</div></>)
    }
    return (
        <>
        <div>{children}</div>
        </>
    )
}

export default CaptainProtectedWrapper;