
import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import ProfileCard from '../components/ProfileCard';

export default function Profile() {
    const [orderData, setOrderData] = useState("");
    const [userData, setUserData] = useState("");
    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/profile", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            const data = await response.json();

            console.log(data.orderData);
            if (data.orderData) {
                setOrderData(data.orderData)
            }
            if (data.userData) {
                setUserData(data.userData)
            }
            // console.log(data.userData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {//stopping for re-renderering twice
            initialized.current = true
            fetchMyOrder();
         
        }
    }, [])
    return (
        <>
            <div><Navbar /></div>
            <div className='container'>
                <ProfileCard userData={userData} orderData={orderData} />
            </div>

        </>
    )
}
