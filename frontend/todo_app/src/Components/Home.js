import React, { useEffect, useState } from 'react'
import { getAllTodos, getTodoById, updateTodo } from '../Api';
import Edit from './Edit';
import { Link } from 'react-router-dom';
import Todos from './Todos';

function Home() {

    return (
        <div className='h-screen w-full flex flex-col items-center justify-center'>

            
            <div className='text-9xl w-1/2 text-center font-bold border-b-2 m-4 border-gray-400'> todo. </div>
                
            </div>
    )
}

export default Home