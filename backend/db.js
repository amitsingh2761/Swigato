const mongoose = require('mongoose');
require("dotenv").config();
// const db_URL = "mongodb+srv://amit:amit1729@cluster0.p0qkt6j.mongodb.net/swigatoDB?retryWrites=true&w=majority";
const db_URL=process.env.DB_URL;
const startMongoDB = async () => {
    try {
        await mongoose.connect(db_URL);

        console.log("Database Connected Successfully");

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        global.food_items = fetched_data;
        global.foodCategory = foodCategory;

    } catch (e) {
        console.error("Error connecting to the database:", e.message);
    }
}

module.exports = startMongoDB;
 
