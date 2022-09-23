import React from 'react'
import { useNavigate } from 'react-router-dom';

function SearchItem(props) {
  let {item} = props;
  //  console.log(item);

  let navigate = useNavigate();
  let goToRestaurant = (id)=>{
    navigate("/restaurant/" + id);
  }
    return (
    <>
 <div className="col-12 food-shadow p-4 mb-4 toPointCursor" onClick={()=>goToRestaurant(item._id)}>
              <div className="d-flex align-items-center">
                <img src={"/images/"+ item.image} className="food-item" />
                <div className="ms-5">
                  <p className="h4 fw-bolder">{item.name}</p>
                  {/* <span className="fw-bold text-muted">FORT</span> */}
                  <p className="m-0 text-muted">
                   
                   {item.locality}, {item.city}
                  </p>
                  <p className="m-0 text-muted">
                   
                   {item.city}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div>
                  <p className="m-0 text-muted">CUISINES:</p>
                  <p className="m-0 text-muted">COST for TWO:</p>
                </div>
                <div className="ms-5">
                  <p className="m-0 fw-bold"> {item.cuisine
                      .reduce((pV, cV) => pV + ", " + cV.name, "")
                      .substring(2)}</p>
                  <p className="m-0 fw-bold">
                    <i className="fa fa-inr" aria-hidden="true"></i>
                   {item.min_price}
                  </p>
                </div>
              </div>
            </div>
    
    </>
  )
}
export default SearchItem;