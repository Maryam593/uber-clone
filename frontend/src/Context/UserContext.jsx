import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()
const UserContext = ({children}) => {
    const [user,setUser] = useState({
        Email:'',
        FullName : {
            firstName : '',
            lastName : ''
        }
    })
  return (
    <div>
      {/* <h1>User Context</h1> */}
      <UserDataContext.Provider value={{user,setUser}}>
      {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
