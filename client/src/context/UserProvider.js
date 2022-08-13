import React, { useState } from "react"
import axios from "axios"
export const UserContext = React.createContext()

//creates a new version of axios that we can configurate to our own needs
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})


export default function UserProvider(props){
  const initState = {
     //before setting the user to an empty object, let's check if the user already exists in the local Storage, since we stringify it we need to parse it back to an object, if it's not found in local storage, then we can set it as an empty object
    user: JSON.parse(localStorage.getItem("user")) || {},
    //before setting the token to an empty string, let's check if the token already exists in the local Storage, otherwise set it as an empty string
    token: localStorage.getItem("token") || "",
    todos: [],
    errMsg: ""
  }

  const [userState, setUserState] = useState(initState)

  //signup fx, we need the credentials as an argument -props-
  function signup(credentials){
    axios.post("/auth/signup", credentials)
    .then(res => {
      const { user, token } = res.data //gets user and token from response
      //saves user and token into local storage so when we refresh the page we don't lose state, when storing complex data type like objects or arrays we need to turn them into JSON strings
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUserState(prevUserState => ({
        ...prevUserState,
        user,
        token
      }))
    })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function login(credentials){
    axios.post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data //gets user and token from response
        //saves user and token into local storage so when we refresh the page we don't lose state, when storing complex data type like objects or arrays we need to turn them into JSON strings
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserTodos() //gets the user todos immediately after login in
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      todos: []
    })
  }

  //display error message in the front end
  function handleAuthErr(errMsg){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  //reset Auth Error, so it does not stay on the page all the time, once the error message gets displayed, it will stay there until the page gets refreshed, once that happens the message won't be there anymore
  function resetAuthErr(){
    setUserState(prevState => ({
      ...prevState,
      errMsg:""
    }))
  }

  //Get users Todos
  function getUserTodos(){
  //since it's an authenticated request we need to use User Axios
    userAxios.get("/api/todo/user")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          todos: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
}


  //Add todo
  function addTodo(newTodo){
    // we'll use an axios interceptor to look for authorization before trying to create a newTodo
    userAxios.post("/api/todo", newTodo)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          todos: [res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addTodo,
        resetAuthErr
      }}
    >
      {props.children}
    </UserContext.Provider>
  )

}
