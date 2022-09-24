const express = require("express");
const router = express.Router();
const location  = require("../controllers/Locationontroller");
const restaurant = require("../controllers/RestaurantController");
const mealType = require("../controllers/MealTypeControlller");
const menuItem = require("../controllers/MenuItemController");
const payment = require("../controllers/PaymentController");
const users = require("../controllers/UsersController")

router.get("/",location.apiHome);

//location
router.get("/get-locationList", location.getLocations);
router.get("/get-location-by-city", location.getLocationByCity);
router.post("/add-locationList" ,location.addLocations);

//Restaurant
router.get("/get-restaurantList", restaurant.getRestaurants);
router.get("/get-restaurant-by-id/:id", restaurant.getRestaurantById);
router.get("/get-restaurant-by-location-id",restaurant.getRestaurantByLocationId);
router.post("/filter",restaurant.getFilterRestaurant);
router.post("/add-restaurantList" ,restaurant.addRestaurants);

//mealType
router.get("/get-meal-type-list", mealType.getMealTypes);
router.post("/add-meal-type-list" ,mealType.addMealTypes);

//menuItems
router.get("/get-menu-item-list",menuItem.getMenuItems );
router.post("/add-menu-item-list",menuItem.addMenuItems);

//sign-up
router.post("/sign-up", users.userSignUp);

//payment 
router.post("/payment", payment.getPaymentApi); //react
router.post("/callback", payment.getCallbackApi); //internally hit

module.exports = router;


