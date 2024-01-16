import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAllTodos } from './Api';
import Home from './Components/Home';
import Edit from './Components/Edit';
import Todos from './Components/Todos';
import AddTodo from './Components/AddTodo';

function App() {
	// const [data, setData] = useState([]);
	const [todoId, setTodoId] = useState(-1); 

	// useEffect(() => {
    //     console.log("todoId", todoId)

		
	// 	getAllTodos()
	// 		.then((res) => {
	// 			console.log(res)
	// 			setData(res);
	// 		})
	// }, []);

	return (
		<div className=''>
			<Routes>
				<Route exact path='/todos' element={<Todos setTodoId={setTodoId}/>}/>
				<Route exact path={'/todos/:todoId'} element={<Edit todoId={todoId}/>}/>
				<Route exact path='/addTodo' element={<AddTodo/>}/>
			</Routes>
		</div>
	);
}

export default App;