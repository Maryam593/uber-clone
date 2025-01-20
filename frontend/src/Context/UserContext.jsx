import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()
const UserContext = ({children}) => {
    const [user,setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const value = {
      user,setUser,isLoading,setIsLoading, error, setError
    }
    if(isLoading)
    {
      return<>Loading...</>
    }
  return (
    <div>
      {/* <h1>User Context</h1> */}
      <UserDataContext.Provider value={value}>
      {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
