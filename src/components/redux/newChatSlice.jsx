import {createSlice} from '@reduxjs/toolkit'
import Gemini from '../Chatbot'

const initialState = {
    chatCounter : 0,
    chatId:'',
    gemini: [],
    openrouter: [],

}

let chatCounterSlice = createSlice({
    name:'chatCounter',
    initialState,
    reducers:{
        increment: (state) => {
            state.chatCounter++
        },
        reNewChatID:(state,action)=>{
            state.chatId = action.payload
        },
        addMessage: (state, action) => {
            const { bot, message } = action.payload;
            state[bot].push(message);
        },
        replaceLastMessage: (state, action) => {
            const { bot, message } = action.payload;
            state[bot][state[bot].length - 1] = message;
        },
        clearChat: (state, action) => {
            const { bot } = action.payload;
            state[bot] = [];
        },   
    }
})

export const {increment,reNewChatID,addMessage, replaceLastMessage, clearChat} = chatCounterSlice.actions
export default chatCounterSlice.reducer