import React, { useState, useEffect } from 'react';
import { deleteTodo, getTodoById, updateTodo } from '../Api';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Edit() {
    const { todoId } = useParams();
    const [todo, setTodo] = useState({});
    const [completed, setCompleted] = useState(todo['completed']);
    const [isDirty, setIsDirty] = useState(false);
    const [updates, setUpdates] = useState({
                                        'title':'',
                                        'description':'',
                                        'completed':false
                                    })

    const navigate = useNavigate()

    useEffect(() => {
        getTodoById(todoId)
            .then((res) => {
            setTodo(res);
            setUpdates({
                'title':res['title'],
                'description':res['description'],
                'completed':res['completed']
            });
            setCompleted(res['completed'])
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updates[e.target.id] = value;
        setIsDirty(true);
    };

    function handleSubmit() {
        updateTodo(todo['_id'], updates);
        navigate('/todos')
        
    }

    function toggleCompleted() {
        setIsDirty(true);
        updates['completed'] = !completed;
        setCompleted(!completed);
        console.log(updates);
    }

    async function handleDelete() {
        await deleteTodo(todo['_id'])
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
                            defaultValue={todo['title']}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='mb-1 flex-grow flex flex-col'>
                        <div className='text-sm p-1'> Description </div>
                        <textarea
                            id='description'
                            className='rounded border-2 p-2 flex-grow overflow-y-scroll custom-scrollbar'
                            defaultValue={todo['description']}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='p-1 text-sm flex font-bold tracking-wide'>
                        <span className=''>
                            Status: {completed ? <span className='text-green-800'>Completed</span> : <span className='text-yellow-800'>To-do</span>}
                        </span>

                        <span className='ml-auto hover:cursor-pointer' onClick={() => toggleCompleted()}>
                            {completed ? <span className='text-yellow-800 hover:text-yellow-950'>Mark to-do</span> : <span className='text-green-800 hover:text-green-950'>Mark complete</span>}
                        </span>
                    </div>

                    <div className='mb-1 text-xs p-1 flex'>
                        <span className='w-1/2 pr-4'> <b>Date created:</b> {todo['create_date']} </span>
                        <span className='w-1/2 pl-4'> <b>Last updated:</b> {todo['last_updated']}</span>
                    </div>

                    <div className='flex items-center'>
                        <div className='px-3 text-red-800 hover:text-red-950 hover:cursor-pointer' onClick={() => handleDelete()}> Delete </div>
                        <div className='ml-auto'>
                            <Link to={'/todos'} className='px-3 text-blue-800 hover:text-blue-950 hover:underline'>
                                Cancel
                            </Link>
                            <input
                                type='submit'
                                value={'Save changes'}
                                onClick={() => handleSubmit()}
                                disabled={!isDirty}
                                className={isDirty ? 'bg-yellow-500 p-2 rounded-lg hover:cursor-pointer hover:shadow-md' : 'bg-yellow-500 p-2 rounded-lg opacity-50 cursor-not-allowed'}
                            />
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Edit;
