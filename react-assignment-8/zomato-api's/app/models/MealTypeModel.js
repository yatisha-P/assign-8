const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealTypeSchema = new Schema({
    name: { type: String },
    content: { type: String },
    image: { type: String },
    meal_type: { type: Number },
});

const MealTypeModel = mongoose.model("mealType", MealTypeSchema);

module.exports = MealTypeModel;
