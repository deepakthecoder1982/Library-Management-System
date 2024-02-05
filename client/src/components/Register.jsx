import axios from 'axios';
import React, { useState } from 'react'

function Register() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const handleRegister = async(e)=>{
        e.preventDefault();
        if(username && password){
           await axios.post("http://localhost:8000/auth/register",{
                username,
                password,
                role:"VIEW_ALL"
            }).then(data=>{
                console.log(data.data?.message)
                alert(data.data?.message)
            }).catch(err=>{
                console.log(err?.message)
            })
        }else{
          alert("All fields are required!!")
        }
    }
  return (
    <div className="container">
    <h2>Register</h2>
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Role: Only Readable
        <input type="text" readOnly value={"VIEW_ALL"}/>
      </label>
    <input type="submit" value="Register" onClick={handleRegister} />
    </form>
  </div>
  )
}

export default Register