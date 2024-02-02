import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();

    //handletocartdata
    const data = useCart();
    const options = props.options;
    const priceOptions = Object.keys(options);
    const priceRef = useRef();

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");



    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return;
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, img: props.foodItem.img, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
                return;
            }

        }

        await dispatch({ type: "ADD", id: props.foodItem._id, img: props.foodItem.img, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });


    }

    const finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    },[])
    // let foodItem=props.foodItem;
    return (
        <div><div className="card mt-3 rounded " style={{ "width": "17rem", "maxHeight": "460px" }}>
            <img src={props.foodItem.img} className="card-img-top" style={{ height: "130px", objectFit: "fill" }} alt="loading..." />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <p className="card-text">very delicious food</p>
                <div className='container w-100'>
                    <div>
                        <select className='m-1 h-100 bg-success rounded' onChange={(e) => { setQty(e.target.value) }} style={{ "color": "white" }}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} >{i + 1}</option>
                                    );
                                })
                            }
                        </select>
                        <select className='m-1 h-100 bg-success rounded' ref={priceRef} onChange={(e) => { setSize(e.target.value) }} style={{ "color": "white" }}>
                            {
                                priceOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    );
                                })
                            }
                        </select>
                        <div className='d-inline h-100'>
                            <span>&#8377;</span> {finalPrice} /-
                            <hr />
                        </div>
                        <div className='btn btn-success justify-center ms-2 ' onClick={handleAddtoCart} > Add to Cart</div>
                    </div>

                </div></div></div></div>
    )
}
