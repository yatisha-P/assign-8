import React from "react";


function SignUp(props) {
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
                SignUp
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
                  <button className=" border-0 btn btn-outline-primary m-2">
                    Continue with Gmail
                  </button>
                  <button className="border-0 btn btn-outline-danger">
                    Continue with Facebook
                  </button>
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
