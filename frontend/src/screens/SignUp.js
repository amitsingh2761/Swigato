import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SnackBar from '../components/SnackBar';
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const [isValid,setValid]=useState(false);//for credentails
  const [isRight,setRight]=useState(false);//for giving alright flag

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://swigato-backend-xe1m.onrender.com/api/createuser", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      setValid(true);
    } else {
      setRight(true);
      setTimeout(()=>{navigate('/')},4000)
      // navigate("/");
    }
  };

  const setChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const getLocation = async () => {
    try {
      const location = await axios.get("https://ipapi.co/json");
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        geolocation: location.data.city + " " + location.data.region
      }));
      // console.log(location.data.city);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
   <>
    {<SnackBar openCred={isValid} msg='enter Valid Credentails' color="warning"/>}
    {<SnackBar openCred={isRight} msg='SignUp Successful!! Navigating to HomePage...' color="success"/>}

   <div className='container mt-3'>
   <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">User name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={setChange}/> 
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={setChange}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={setChange}/>
  </div>
 
  
  <button type="submit" className="btn btn-success m-3">Submit</button>
  <Link to="/login" className='btn btn-primary m-3'>Already a User </Link>
  <Link to="/" className='btn btn-primary m-3'>HomePage </Link>

</form>
</div>
   </>
  )
}
