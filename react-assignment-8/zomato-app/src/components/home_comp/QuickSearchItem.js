import React from "react";
import { useNavigate } from "react-router-dom";

function QuickSearchItem(props) {
  let { meal } = props;
  let navigate = useNavigate();
  let goToQuickSearchPage = (id) => {
    navigate("/quick-search?meal_type="+id);
  };
  return (
    <>
      <div
        className="col-lg-3 col-md-3 col-12 shadow-box mb-4 mx-4"
        onClick={() =>goToQuickSearchPage(meal.meal_type)}
      >
        <div className="d-flex">
          <div>
            <img
              src={`/images/${meal.image}`}
              //console.log({`/food-item/${meal.image}`});
              className="img-fluid box-img"
              alt={meal.name}
            />
          </div>
          <div className="ps-2">
            <p className="fw-bold my-2 text-color">{meal.name}</p>
            <p className="m-0 font-size pe-2 text-color">{meal.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuickSearchItem;
