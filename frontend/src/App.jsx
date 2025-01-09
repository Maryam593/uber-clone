import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserSignUp from './Pages/UserSignUp'
import UserLogin from './Pages/UserLogin'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignUp from './Pages/CaptainSignUp'
import { ToastContainer } from 'react-toastify'
import Start from './Pages/Start'
import Home from './Pages/Home'
import UserProtectedWrapper from './Pages/UserProtectedWrapper'
import UserLogout from './Pages/UserLogout'
import CaptainHome from './Pages/CaptainHome'
import CaptainLogout from './Pages/CaptainLogout'

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
      {/* use kebab case while setting routes */}
      <Route path='/' element={<Start/>}/>
      <Route path = "/Home" element = {<UserProtectedWrapper>
        <Home/>
      </UserProtectedWrapper>}/>
      <Route path = "/captain-home" element={<CaptainHome/>}/>
      <Route path = '/user-signup' element={<UserSignUp/>}/>
      <Route path='/user-login' element={<UserLogin/>}/>
      <Route path='/captain-signup' element = {<CaptainSignUp/>} />
      <Route path='/captain-login' element = {<CaptainLogin/>}/>
      <Route path='/user/logout' element={<UserProtectedWrapper>
        <UserLogout/>
      </UserProtectedWrapper>}/>
      <Route path = "/captain/logout" element = {<CaptainLogout/>}/>
    </Routes>
    </>
  )
}

export default App
