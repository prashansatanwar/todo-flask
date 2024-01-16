import React, { useEffect, useState } from 'react'
import { deleteTodo, getAllTodos, getTodoById, updateTodo } from '../Api';
import Edit from './Edit';
import { Link } from 'react-router-dom';

function Todos({setTodoId}) {
	const [data, setData] = useState([]);

    useEffect(() => {
        getAllTodos()
            .then((res) => {
                setData(res);
			})
	}, [data]);


    async function handleCompleted(todoId, checkedValue) {
        await updateTodo(todoId,{'completed':!checkedValue});
        
    }

    function handleEdit(todoId) {
        setTodoId(todoId)

    }

    async function handleDelete(todoId) {
        await deleteTodo(todoId)
    }

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
            <div className='text-9xl w-1/2 text-center font-bold border-b-2 m-4 border-gray-400'> todo. </div> 
                <div className='h-1/2 w-1/2 overflow-y-scroll custom-scrollbar'>

                    <Link to={'/addTodo'} 
                        className='p-2 m-2 flex border-2 rounded-lg border-gray-400 italic text-sm h-12 text-gray-400
                                    hover:shadow-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                        <span className='flex justify-center items-center'>
                            Add new Todo...
                        </span>
                    </Link>

                    
                    {
                        data.map((row) => 
                            <div key={row._id} className='p-2 m-2 flex border-2 rounded-lg border-gray-400'>

                                <span className='px-1'> <input className='hover:cursor-pointer' type="checkbox" defaultChecked={row.completed}  onChange={() => handleCompleted(row._id, row.completed)}/>  </span>
                                <span className={`px-1 w-full  ${row.completed? 'line-through':''}`}> {row.title} </span>
                                
                                <span className='ml-auto p-1 flex items-center justify-center hover:cursor-pointer'>
                                    {/* edit button */}
                                    <Link to={'/todos/'+row._id} className='px-2 block group'
                                        onClick={() => handleEdit(row._id)}>
                                        <span className='block group-hover:hidden'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                        </span>
                                        <span className='hidden group-hover:block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                                            </svg>
                                        </span>
                                    </Link>
                                    {/* delete button */}
                                    <span className='px-2 block group' onClick={() => handleDelete(row._id)}>
                                        <span className='block group-hover:hidden'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                            </svg>
                                        </span>
                                        <span className='hidden group-hover:block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg>
                                        </span>
                                    </span>
                                </span>
                            </div>
                        )
                    }

                </div>
    </div>
  )
}

export default Todos