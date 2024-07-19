import { useState } from "react";
import { useDispatch } from "react-redux";
import {postLogin} from "../../store/login";
import { useNavigate } from "react-router-dom";
import './style.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login=()=>{
    const initialUser={
        user_name:"",
        password:""
    };


    const dispatch = useDispatch();
    const [user,setUser] =useState(initialUser);
    const [error,setError] =useState(null);
    const navigate =useNavigate()
    const handleSubmit=()=>{
      navigate('/display')
    }

    const handleSuccessCB=()=>{
      return(handleSubmit())
    }
    const handleErrorCB=(data)=>{
      // console.log(data)
      setError(data)
      return(data)
    }
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(postLogin({
          data: user,
          successCB: handleSuccessCB,
          errorCB:handleErrorCB
         
        }),
        );}
    
    

  return(
    <>
    <div id='background'>
      <AccountCircleIcon />
      <form onSubmit={handleLogin} >
  <label>User Name:</label>
  <input
    type="text"
    value={user.user_name}
    onChange={(event) => setUser({ ...user, user_name: event.target.value })}
    required
  />
  <br /><br />
  <label>Password:</label>
  <input
    type="password" 
    value={user.password}
    onChange={(event) => setUser({ ...user, password: event.target.value })}
    required
  />
  <br /><br />
  {error}
  <div className="modal-buttons">
    <button type="submit" onClick={handleLogin}>Login</button>
    
  </div>
  </form>

  </div>
        
    
  </>
  )
}
export default Login