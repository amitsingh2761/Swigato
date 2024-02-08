import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import SnackBar from './SnackBar';

export default function Card(props) {
    const dispatch = useDispatchCart();

    const data = useCart();
    const options = props.options;
    const priceOptions = Object.keys(options);
    const priceRef = useRef();

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false); // State to manage Snackbar visibility

    const handleAddtoCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
                setShowSnackbar(true); // Show Snackbar after updating cart
                return;
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, img: props.foodItem.img, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
                setShowSnackbar(true); // Show Snackbar after adding to cart
                return;
            }
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, img: props.foodItem.img, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        setShowSnackbar(true); // Show Snackbar after adding to cart
    }

    const finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            {showSnackbar && <SnackBar openCred={true} msg='Item added to cart' color="success" />}
            <div className="card mt-3 mx-3 p-2 rounded justify-center " style={{ "width": "17.5rem", "maxHeight": "460px" }}>
                <div className='contaner'>
                    <img src={props.foodItem.img} className="card-img-top" id='floatImg' style={{ height: "230px", objectFit: "fill" }} alt="loading..." />
                    <div className="overlay">
                        <div className="hoverdata">{props.foodItem.description}</div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100 p-2'>
                        <div>
                            Qty:
                            <select className='m-1 h-100 bg-success rounded' onChange={(e) => { setQty(e.target.value) }} style={{ "color": "white" }}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    );
                                })}
                            </select>
                            Size:
                            <select className='m-1 h-100 bg-success rounded' ref={priceRef} onChange={(e) => { setSize(e.target.value) }} style={{ "color": "white" }}>
                                {priceOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    );
                                })}
                            </select>
                            <div className='d-block h-100 pt-2'>
                                Price: <span>&#8377;</span> {finalPrice} /-
                                <hr />
                            </div>
                            <div className='btn btn-success mx-0 justify-center ' id='AddCart-btn' onClick={handleAddtoCart}><AddShoppingCartSharpIcon fontSize="small" /> Add to Cart</div>
                            <div className='spinner-border spinner-grow bg-light text-danger w-auto d-inline pt-1' style={{ "animationDuration": "1s" }}>Free Delivery</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
