const RestaurantModel  = require("../models/RestaurantModel");
const restaurantList  = require("../resources/restaurant.json");

const RestaurantController = {
   
getRestaurants : async function (request,response) {
        try{
            let result = await RestaurantModel.find();
            response.status(200).send({
                status:true,
                restaurants: result
            });
        }catch(error){
            response.status(500).send({
                status: false,
                message: "server error",
                error
            });
        }  
    },

getRestaurantById : async function(request,response){
    try{
        let {id} = request.params;
        let data = await RestaurantModel.findById(id);
        response.status(200).send({
            status : true,
            result: data
        });
    }catch(error){
        response.status(500).send({
            status: false,
            message:"server error",
            error
        });
    }
},

getRestaurantByLocationId: async function(request,response){
    try {
        const {rest,lid } = request.query;
        let data = await RestaurantModel.find({
            name: { $regex: rest + ".*", $options: "i" },
            location_id: Number(lid),
          },{name:1, image:1, locality:1,_id:1, city:1}); 
        response.status(200).send({ 
            status: true, 
            result: data 
        });
      } catch (error) {
        response.status(500).send({
          status: false,
          message: "server error",
          error,
        });
      }
},

getFilterRestaurant : async function (request,response){
    let {mealtype, location, cuisine, lcost, hcost, page, sort}  = request.body;

    sort = sort ? sort : 1; //low to high
    page = page ? page : 1;
    let itemsPerPage = 2;
    //itemsPerPage = itemsPerPage ? itemsPerPage : 2;


    let staringIndex = page * itemsPerPage - itemsPerPage; //0
    let lastIndex = page * itemsPerPage;



    let filterObject  = {};

    

    if(mealtype) filterObject["mealtype_id"] = mealtype;
    if(location) filterObject["location_id"] = location;
    if(cuisine){
        const newCuisine = cuisine.map((c) => +c);
        filterObject["cuisine_id"] = {$in:newCuisine};
    }
    if(lcost && hcost) filterObject["min_price"] = {$lte:hcost,$gte:lcost};

    //console.log(filterObject);

    try{
        let result = await RestaurantModel.find(filterObject).sort({min_price:sort});
        let filterResult = result.slice(staringIndex, lastIndex);
        response.status(200).send({filterObject,result,
          status: true,
          result: filterResult,
          pageCount: Math.ceil(result.length/2), //gives a round number
        });
    } catch (error) {
        response.status(500).send({
          status: false,
          message: "server error",
          error,
        });
      }
},

addRestaurants : async function (request,response){

    try{
    let result = await RestaurantModel.insertMany(restaurantList);
    response.status(200).send({
        status: true,
        message:"restaurant list added successfully",
    });
}catch(error){
    response.status(500).send({
        status: false,
        message:"server error",
        error
    });
}
}

};


module.exports =  RestaurantController;

