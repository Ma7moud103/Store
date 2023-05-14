import { configureStore, createSlice } from "@reduxjs/toolkit";

export let store = configureStore({
    reducer: {
        counterSlice
    }
})

let initialState = {
    count:0
}

let counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count+=1
        },
        decrement: (state) => {
            state.count-=1
        }
    }
}) 