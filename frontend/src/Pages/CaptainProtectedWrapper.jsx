import React, { useContext, useEffect}from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";

const CaptainProtectedWrapper = ({children}) => {
   const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const {captain, setCaptain} = useContext(CaptainDataContext)
    const {isLoading, setIsLoading} = useContext(true)
    useEffect(()=> {
        if(!token)
        {navigate('/captain-login')}
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