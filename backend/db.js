const mongoose = require('mongoose');
const db_URL = "mongodb+srv://amit:amit1729@cluster0.p0qkt6j.mongodb.net/swigatoDB?retryWrites=true&w=majority";

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
 


// const mongoose = require('mongoose');
// const db_URL = "mongodb+srv://amit:amit1729@cluster0.p0qkt6j.mongodb.net/swigatoDB?retryWrites=true&w=majority";

// const startMongoDB = async () => {
//     try {
//         await mongoose.connect(db_URL);

//         console.log("Database Connected Successfully");
        
//         const fetched_data = await mongoose.connection.db.collection("food_items");
//        fetched_data.find({}).toArray(async function (error,data) {
//         const foodCategory= await mongoose.connection.db.collection("foodCategory");
//         foodCategory.find({}).toArray(function(error,catData){
// if(error){console.log(error);}
// else{
//     global.food_items=data;
//     global.foodCategory=catData;

// }
//         })
//        });



//         // const data=await fetched_data.find({}).toArray();

//         // global.food_items=data;
//        // console.log(global.food_items);
//     } catch (e) {
//         console.log(e);
//     }
// }

// module.exports = startMongoDB;
