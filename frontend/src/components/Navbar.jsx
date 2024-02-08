import React, { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import { Link,useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp';
import SupervisorAccountSharpIcon from '@mui/icons-material/SupervisorAccountSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import MeetingRoomSharpIcon from '@mui/icons-material/MeetingRoomSharp';
import SnackBar from './SnackBar';
export default function Navbar() {
const data=useCart();
  const [cartView,setCartView]=useState(false);
const navigate=useNavigate();
const handleLogout=()=>{
  localStorage.removeItem("authToken");
  navigate("/login");
}

const handleProfile=()=>{

  navigate("/profile");

}

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic glow" to="/">Swigato</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active fs-4 pb-0 mb-0" aria-current="page" to="/">
          <HomeSharpIcon fontSize='medium' className='mb-1 mx-1'/>
            Home   </Link>
        </li>

{(localStorage.getItem("authToken"))?
 <li className="nav-item">
 <Link className="nav-link active fs-4" aria-current="page" to="/myOrderData">
  <ShoppingBasketSharpIcon fontSize='medium' className='mb-1 mx-1'/>
  My Orders</Link>
</li>
:<SnackBar openCred={true} msg='please login for placing order' color="info"/>
}
<li className="nav-item">
          <Link className="nav-link active fs-4 pb-0 mb-0" aria-current="page" to="/about">
          <SupervisorAccountSharpIcon fontSize='large' className='mb-1 mx-1'/>
            About  </Link>
        </li>




      </ul>
      {(!localStorage.getItem("authToken"))?
<div className='d-flex mx-3'>  

          <Link className="btn bg-white  text-success mx-1" to="/login">Login</Link>
        
        
          <Link className="btn bg-white  text-success mx-1" to="/createuser">SignUp</Link>
        </div>: <div>
        <div className="btn bg-white  text-success mx-1" onClick={()=>{setCartView(true)}}><ShoppingCartSharpIcon fontSize='medium' className='mb-1 mx-1'/> MyCart {" "}
        <Badge pill bg='danger'>{data.length!==0?data.length:null}</Badge>
        </div>
{cartView? <Modal onClose={()=>{setCartView(false)}}><Cart /></Modal>:null}
         <div className="btn bg-danger  text-white mx-1" onClick={handleLogout}><MeetingRoomSharpIcon fontSize='medium' className='mb-1 mx-1'/>LogOut</div>
        
         <div className='btn mx-1' id='profile-btn' onClick={handleProfile}><AccountCircleIcon className='fs-1 text-light m-1'/> <span className='text-light fs-4'>Profile</span> </div>
        </div>
        
}
    </div>
  </div>
</nav>
    
    </>
  )
}
