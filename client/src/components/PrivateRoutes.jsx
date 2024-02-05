import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextApi } from './ContextApi';

function PrivateRoutes({children}) {
  const [isValidateToken,setIsValidateToken] = useState(false); 
  const [loading,setLoading] = useState(true);

  const {isRole,setIsRole} = useContext(ContextApi);
  useEffect(()=>{
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("name");
      const validateToken = async(token)=>{
        try{
          let response = await fetch('http://localhost:8000/token',{
            method:"POST",
            body: JSON.stringify({token}),
            headers:{
              "Content-type":"application/json"
            }
          })
          let data = await response.json();
          console.log(data?.decodeToken?.username === username)
          setIsValidateToken(data?.decodeToken?.username === username) 
          setLoading(false);
          // console.log(data?.decodeToken?.role[0])
          setIsRole(data?.decodeToken?.role[0])
        }catch(err){
          console.log(err?.message)
          setLoading(false);
        }
      }
      validateToken(token);
    },[isValidateToken]);

    if (loading) {
      return <div>Loading...</div>;
    }
  return isValidateToken?children:<Navigate to="/login"/>
}

export default PrivateRoutes