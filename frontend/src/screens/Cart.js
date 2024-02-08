import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SnackBar from '../components/SnackBar';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCheckOut = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch("https://swigato-backend-xe1m.onrender.com/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      if (response.status === 200) {
        dispatch({ type: "DROP" });
        setShowSnackbar(true);
      } else {
        // Handle non-200 responses
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error while placing order:", error);
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <SnackBar openCred={showSnackbar} msg='Your order has been placed' color="success" onClose={() => setShowSnackbar(false)} />
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        {data.length === 0 ? (
          <div>
            <h3 className='mx-0 text-center fs-2 text-success'>Your cart is Empty<DinnerDiningIcon className='mx-3 fs-1 fw-bolder'/></h3>
          </div>
        ) : (
          <table className='table table-hover'>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Option</th>
                <th scope='col'>Amount</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              {data.map((food, index) => (
                <tr key={food.id}> 
                  <th scope='row'>{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td><button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index: index })}><DeleteIcon /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {data.length !== 0 && (
          <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        )}
        {data.length !== 0 && (
          <div>
            <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
          </div>
        )}
      </div>
    </div>
  );
}
