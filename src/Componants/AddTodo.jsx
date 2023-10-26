import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addInputsetInput, addTodo, finalUpdate, prioritySetInput, changeTheme } from '../Slice/todoReducer';
function AddTodo() {
    const dispatch = useDispatch();
    const input = useSelector(state => state.addInput);
    const formButtonType = useSelector(state => state.addInput.status);
    const updateTodoId = useSelector(state => state.addInput.id);
    const theme = useSelector(state => state.theme);
    const addTodoHandler = (e) => {
        e.preventDefault();
        if (formButtonType) {
            if (input.value.trim().length > 0) {
                dispatch(addTodo(input));
                dispatch(addInputsetInput(''));
                dispatch(prioritySetInput(''));
            }
            else {
                alert('Enter somthing text...');
            }
        }
        else {
            dispatch(finalUpdate(updateTodoId));
            dispatch(addInputsetInput(''));
        }
    };
    const onChangeBtn = () => {
        if (theme === 'dark') {
            dispatch(changeTheme('light'));
        }
        else {
            dispatch(changeTheme('dark'));
        }
    };
    return (
        <>
            <div className='flex flex-row-reverse'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onChange={onChangeBtn}
                        checked={theme === "dark"}
                    />
                    <div className="w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:border-white"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">Dark Theme</span>
                </label>
            </div>
            <form onSubmit={addTodoHandler} className="space-x-3 mt-12 max-sm:mt-5">
                <input
                    type="text"
                    className="w-[400px] max-sm:w-[100%] max-sm:my-5 !max-sm:m-0 bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter a Todo..."
                    value={input.value}
                    onChange={(e) => dispatch(addInputsetInput(e.target.value))}
                />
                <input
                    type="number"
                    className="w-[400px] max-sm:w-[100%]  max-sm:!ml-0 mb-2 bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter a Priority..."
                    value={input.priority}
                    onChange={(e) => dispatch(prioritySetInput(e.target.value))}
                />
                <button
                    type="submit"
                    className="text-white max-sm:w-[100%] max-sm:!m-0 bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg w-[130px]"
                >
                    {formButtonType ? 'Add Todo' : 'Save'}
                </button>
            </form>

        </>
    )
}

export default AddTodo