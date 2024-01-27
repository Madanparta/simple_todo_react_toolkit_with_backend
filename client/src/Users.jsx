import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { removeUser } from './redux/userSlice';
import axios from 'axios';

const Users = () => {
    const users = useSelector(state=>state.users.users);
    const dispatch = useDispatch()

    const deleteUserHandler = async(id) => {
        // console.log(id)
        try {
            const request = await axios.delete(`http://localhost:3001/remove/${id}`);
            if(request.status === 200){
                dispatch(removeUser({id:id}))
                console.log('successfully remove.')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <div>
        <Link to='/create'><button> Add + </button></Link>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link to={`/update/${user.id}`}><button className="btn-up">Update</button></Link>
                    <button onClick={()=>deleteUserHandler(user.id)} className="btn-dlt">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users
