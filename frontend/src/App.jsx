import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserSignUp from './Pages/UserSignUp'
import UserLogin from './Pages/UserLogin'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignUp from './Pages/CaptainSignUp'
import { ToastContainer } from 'react-toastify'
import Start from './Pages/Start'
import Home from './Pages/Home'

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
      {/* use kebab case while setting routes */}
      <Route path='/' element={<Start/>}/>
      <Route path = "/home" element = {<Home/>}/>
      <Route path = '/user-signup' element={<UserSignUp/>}/>
      <Route path='/user-login' element={<UserLogin/>}/>
      <Route path='/captain-signup' element = {<CaptainSignUp/>} />
      <Route path='/captain-login' element = {<CaptainLogin/>}/>
    </Routes>
    </>
  )
}

export default App
