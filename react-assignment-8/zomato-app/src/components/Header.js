import React,{useState,useEffect} from "react";
import Login from "./user_comp/Login";
import SignUp from "./user_comp/SignUp";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'


function Header(props) {
  let { bgColor } = props;
  let [login, setLogin]= useState(null);


  let onSuccess = (response) => {
    let token = response.credential;
    localStorage.setItem("auth_token", token);
    Swal.fire({
      icon: 'success',
      title: 'Login Successfully',
   
    }).then(()=>{
      window.location.reload();
    })
    
  };
  
  let onError = () => {
    alert("something went wrong please try again... ");
  };

  let logout = () => {
    Swal.fire({
      title: 'Are you sure to Logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth_token");
        window.location.reload();
      }
    });
  };
  
  useEffect(()=>{
    let token=  localStorage.getItem("auth_token");
    if(token){
      var decoded = jwt_decode(token);
      setLogin(decoded);
    }else{
      setLogin(null);
    }
  },[]);


  const changeLocalStorage = () => {
    let token=  localStorage.getItem("auth_token");
    if(token){
      var decoded = jwt_decode(token);
      setLogin(decoded);
    }else{
      setLogin(null);
    }
  }

  useEffect(() => {
    document.addEventListener("itemInserted", changeLocalStorage, false);
  }, [])

  return (
    <>
      <GoogleOAuthProvider clientId="25843935075-j3s5su4bmuoupcd7d3lbtpgur3bumgk4.apps.googleusercontent.com">
        <Login success={onSuccess} error={onError}/>
        <SignUp />

        <div className={"row justify-content-center" + bgColor}>
          <div className="col-10 d-flex justify-content-between py-2">
            <p className="m-0 brand">e!</p>
            {login===null ?
            (<div>
              <button
                className="btn text-light me-2"
                data-bs-toggle="modal"
                data-bs-target="#login"
              >
                Login
              </button>
              <button
                className="btn btn-outline-light"
                data-bs-toggle="modal"
                data-bs-target="#sign-up"
              >
                Create a Account
              </button>
            </div>):(<div>
              <span
                className="text-light me-2"
              >
                Welcome,{login.name}
              </span>
              <button
                className="btn btn-outline-warning"
              onClick={logout}>
                Logout
              </button>
            </div>)
            }
          </div>
        </div>
      </GoogleOAuthProvider>
      ;
    </>
  );
}

export default Header;
