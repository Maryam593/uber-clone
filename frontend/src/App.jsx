import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import UserSignUp from './Pages/UserSignUp'
import UserLogin from './Pages/UserLogin'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainSignUp from './Pages/CaptainSignUp'

const App = () => {
  return (
    <Routes>
      {/* use kebab case while setting routes */}
      <Route path='/' element={<HomePage/>}/>
      <Route path = '/user-signup' element={<UserSignUp/>}/>
      <Route path='/user-login' element={<UserLogin/>}/>
      <Route path='/captain-signup' element = {<CaptainSignUp/>} />
      <Route path='/captain-login' element = {<CaptainLogin/>}/>
    </Routes>
  )
}

export default App
