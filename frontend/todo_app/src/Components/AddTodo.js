import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { addNewTodo } from '../Api';

function AddTodo() {
    const [isDirty, setIsDirty] = useState(false);
    const [newTodo, setNewTodo] = useState({
                                    'title':'',
                                    'description':''
                                }) 
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        newTodo[e.target.id] = value;
        if(e.target.id == 'title') {
            setIsDirty(true);
        }
    };

    const navigate = useNavigate()

    function handleSubmit() {
        addNewTodo(newTodo);
        navigate('/todos')
    }

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
            <div className='text-9xl w-1/2 text-center font-bold border-b-2 m-4 border-gray-400'> todo. </div>
            <div className='h-1/2 w-1/2 overflow-y-scroll custom-scrollbar'>
                <form className='h-full w-full p-2 flex flex-col'>
                    <div className='mb-1'>
                        <div className='text-sm p-1'> Title </div>
                        <input
                            id='title'
                            className='w-full bg-transparent border-2 rounded p-2'
                            type='text'
                            onChange={handleChange}
                            required aria-required="true"
                        />
                    </div>

                    <div className='mb-1 flex-grow flex flex-col'>
                        <div className='text-sm p-1'> Description </div>
                        <textarea
                            id='description'
                            className='rounded border-2 p-2 flex-grow overflow-y-scroll custom-scrollbar'
                            onChange={handleChange}
                        />
                    </div>

                    <div className='text-right'>
                        <Link to={'/todos'} className='px-3 text-blue-800 hover:text-blue-950 hover:underline'>
                            Cancel
                        </Link>
                        <input
                            type='submit'
                            value={'Add'}
                            onClick={() => handleSubmit()}
                            disabled={!isDirty}
                            className={isDirty ? 'bg-green-700 p-2 px-4 rounded-lg hover:cursor-pointer hover:shadow-md' : 'bg-green-700 p-2 px-4 rounded-lg opacity-50 cursor-not-allowed'}
                        />
                    </div>
                </form>
            </div>
        </div>
  )
}

export default AddTodo