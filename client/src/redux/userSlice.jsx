import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
    },
    reducers:{
        getUser : (state,action)=>{
            state.users = action.payload.users.map(user=>{
                return {id:user._id,name:user.name,email:user.email,age:user.age}
            })
        },
        addUser : (state,action)=>{
            state.users.push(action.payload)
        },
        updateUser : (state,action)=>{
            const index = state.users.findIndex(val=>val.id === action.payload._id);
            state.users[index]=action.payload
        },
        removeUser : (state,action)=>{
            const index = state.users.findIndex(val=>val.id === action.payload.id);
            state.users.splice(index,1)
        }
    }
})

export const {getUser,addUser,updateUser,removeUser} = userSlice.actions;
export default userSlice.reducer;