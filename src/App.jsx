import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import AddTodo from './Componants/AddTodo'
import Todo from './Componants/Todo'
import { useEffect } from 'react';
import { changeTheme, restoreState } from './Slice/todoReducer';

function App() {
  const todoState = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('todo'))
    dispatch(restoreState(items));
  }, []);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todoState));
  }, [todoState]);

  useEffect(() => {
    let storeTheme = JSON.parse(localStorage.getItem('theme'));
    if (storeTheme === 'default') {
      storeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    }
    dispatch(changeTheme(storeTheme));
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light');
    document.querySelector('html').classList.add(theme);
  }, [theme]);

  return (
    <>
      <div className='p-3  w-full h-full'>
        <AddTodo />
        <Todo />
      </div>
    </>
  )
}

export default App
