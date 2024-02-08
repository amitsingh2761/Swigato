import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import SnackBar from '../components/SnackBar';


export default function Login() {
  const navigate=useNavigate();
  const [credentials,setCredentials]=useState({email:"",password:""});
  const [isValid,setValid]=useState(false);//for credentails
  const [isRight,setRight]=useState(false);//for giving alright flag

  const handleSubmit=async(e)=>{
e.preventDefault();//synthetic event
const response=await fetch("https://swigato-backend-xe1m.onrender.com/api/loginuser",
{
  method:'POST',
  headers:{"Content-Type":"application/json"},
body:JSON.stringify({email:credentials.email,password:credentials.password})

});
const json=await response.json();
console.log(json);
if(!json.success)
{

setValid(true);
}
else{
  localStorage.setItem("userEmail",credentials.email);
  localStorage.setItem("authToken",json.authToken);

  // console.log(localStorage.getItem("authToken"));

  setRight(true);
      setTimeout(()=>{navigate('/')},4000)
  
}
  }

  const setChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
}

const [toggle,setToggle]=useState(false);
const handleToggle=()=>{
  setToggle(!toggle);
  if(toggle)
  {
document.getElementById('passw').type="password";
  }
  else
  {
document.getElementById('passw').type="text";

  }
}
  return (
   <>

   <div className='container mt-3'>
  
    {<SnackBar openCred={isValid} msg='enter Valid Credentails' color="error"/>}
    {<SnackBar openCred={isRight} msg='Login SuccessFull !!! Redirecting to HomePage...' color="success"/>}
   <form onSubmit={handleSubmit}>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={setChange}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <div className='input-group'>
    <input type="password" id='passw' className="form-control" name='password' value={credentials.password} onChange={setChange}/>
    <span className="input-group-text btn-primary" onClick={handleToggle}>
      {toggle?<VisibilityOffRoundedIcon/>:<VisibilityRoundedIcon/>}</span>
    </div>
  </div>
  
  
  <button type="submit" className="btn btn-success m-3">Submit</button>
  <Link to="/createuser" className='btn btn-primary m-3'>Create Account </Link>
  <Link to="/" className='btn btn-primary m-3'>HomePage </Link>
</form>
</div>
   
   </>
  )
}
