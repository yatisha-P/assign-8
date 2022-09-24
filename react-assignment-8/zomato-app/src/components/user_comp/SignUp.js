import React,{useState} from "react";
import {useNavigate} from "react-router-dom";


function SignUp(props) {

  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const navigate = useNavigate(); 


  async function signUp1(e){

   
    let item = {name,email,password};
    // console.log(item);
    // e.preventDefault();
    let result= await fetch("http://localhost:4000/api/sign-up",
    {
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(item)
    });

    result =  await result.json();
    console.log("result", result);
    localStorage.setItem("user-info",JSON.stringify(result));

    const modalRef  = document.getElementById("sign-up");

    navigate("/quick-search");
    
  }

    return (
    <>
      <div
        className="modal fade"
        id="sign-up"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="sign-up-title">
              Register
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-10 d-flex flex-column">
                  {/* <button className=" border-0 btn btn-outline-primary m-2">
                    Continue with Gmail
                  </button>
                  <button className="border-0 btn btn-outline-danger">
                    Continue with Facebook
                  </button> */}
                    <form>
                    <div className="mb-3">
                      <label htmlFor="exampleInputName" className="form-label">First Name </label>
                      <input type="text" className="form-control" id="exampleInputName" value={name} 
                      onChange={(e)=>setName(e.target.value)}
                      aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                      <input type="email" className="form-control" id="exampleInputEmail1" value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                      aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    {/* <div className="mb-3">
                      <label htmlFor="exampleInputLastName" className="form-label">Last Name </label>
                      <input type="text" className="form-control" id="exampleInputLastName" aria-describedby="emailHelp" />
                    </div> */}
                    {/* <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={signUp1}>SignUp</button>
                  </form>
                </div>
              </div>
            </div>

            <hr />
              <p className="text-center">
                Already have an account?
                <a href="#" className="text-danger">
                 Login
                </a>
              </p>



              
             {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary btn-sm">
                Login
              </button> 
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
