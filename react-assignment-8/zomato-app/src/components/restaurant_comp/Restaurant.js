import React, { useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Header from "../Header";

function Restaurant() {
  let userNameRef = useRef()
  let emailRef = useRef()
  let addressRef = useRef()
  let params = useParams();
  let initRest = {
    aggregate_rating: 0,
    city: "",
    city_id: 0,
    contact_number: 0,
    cuisine: [],
    cuisine_id: [],
    image: "",
    locality: "",
    location_id: 0,
    mealtype_id: 0,
    min_price: 0,
    name: "",
    rating_text: "",
    thumb: [],
    _id: "-1",
  };
  let [restDetails, setRestDetails] = useState({ ...initRest });
  let [contact, setContact] = useState(false);
  let [subTotal, setSubTotal] = useState(0);
  let [menuItem, setMenuItem] = useState([]);
  // console.log(params);

  let onChangeHandler = ()=>{};

  let loadScript = async()=>{
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://checkout.razorpay.com/v1/checkout.js";
    scriptElement.onload = () =>{
      return true;
    };
    scriptElement.onerror  = () =>{
      return false;
    };
    document.body.appendChild(scriptElement);
  };

  let makePayment = async()=>{
    let isLoaded = await loadScript();
    if(isLoaded === false){
      alert("Unable to load payment sdk");
      return false;
    }
    // else{
    //   alert("script is loaded");
    // }

    let URL = "http://localhost:4000/api/payment";
    let sendData = {
      amount: subTotal,
      email: emailRef.current.value,
    };

    let {data} = await axios.post(URL,sendData);
    let {order}= data;
  

    var options = {
      key: "rzp_test_pne21l3OlJA0DB", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Zomato clone Payment",
      description: "Food order payment",
      image: "http://founderindia.com/wp-content/uploads/2018/05/Zomato_Logo.jpg",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response){
        let URL = "http://localhost:4000/api/callback";
          let sendData = {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
          };
      
          let {data} = await axios.post(URL,sendData);
         if(data.status=== true){
          alert("Your order placed , payment received successfully");
          window.location.assign("/"); //send to home page to user
         }else{
          alert("Payment failed please try again");
         }
      },
      prefill: {
          name: "Yatisha Umredkar",
          email: "yatisha65@gmail.com",
          contact: "9999999999"
      },
  };
  var paymentObject = new window.Razorpay(options);
  paymentObject.open();
  
      console.log("clickable");
    // }
  };

  let restaurantDetails = async () => {
    let URL = "http://localhost:4000/api/get-restaurant-by-id/" + params.id;
    try {
      let response = await axios.get(URL);
      let data = response.data;
      if (data.status === true) {
        setRestDetails({ ...data.result });
      } else {
        setRestDetails({ ...initRest });
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  let getMenuList = async () => {
    let URL = "http://localhost:4000/api/get-menu-item-list?rid=" + params.id;
    try {
      let response = await axios.get(URL);
      let data = response.data;
      if (data.status === true) {
        // console.log(data);
        setMenuItem([...data.menuItems]);
      } else {
        alert("menu item not found");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  let incMenuItemCount = (index) => {
    let _menuItems = [...menuItem];
    _menuItems[index].qty += 1;
    setMenuItem(_menuItems);
  };

  let decMenuItemCount = (index) => {
    let _menuItems = [...menuItem];
    _menuItems[index].qty -= 1;
    setMenuItem(_menuItems);
  };

  //  on mounting
  useEffect(() => {
    restaurantDetails();
  }, []);

  useEffect(()=>{
    let subTotal = menuItem.reduce((pV,cV)=>{
      return pV + cV.price* cV.qty;
    },0);
    setSubTotal(subTotal);
  },[menuItem]);
  

  //  console.log(menuItem);
  return (
    <>
      {/* carousel-modal */}

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <Carousel showThumbs={false} infiniteLoop={true}>
                {restDetails.thumb.map((value, index) => {
                  return (
                    <div key={index}>
                      <img src={"/images/" + value} />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 
<!-- modal-Part --> */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                {restDetails.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {menuItem.map((item, index) => {
                return (
                  <div className="row p-2" key={index}>
                    {" "}
                    {/* //see why menuItem._id is not working for key */}
                    <div className="col-8">
                      <p className="mb-1 h6">{item.name}</p>
                      <p className="mb-1">{item.price} </p>
                      <p className="small text-muted">{item.description}</p>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                      <div className="products">
                        <img src={"/images/" + item.image} alt="" />
                        {item.qty === 0 ? (
                          <button
                            className="btn btn-sm btn-primary add-btn"
                            onClick={() => incMenuItemCount(index)}
                          >
                            Add
                          </button>
                        ) : (
                          <div className="add-btn bg-light">
                            <span
                              className="btn btn-sm btn-primary"
                              onClick={() => decMenuItemCount(index)}
                            >
                              -
                            </span>
                            <span>{item.qty}</span>
                            <span
                              className="btn btn-sm btn-primary"
                              onClick={() => incMenuItemCount(index)}
                            >
                              +
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <hr className="my-3 p-0" />
                  </div>
                );
              })}
            </div>
            {subTotal===0?null:(<div className="modal-footer d-flex justify-content-between">
              <h5 className="fw-bold">Subtotal {subTotal}</h5>
              <button
                className="btn btn-danger"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Pay Now
              </button>
            </div>)}
            
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                {restDetails.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter full name"
                  value="Yatisha Umredkar"
                  ref={userNameRef}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value="yatisha65@gmail.com"
                  ref={emailRef}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Address
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value="Nagpur"
                  ref={addressRef}
                  onChange={onChangeHandler}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={makePayment}
              >
                PROCEED
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- restaurant - Page --> */}

      <Header bgColor=" bg-danger"/>
      {/* <!-- restaurant image --> */}
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="row">
            <div className="col-12  mt-5">
              <div className="restro-main-image">
                <img
                  src={"/images/" + restDetails.image}
                  alt=""
                  className="position-relative"
                />
                <button
                  className=" btn btn-outline-light border-1 fw-bold text-black position-absolute"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Click to see Image Gallery
                </button>
              </div>
            </div>
            <div className="col-12">
              <h4 className="my-5 fw-bold">{restDetails.name}</h4>
              <div className="d-flex justify-content-between">
                <ul className="list-unstyled d-flex gap-3">
                  <li
                    className={
                      contact === false
                        ? "border-bottom border-4 border-danger"
                        : "toPointCursor"
                    }
                    onClick={() => setContact(false)}
                  >
                    Overview
                  </li>
                  <li
                    className={
                      contact === true
                        ? "border-bottom border-4 border-danger"
                        : "toPointCursor"
                    }
                    onClick={() => setContact(true)}
                  >
                    Contact
                  </li>
                </ul>

                <a
                  className="btn btn-danger align-self-start"
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                  role="button"
                  onClick={getMenuList}
                >
                  Place Online Order
                </a>
              </div>
              <hr className="mt-0" />
              {contact === false ? (
                <div>
                  <p className="h6 mb-4 fw-bold">About this place</p>
                  <p className="mb-0 fw-bold">Cuisine</p>
                  <p>
                    {restDetails.cuisine
                      .reduce((pV, cV) => pV + ", " + cV.name, "")
                      .substring(2)}
                  </p>
                  <p className="mb-0 fw-bold">Average Cost</p>
                  <p>
                    {" "}
                    <span className="fw-bold">
                      ₹{restDetails.min_price}
                    </span>{" "}
                    For two people (approx.)
                  </p>
                </div>
              ) : (
                <div>
                  <p className="mb-1">Phone Number</p>
                  <p className="text-danger">+{restDetails.contact_number}</p>

                  <p className="mb-1 fw-bold">Address</p>
                  <p>
                    {restDetails.locality}, {restDetails.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Restaurant;
