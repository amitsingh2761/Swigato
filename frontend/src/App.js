
import './App.css';
import Home from './screens/Home';
import * as React from "react";
import Login from './screens/Login';
import SignUp from './screens/SignUp.js';
import MyOrders from './screens/MyOrders.js';
import Profile from './screens/Profile.js';
import About from './screens/About.js';
import Cart from './screens/Cart.js';

import { CartProvider } from './components/ContextReducer.jsx';
import {
  BrowserRouter as Router,
 Routes,
  Route,
  
} from "react-router-dom";



import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
  <CartProvider>
  <Router>
    <div>
      <Routes>
<Route exact path='/' element={<Home/>}/>
<Route exact path='/login' element={<Login/>}/>
<Route exact path='/createuser' element={<SignUp/>}/>
<Route exact path='/myOrderData' element={<MyOrders/>}/>
<Route exact path='/cart' element={<Cart/>}/>
<Route exact path='/profile' element={<Profile/>}/>
<Route exact path='/about' element={<About/>}/>
      </Routes>
    </div>
  </Router>
  </CartProvider>
  );
}

export default App;
