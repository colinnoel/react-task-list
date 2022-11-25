import React, {useState, useRef, useEffect} from 'react';
import TodoList from './Todolist';
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)

  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

//^ useEffect allows us to save the state of our app locally

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
//^ This allows us to toggle our todos 
//  from complete to incomplete and vice versa.


  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuidv4(),name:name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref= {todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Task</button>
    <button onClick={handleClearTodos}>Clear Completed Tasks</button>
    <div>{todos.filter(todo => !todo.complete).length} remaining tasks</div>
    </>
  )

}

export default App;
