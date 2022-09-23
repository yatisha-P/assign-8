const MealTypeModel  = require("../models/MealTypeModel");
const mealTypeList  = require("../resources/mealtype.json");

const MealTypeController = {
   
    getMealTypes : async function (request,response) {
        try{
            let result = await MealTypeModel.find();
            response.status(200).send({
                status:true,
                mealTypes: result
            });
        }catch(error){
            response.status(500).send({
                status: false,
                message: "server error",
                error
            });
        }  
    },

    addMealTypes : async function (request,response){

        try{
        let result = await MealTypeModel.insertMany(mealTypeList);
        response.status(200).send({
            status: true,
            message:"meal-type list added successfully",
        });
    }catch(error){
        response.status(500).send({
            status: false,
            message:"server error",
            error
        });
    }
},
};

module.exports =  MealTypeController;

