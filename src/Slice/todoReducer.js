import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        // { id: 1, text: 'Hello', complated: false,priority:1 }
    ],
    addInput: { value: '', status: true, id: '1', priority: '' },
    theme: 'dark',
    color: { value: '', id: '' }
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload.value,
                complated: false,
                priority: action.payload.priority === '' ? 0 : action.payload.priority,
                color: '#27272A'
            }
            state.todos.push(todo);
            state.todos = state.todos.sort(function (a, b) {
                var keyA = a.priority;
                var keyB = b.priority;
                if (keyA > keyB) return 1;
                if (keyA < keyB) return -1;
                return 0;
            });
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
        },
        restoreState: (state, action) => {
            state.todos = action.payload?.map((item) => ({ id: item.id, text: item.text, complated: item.complated, priority: item.priority, color: item.color }));
        },
        complitedStatus: (state, action) => {
            state.todos = state.todos.map((item) => item.id === action.payload.id ? { ...item, complated: !item.complated } : item);
        },
        updateTodo: (state, action) => {
            state.addInput = { value: action.payload.text, status: false, id: action.payload.id, priority: action.payload.priority }
        },
        addInputsetInput: (state, action) => {
            state.addInput.value = action.payload;
        },
        prioritySetInput: (state, action) => {
            state.addInput.priority = action.payload;
        },
        finalUpdate: (state, action) => {
            state.todos = state.todos.map((item) => item.id === action.payload ? { ...item, text: state.addInput.value, priority: state.addInput.priority } : item);
            state.todos = state.todos.sort(function (a, b) {
                var keyA = a.priority;
                var keyB = b.priority;
                if (keyA > keyB) return 1;
                if (keyA < keyB) return -1;
                return 0;
            });
            state.addInput = { value: '', status: true, id: nanoid(), priority: '' };
        },
        changeTheme: (state, action) => {
            state.theme = action.payload;
        },
        loardColorState: (state, action) => {
            state.todos = state.todos.map((item) => item.id === action.payload.id ? { ...item, color: action.payload.value } : item)
        }
    }
});
export default todoSlice.reducer;
export const { addTodo, removeTodo, restoreState, complitedStatus, updateTodo, addInputsetInput, finalUpdate, prioritySetInput, changeTheme, loardColorState } = todoSlice.actions 