import React from "react";
import { Link } from "react-router-dom";
const Start = () => {
    return (
        <>
        <div>
            <div className="bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1380,w_1104/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png)] bg-cover bg-center h-screen w-full pt-8 flex justify-between flex-col bg-red-400">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png" alt="uber logo" className="w-14 ml-8"/>
                <div className="bg-white py-4 pb-7 px-4">
                    <h2 className="text-3xl font-bold text-center">Get Started with Uber</h2>
                    <Link to = '/user-login'className="flex justify-center items-center bg-black text-white rounded-[6px] mt-5 py-3 font-semibold">Continue</Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default Start