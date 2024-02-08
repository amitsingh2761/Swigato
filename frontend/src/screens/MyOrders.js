import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function MyOrders() {
  const [orderData, setOrderData] = useState("");

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("https://swigato-backend-xe1m.onrender.com/api/myOrderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      });
      const data = await response.json();
      if (!data.orderData) {
        document.getElementById("footer").innerHTML = "No orders are made yet<br/> <div class='btn'><a href='/'> <button>Go to HomePage</button></a></div>";
      }
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  }

  let orderDataArray = orderData && orderData.orderData && orderData.orderData.order_data ? orderData.orderData.order_data : [];
  orderDataArray=[...orderDataArray].reverse();
  function openTab(evt, date) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(date).style.display = "block";
    evt.currentTarget.className += " active";
  }
  return (
    <>
      <Navbar />
      <div className='container w-100 mt-3 p-3'>
        <div className='row'>
          <div className="order-tab bg-success"> {/* Move this div outside of the mapping function */}
          {[...new Set(orderDataArray.map(array => array[0]?.Order_date))]
  .map((date, index) => (
    <button key={index} className="tablinks order-button bg-success text-light fw-bold" onClick={(evt) => openTab(evt, date)}>
      {date}
    </button>
))}
          </div>
        </div>
        {orderDataArray.map((array, index) => (
          <div key={index} id={array[0]?.Order_date} className="tabcontent">
            {array.slice(0).map((item, idx) => (
              item.name&&<div key={idx} className='col-12 col-md-6 col-lg-3'>
                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                  <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                      <span className='m-1'>Qty: {item.qty}</span>
                      <span className='m-1'>Size: {item.size}</span>
                      <span className='m-1'>Date: {array[0]?.Order_date}</span>
                      <div className='d-inline ms-2 h-100 w-20 fs-5'>
                        ₹{item.price}/-
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div id='footer'>
        {/* <Footer /> */}
      </div>
    </>
  )
  
}





























// import React, { useState } from 'react'
// import { useEffect } from 'react';
// import Navbar from '../components/Navbar'



// export default function MyOrders() {
//   const [orderData, setorderData] = useState("");
//   const fetchMyOrder = async () => {
//     console.log(localStorage.getItem('userEmail'))
//     await fetch("http://localhost:5000/api/myOrderData", {
//         // credentials: 'include',
//         // Origin:"http://localhost:3000/login",
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify({
//             email:localStorage.getItem('userEmail')
//         })
//     }).then(async (res) => {
//         let response = await res.json()
//         if(!response.orderData)
//         {
        
//           document.getElementById("footer").innerHTML = "No orders are made yet<br/> <div class='btn'><a href='/'> <button>Go to HomePage</button></a></div>";

 
    
//     }

//         await setorderData(response)
//     })






// }

// useEffect(() => {
//   fetchMyOrder()
// }, [])


//   return (
//     <>
//       <div><Navbar /></div>
//       <div className='container'>
//         <div className='row'>

//           {orderData ? Array(orderData).map(data => {
//             return (
//               data.orderData ?
//                 data.orderData.order_data.slice(0).reverse().map((item) => {
//                   return (
//                     item.map((arrayData) => {
//                       return (
//                         <div  >
//                           {arrayData.Order_date ? <div className='m-auto mt-5'>
         

//                             {data = arrayData.Order_date}

//                             <hr />
//                           </div> :

//                             <div className='col-12 col-md-6 col-lg-3' >
//                               <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//                                 <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//                                 <div className="card-body">
//                                   <h5 className="card-title">{arrayData.name}</h5>
//                                   <div className='container w-100 p-0' style={{ height: "38px" }}>
//                                     <span className='m-1'>{arrayData.qty}</span>
//                                     <span className='m-1'>{arrayData.size}</span>
//                                     <span className='m-1'>{data}</span>
//                                     <div className=' d-inline ms-2 h-100 w-20 fs-5' >
//                                       ₹{arrayData.price}/-
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>

//                             </div>



//                           }

//                         </div>
//                       )
//                     })

//                   )
//                 }) : ""
//             )
//           }) : ""}
//         </div>


//       </div>
// <div id='footer'>
// {/* <Footer /> */}

// </div>

//     </>
//   )
// }
