import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { ContextApi } from './ContextApi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const navigate = useNavigate();
  const handleLogin =async (e) => {
    e.preventDefault();
    console.log(username,password)

    if(username && password){
       await axios.post("http://localhost:8000/auth/login",{
          username,
          password,
        }).then(data=>{
          alert(data.data.message)
          let token = data?.data?.token;
          if(token){
            localStorage.setItem("token",data.data.token)
            localStorage.setItem("name",username);
          }
          navigate("/books");
        }).catch(err=>{
          console.log(err?.message)
          alert(err?.message)
        })
      }
  };

  return (
    <div className="container">
      <h2>Login page</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      <input type="submit" value="login" onClick={handleLogin} />
      </form>
    </div>
  );
};

export default Login;
