import React from "react";
// import React, {useRef} from "react";

function FilterPart(props) {
  let { locationList, filterData } = props; //filterLocation,
  return (
    <>
      <div className="food-shadow col-12 col-lg-3 col-md-4 me-5 p-3 mb-4">
        <div className="d-flex justify-content-between">
          <p className="fw-bold m-0">Filter</p>
          <button
            className="d-lg-none d-md-none btn"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFilter"
            aria-controls="collapseFilter"
          >
            <span className="fa fa-eye"></span>
          </button>
        </div>
        {/* <!-- Collapse start  --> */}
        <div className="collapse show" id="collapseFilter">
          <div>
            <label htmlFor="" className="form-label">
              Select Location
            </label>
            <select className="form-select form-select-sm text-muted"  onChange={(event)=>filterData(event,"location")}>
              <option value="">---Select---</option>
              {locationList.map((location, index) => {
                return (
                  <option key={index} value={location.location_id}>
                    {location.name}, {location.city}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="mt-4 mb-2 fw-bold">Cuisine</p>
          <div>
            <div className="ms-1">
              <input type="checkbox" className="form-check-input" name="food" value="1"
                onChange={(event) => filterData(event, "cuisine")} />
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                North Indian
              </label>
            </div>
            <div className="ms-1">
              <input type="checkbox" className="form-check-input"  name="food"  value="2"
                onChange={(event) => filterData(event, "cuisine")} />
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                south Indian
              </label>
            </div>
            <div className="ms-1">
              <input type="checkbox" className="form-check-input" name="food" value="3"
                onChange={(event) => filterData(event, "cuisine")}/>
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                Chinese
              </label>
            </div>
            <div className="ms-1">
              <input type="checkbox" className="form-check-input"  name="food" value="4"
                onChange={(event) => filterData(event, "cuisine")}/>
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                Fast Food
              </label>
            </div>
            <div className="ms-1">
              <input type="checkbox" className="form-check-input" name="food" value="5"
                onChange={(event) => filterData(event, "cuisine")} />
              <label htmlFor="" className="form-check-label ms-1 text-muted">
              Street Food
              </label>
            </div>
            {/* <div className="ms-1">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                North Indian
              </label>
            </div> */}
          </div>
          <p className="mt-4 mb-2 fw-bold">Cost For Two</p>
          <div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" value="0-500" name="cost" onChange={(event)=>filterData(event,"cost")}/>
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                less then 500
              </label>
            </div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" value="500-1000" name="cost" onChange={(event)=>filterData(event,"cost")}/>
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                500 to 1000
              </label>
            </div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" value="1000-1500" name="cost"  onChange={(event)=>filterData(event,"cost")}/>
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                1000 to 1500
              </label>
            </div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" value="1500-2000" name="cost" onChange={(event)=>filterData(event,"cost")}/>
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                1500 to 2000
              </label>
            </div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" value="2000-200000" name="cost" onChange={(event)=>filterData(event,"cost")} />
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                2000+
              </label>
            </div>
          </div>
          <p className="mt-4 mb-2 fw-bold">Sort</p>
          <div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" value="1" name="sortByPrice"  onChange={(event)=>filterData(event,"sort")}/>
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                Price low to high
              </label>
            </div>
            <div className="ms-1">
              <input type="radio" className="form-check-input" value="-1" name="sortByPrice" onChange={(event)=>filterData(event,"sort")}/>
              <label htmlFor="" className="form-check-label ms-1 text-muted">
                Price high to low
              </label>
            </div>
          </div>
        </div>
        {/* <!-- Collapse end --> */}
      </div>
    </>
  );
}

export default FilterPart;
