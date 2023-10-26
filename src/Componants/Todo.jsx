import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { complitedStatus, loardColorState, removeTodo, updateTodo } from '../Slice/todoReducer';

function Todo() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    return (
        <>
            <div className='p-1 text-xl max-sm:mt-[25px]'>Todos</div>
            <ul className="list-none">
                {todos.length !== 0 ? todos.map((todo) => (
                    <li
                        className={`mt-4 flex max-sm:flex-col justify-between items-center  px-6 py-2 max-sm:px-2 max-sm:py-2 rounded  m-auto w-[80%] max-lg:w-[100%] ${todo.complated ? 'opacity-20' : ''}`}
                        style={{ backgroundColor: todo.color }}
                        key={todo.id} onClick={() => {
                            dispatch(complitedStatus(todo))
                        }}
                    >

                        <div className='flex justify-between items-center w-full mr-3'>
                            <input type='text' style={{ backgroundColor: todo.color }} className='text-white  max-sm:py-3 max-sm:w-[100%] outline-none max-sm:px-1' value={todo.text} readOnly />
                            <input className="w-[32px] h-[32px]" type="color" value={todo.color} onClick={(e) => { e.stopPropagation() }} onChange={(e) => { dispatch(loardColorState({ id: todo.id, value: e.target.value })) }} disabled={todo.complated === true} />
                        </div>
                        <div className='xl:w-[30%] lg:w-[35%] md:w-[50%] sm:w-[55%] max-sm:w-[100%] flex items-center justify-evenly'>
                            <button
                                onClick={(e) => { e.stopPropagation(); dispatch(removeTodo(todo)) }}
                                className="text-white bg-red-500 border-0 py-1 px-4 mx-1 focus:outline-none hover:bg-red-600 rounded text-md "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                            <button className='text-white bg-indigo-500 border-0 mx-1 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg w-[170px] max-sm:w-[120px] max-sm:text-sm max-sm:px-0'>{todo.complated ? 'complated' : 'Not complated'}</button>
                            <button className='text-white bg-indigo-500 border-0 mx-1 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg w-[80px] max-sm:text-sm max-sm:px-0
                            ' onClick={(e) => { e.stopPropagation(); dispatch(updateTodo(todo)) }} disabled={todo.complated}>Edit</button>
                        </div>
                    </li>
                )) : <div className='text-2xl h-[20vh] w-full flex justify-center items-center'>No item add yet...</div>}
            </ul >
        </>
    )
}

export default Todo