import React, { useState } from "react"
import axios from "axios"
export const UserContext = React.createContext()


export default function UserProvider(props){
  const initState = { user: {}, token: "", todos: []}

  const [userState, setUserState] = useState(initState)

  //signup fx, we need the credentials as an argument -props-
  function signup(credentials){
    axios.post("/auth/signup", credentials)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup
      }}
    >
      {props.children}
    </UserContext.Provider>
  )

}
