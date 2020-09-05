import React, { useState, useEffect, useCallback } from 'react'
import Header from './components/layout/Header'

import './style.css'


export default function App() {
	const storedTodos = JSON.parse(localStorage.getItem('todo'))

	// Todos that already exist
	const [todos, setTodos] = useState(storedTodos || [])

	// Todos to be created
	const [newTodo, setNewTodo] = useState('')


	const onNewTodoChange = useCallback((event) => {
		setNewTodo(event.target.value)
	},[])

	const addTodo = useCallback((event) => {
		event.preventDefault()

		if(!newTodo.trim()) return

		setTodos([{title: newTodo, done: false}, ...todos])
			
		// Clear the input
    	setNewTodo('')
	}, [newTodo, todos])

	const removeTodo = useCallback((index) => {
		// Make a copy of todos
		const newTodos = [...todos]
		newTodos.splice(index, 1)
		setTodos(newTodos)
	}, [todos])

	const checkTodo = useCallback((todo, index) => {
		// Make a copy of todos
		const newTodos = [...todos]
		newTodos.splice(index, 1, {...todo, done: !todo.done})
		setTodos(newTodos)
	}, [todos])

	// Updates the localStorage every time the array 'todos' change
	useEffect(() => {
    	localStorage.setItem('todo', JSON.stringify(todos));
  	}, [todos]);

	return (
	 <div className="container">
		<Header />

		<div className="form-container">

	      <form onSubmit={addTodo}>
	          <input 
	            value={newTodo}
	            onChange={onNewTodoChange}
	            id="newTodo"
	            name="newTodo"
	            placeholder="Enter a new Todo..."
	            className="todoTextInput"
	          />

	        <button className="addBtn">Add Todo</button>
	      </form>

	    </div>

	    <div className="todoList">
	    	<ul>
	      		{ todos.map((todo, index) => (
	      			<li key={index} className="item-list">
	      				<input type="checkbox" checked={todo.done} onChange={() => checkTodo(todo, index)}></input>

	      				<span className={todo.done ? 'done' : ''}> {todo.title}</span>

	      				<button onClick={() => removeTodo(index)} className="deleteBtn">X</button>
	      			</li>
	      		)) }
	      </ul>
	    </div>
	    
	 </div>

	)

}
