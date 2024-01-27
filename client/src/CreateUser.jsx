import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from './redux/userSlice';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [createUser,setCreateUser]=useState({
        name:'',
        email:'',
        age:'',
    })
    const formHandlerSubmit = async(e) => {
        e.preventDefault()
        try {
            const request = await axios.post('http://localhost:3001/create',createUser)
            if(request.status === 200){
                dispatch(addUser(request.data.users))
                console.log("successfully created.")
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const inputHandler = (e) => {
        const {name,value}=e.target;
        setCreateUser({
            ...createUser,
            [name]:value
        })
    }
  return (
    <section>
      <form onSubmit={formHandlerSubmit}>
        <h1>Add user</h1>

        <div>
            <label htmlFor="name">
                Name : <input type="text" id='name' name='name' placeholder='Enter Name' value={createUser.name} onChange={inputHandler}/>
            </label>
        </div>
        <div>
            <label htmlFor="email">
                Email : <input type="email" id='email' name='email'  placeholder='Enter Email' value={createUser.email} onChange={inputHandler}/>
            </label>
        </div>
        <div>
            <label htmlFor="age">
                Age : <input type="number" id='age' name='age' placeholder='Enter Age' value={createUser.age} onChange={inputHandler}/>
            </label>
        </div>
        <dir>
            <button type='submit'>Submit</button>
        </dir>
      </form>
    </section>
  )
}

export default CreateUser
