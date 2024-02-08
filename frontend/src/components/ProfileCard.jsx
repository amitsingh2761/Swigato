import React from 'react';
import { Link} from 'react-router-dom'

export default function ProfileCard({ userData, orderData }) {
  return (




<div className="profile-card mt-3">
  <img src={`https://ui-avatars.com/api/?name=${userData.name}&rounded=true&background=random`} alt="John" style={{width:"80%",margin:" 10px"}}/>
  <h1 style={{textTransform:"capitalize",fontFamily:"monospace",fontWeight:"bold"}}>{userData.name}</h1>
  <p className="profile-title">{userData.email}</p>
  <p>{userData.location}</p>
  {orderData && orderData.order_data && orderData.order_data[0] && (
            <div className="list-group-item mx-auto mb-2">{orderData.order_data[0].length} orders are made recently</div>
          )}

  <p><button className='profile-button d-inline bg-success'><Link className="nav-link" aria-current="page" to="/myOrderData">My Orders</Link></button>
  <button className='profile-button d-inline bg-success'><Link className="nav-link" aria-current="page" to="/">HomePage</Link></button></p>
  
</div>

























    // <div className='container d-flex '>
    //   <div className="card mx-auto mt-3" style={{ width: "15rem", height: "auto" }}>
    //     <img src={`https://ui-avatars.com/api/?name=${userData.name}&rounded=true&background=random`} className="card-img-top" style={{ width: "auto", height: "50%" }} alt={userData.name} />
    //     <div className="card-body mx-auto">
    //       <h5 className="card-title mx-auto">{userData.name}</h5>
    //       <p className="card-text mx-auto">{userData.email}</p>
    //     </div>
    //     <ul className="list-group list-group-flush">
    //       <li className="list-group-item mx-auto">{userData.location}</li>
    //       {orderData && orderData.order_data && orderData.order_data[0] && (
    //         <li className="list-group-item mx-auto">{orderData.order_data[0].length} orders are made recently</li>
    //       )}
    //     </ul>
    //     <div className="card-body">
    //       <a href="/" className="card-link">HomePage</a>
    //       <Link className="card-link" aria-current="page" to="/myOrderData">My Orders</Link>
    //     </div>
    //   </div>
    // </div>
  );
}
