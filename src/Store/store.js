import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "../Slice/todoReducer"

const store = configureStore({
    reducer: todoReducer
})

export default store