import React from 'react';
import { Link} from 'react-router-dom'

export default function ProfileCard({ userData, orderData }) {
  return (
    <div className='container d-flex '>
      <div className="card mx-auto mt-3" style={{ width: "15rem", height: "auto" }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQoYalG0iZwdwwSFMhNL4aDADjcSJFcuo31Y9OY6saF8ZG5dq3lLc8uXw0eJfUwvdwjTw&usqp=CAU" className="card-img-top" style={{ width: "auto", height: "50%" }} alt={userData.name} />
        <div className="card-body mx-auto">
          <h5 className="card-title mx-auto">{userData.name}</h5>
          <p className="card-text mx-auto">{userData.email}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item mx-auto">{userData.location}</li>
          {orderData && orderData.order_data && orderData.order_data[0] && (
            <li className="list-group-item mx-auto">{orderData.order_data[0].length} orders are made recently</li>
          )}
        </ul>
        <div className="card-body">
          <a href="/" className="card-link">HomePage</a>
          <Link className="nav-link active fs-5" aria-current="page" to="/myOrderData">My Orders</Link>
        </div>
      </div>
    </div>
  );
}
