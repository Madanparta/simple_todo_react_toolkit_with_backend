import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {updateUser} from './redux/userSlice';

const UpdateUser = () => {
    const {id}=useParams();
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const users = useSelector(state=>state.users.users);
    const user = users.find(us=>us.id === id)
    const [updateUsers,setUpdateUsers]=useState({
        name:user?.name,
        email:user?.email,
        age:user?.age,
    })
    const formHandlerSubmit = async(e)=> {
        e.preventDefault();
        try {
            const request = await axios.put(`http://localhost:3001/update/${id}`,updateUsers)
            if(request.status === 200){
                dispatch(updateUser(request.data.users))
                console.log("successfully updated.")
                navigation('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const inputHandler = (e)=>{
        const {name,value}=e.target;
        setUpdateUsers({
            ...updateUsers,
            [name]:value
        })
    }
    return (
        <section>
          <form onSubmit={formHandlerSubmit}>
            <h1>Add user</h1>
    
            <div>
                <label htmlFor="name">
                    Name : <input type="text" id='name' name='name' placeholder='Enter Name' value={updateUsers.name} onChange={inputHandler}/>
                </label>
            </div>
            <div>
                <label htmlFor="email">
                    Email : <input type="email" id='email' name='email'  placeholder='Enter Email' value={updateUsers.email} onChange={inputHandler}/>
                </label>
            </div>
            <div>
                <label htmlFor="age">
                    Age : <input type="number" id='age' name='age' placeholder='Enter Age' value={updateUsers.age} onChange={inputHandler}/>
                </label>
            </div>
            <dir>
                <button type='submit'>Submit</button>
            </dir>
          </form>
        </section>
      )
}

export default UpdateUser
