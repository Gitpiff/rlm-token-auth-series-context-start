import React, { useState } from 'react'

const initInputs = {
  title: "",
  description: "",
  imgUrl: ""
}

export default function TodoForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addTodo } = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addTodo(inputs) //sets the inputs -title, desc, img- to the new values
    setInputs(initInputs) //returns the form to its initial state after adding the todo
  }

  const { title, description, imgUrl } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title"/>
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Description"/>
      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={handleChange}
        placeholder="Image Url"/>
      <button>Add Todo</button>
    </form>
  )
}
