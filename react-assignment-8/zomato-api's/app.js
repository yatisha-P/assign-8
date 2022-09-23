require('dotenv').config();

const express = require("express");
const cors  = require("cors");
const mongoose = require("mongoose");

const apiRoutes = require("./app/routers/apiRoutes ");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api",apiRoutes);

console.log("connecting to db...");


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    app.listen(process.env.PORT,function(){
        console.log("connect to db!!!");
        console.log(`zomato api is running on http://localhost:${process.env.PORT} `);
    });
}).catch((error)=>{
    console.log(error);
    process.exit(1);
});


