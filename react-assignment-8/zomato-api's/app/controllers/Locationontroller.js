const LocationModel  = require("../models/LocationModel");
const locationList  = require("../resources/location.json");

const LocationController = {
    apiHome : function (request,response){ 
        response.status(200).send({
            status :true,
            message: "hello yatisha its running fine"
        });
    },
    getLocations : async function (request,response) {
        try{
            let result = await LocationModel.find();
            response.status(200).send({
                status:true,
                locations: result
            });
        }catch(error){
            response.status(500).send({
                status: false,
                message: "server error",
                error
            });
        }  
    },
    getLocationByCity: async function (request, response) {
        let { city } = request.query;
        try {
          let result = await LocationModel.find({
            city: { $regex: city + ".*", $options: "i" },
          });
          response.status(200).send({
            status: true,
            location: result,
          });
        } catch (error) {
          response.status(500).send({
            status: false,
            message: "server error",
            error,
          });
        }
    },
    addLocations : async function (request,response){

        try{
        let result = await LocationModel.insertMany(locationList);
        response.status(200).send({
            status: true,
            message:"location list added successfully",
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

module.exports =  LocationController;

