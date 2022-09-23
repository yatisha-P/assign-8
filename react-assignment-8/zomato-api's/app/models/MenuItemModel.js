const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

const MenuItemSchema = new Schema({

name: { type: String },
description:{ type: String },
ingredients: { type: Array},
restaurantId: { type: ObjectID} ,
image: { type: String },
qty: { type: Number },
price: { type: Number }
   
});



const MenuItemModel = mongoose.model("menuItem", MenuItemSchema);

module.exports =MenuItemModel;