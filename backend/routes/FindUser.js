const express=require("express");
const router=express.Router();
const Order=require("../models/Order");
const User=require("../models/User");
const { body, validationResult } = require('express-validator');

router.post('/profile',async(req,res)=>{
try {
    const userData=await User.findOne({'email':req.body.email});
    const orderData=await Order.findOne({'email':req.body.email});
    res.json({userData:userData,orderData:orderData})
} catch (error) {
    res.send("Error",error.message)

}
})
module.exports=router;
