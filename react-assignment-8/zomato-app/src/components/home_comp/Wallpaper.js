import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";


function Wallpaper(props) {
  let navigate = useNavigate();
  let locationRef = useRef();
  let [locationList, setLocationList] = useState([]);
  let [restaurantList, setRestaurantList] = useState([]);
  let [locSelect, setLocSelect] = useState(null);
  let [restaurantDisable, setRestaurantDisable] = useState(true);

  let getLocations = async (event) => {
    let city = event.target.value;
    setLocSelect(null);
    setRestaurantDisable(true);
    if (city === "" || city.length < 2) {
      setLocationList([]);
      return false;
    }
    let URL = "http://localhost:4000/api/get-location-by-city?city=" + city;
    try {
      let response = await axios.get(URL);
      let { location } = response.data;
      setLocationList([...location]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  let locationSelect = (location) => {
    location = JSON.parse(location);
    setLocSelect({ ...location });
    setLocationList([]);
    setRestaurantDisable(false);
    locationRef.current.value = `${location.name}, ${location.city}`;
  };

  let getRestaurantList = async (event) => {
    let restaurant = event.target.value;
    if (restaurant === "" || restaurant.length < 2) {
      setRestaurantList([]);
      return false;
    }
    let URL = `http://localhost:4000/api/get-restaurant-by-location-id?lid=${locSelect.location_id}&rest=${restaurant}`;
    try {
      let response = await axios.get(URL);
      let { result } = response.data;
      setRestaurantList([...result]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  let goToRestaurant = (id) => {
    // console.log(id);
    navigate("/restaurant/"+id);
  };
  return (
    <>
      <section className="back-img">
        <Header bgColor=" "/>
        {/* <header className="row d-flex justify-content-center">
          <div className="col-11 d-flex justify-content-end mt-3">
            <button className="btn text-light me-1"
             data-bs-toggle="modal"
             data-bs-target="#login"
            >Login</button>
            <button className="btn btn-outline-light"
              data-bs-toggle="modal"
              data-bs-target="#sign-up"
            >Create an account
            </button>
          </div>
        </header> */}

        <div className="col-12 d-flex justify-content-center align-items-center fw-bold text-danger mt-4">
          <p className="m-0 d-flex justify-content-center align-items-center logo bg-light">
            e!
          </p>
        </div>

        <div className="col-12 d-flex justify-content-center mt-3">
          <p className="text-light fw-bold h3">
            Find the best restaurants, cafés, and bars
          </p>
        </div>

        <div className="row m-4 g-0">
          <div className="col-md-3 offset-md-3 col-sm-12 ">
            <div className="location-search mb-3">
              <input
                type="text"
                className="py-3 px-3 me-2 location-input-search font-size"
                placeholder="Please type a location"
                onChange={getLocations}
                ref={locationRef}
              />

              <div className="location-result bg-light mt-1 font-size px-2 text-align text-color">
                {locationList.map((location) => {
                  return (
                    <p
                      className="m-0 py-1"
                      key={location._id}
                      onClick={() =>
                        locationSelect(`${JSON.stringify(location)}`)
                      }
                    >
                      {" "}
                      {location.name}, {location.city}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-12">
            <div className="search">
              <div className="restaurant-input-search bg-light py-3 px-3 font-size">
                <span className="fa fa-search"></span>
                <input
                  type="text"
                  placeholder="Search for restaurants"
                  onChange={getRestaurantList}
                  disabled={restaurantDisable}
                />
              </div>

              <div className="search-result mt-1">
                {restaurantList.map((restaurant) => {
                  return (
                    <div
                      className="search-bar bg-light d-flex p-2"
                      key={restaurant._id}
                      onClick={()=>goToRestaurant(restaurant._id)}
                    >
                      <img
                        src={`/images/${restaurant.image}`}
                        className="me-3"
                        alt=""
                      />
                      <div>
                        <p className="m-0 mt-2 fw-bold small-search-bar-text text-color">
                          {restaurant.name}
                        </p>
                        <p className="m-0 smaller-search-bar-text text-color">
                          {restaurant.locality}, {restaurant.city}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Wallpaper;
