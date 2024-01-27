import React, { useEffect } from 'react'
import Users from './Users';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { getUser } from './redux/userSlice';
import {Routes,Route} from 'react-router-dom';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await axios.get('http://localhost:3001/')
        dispatch(getUser(response.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])
  return (
    <div>
      <Routes>
        <Route path='/' element={<Users/>}/>
        <Route path='/create' element={<CreateUser/>}/>
        <Route path='/update/:id' element={<UpdateUser/>}/>
      </Routes>
    </div>
  )
}

export default App
