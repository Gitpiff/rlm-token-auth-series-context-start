import React, { useState } from "react"
export const UserContext = React.createContext()


export default function UserProvider(props){
  const initState = { user: {}, token: ""}

  const [userState, setUserState] = useState(initState)
  return (
    <UserContext.Provider
      value={{
        ...userState
      }}
    >
      {props.children}
    </UserContext.Provider>
  )

}
