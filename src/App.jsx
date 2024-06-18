import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      const todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  const saveTodos = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const handleAdd = () => {
    if (todo.trim() === "") {
      alert("Todo cannot be empty!");
      return;
    }
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    setTodo("")
    saveTodos(newTodos)
  }


  const handleEdit = (id) => {
    const itemToEdit = todos.find(item => item.id === id)
    setTodo(itemToEdit.todo)
    handleDeleteById(id)
  }

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      const newTodos = todos.filter((_, i) => i !== index)
      setTodos(newTodos)
      saveTodos(newTodos)
    }
  }

  const handleDeleteById = (id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveTodos(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    const id = e.target.name
    const index = todos.findIndex(item => item.id === id)
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTodos(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="cover">
        <div className="main">
          <div>
            <h1 className='firsth'>iTask - Mange your Todos at one place.</h1>
            <h2 className='hclass'>Add a Todo</h2>
            <div className="template">
              <input onChange={handleChange} value={todo} type="text" className='box' />
              <button onClick={handleAdd} className='button'>Save</button>
            </div>
          </div>
          <h2 className='hclass'>Your Todos</h2>
          <div className="tem">
            {todos.length === 0 && <div> No topics to display. </div>}
            {todos.map((item, index) => (
              <div className="t1" key={item.id}>
                <div className="cc"><input name={item.id} onClick={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}>{item.todo}</div></div>
                <div className="bb"><button onClick={() => handleEdit(item.id)} className="button"><FaEdit /></button>
                  <button onClick={() => handleDelete(index)} className="button"><RiDeleteBin6Fill /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App

