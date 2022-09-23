const MenuItemModel  = require("../models/MenuItemModel");
const menuItemList  = require("../resources/menuitems.json");

const MenuItemController = {
   
    getMenuItems : async function (request,response) {
      
        try{
            let id = request.query.rid;
            id = id ? id :0;

            let result = await MenuItemModel.find({restaurantId: id});
            response.status(200).send({
                status:true,
                menuItems: result
            });
        }catch(error){
            response.status(500).send({
                status: false,
                message: "server error",
                error
            });
        }  
    },

    addMenuItems : async function (request,response){

        try{
        let result = await MenuItemModel.insertMany(menuItemList);
        response.status(200).send({
            status: true,
            message:"menu-item list added successfully",
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

module.exports =  MenuItemController;

