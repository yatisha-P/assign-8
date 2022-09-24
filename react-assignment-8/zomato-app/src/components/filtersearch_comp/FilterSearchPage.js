/* eslint-disable default-case */
/* eslint-disable no-fallthrough */
import React from "react";
import HeaderSearch from "./HeaderSearch";
import FilterPart from "./FilterPart";
import SearchItem from "./SearchItem";
import Pagination from "./Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

function FilterSearch() {
  // let filterLocation = useRef();
  let [searchParams] = useSearchParams();
  let [filter, setFilter] = useState({});
  let [locationList, setLocationList] = useState([]);
  let [searchList, setSearchList] = useState([]);
  let [pageCount, setPageCount] = useState(0);
  let [addCuisine, setAddCuisine] = useState([]);

  let getFilterDetails = async (_filter) => {
    _filter = { ..._filter };

    console.log(_filter, filter);
    let URL = "http://localhost:4000/api/filter";

    if (searchParams.get("meal_type"))
      _filter["mealtype"] = searchParams.get("meal_type");
    try {
      let response = await axios.post(URL, _filter);
      let { result, pageCount } = response.data;
      //  console.log(data);
      setSearchList([...result]);
      setPageCount(pageCount);
      //  setAddCuisine([...addCuisine])
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  let getLocationList = async () => {
    let URL = "http://localhost:4000/api/get-locationList";

    try {
      let response = await axios.get(URL);
      let data = response.data;
      //console.log(data);
      setLocationList([...data.locations]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  let filterData = async (event, option) => {
    let { value } = event.target;

    console.log({
      value,
      option,
    });
    let _filter = {};
    // console.log(value);

    switch (option) {

      case "location":
        _filter["location"] = value;
        setFilter({ ...filter, ..._filter });
        break;
      case "sort":
        _filter["sort"] = value;
        setFilter({ ...filter, ..._filter });
        break;
      case "cost":
        let cost = value.split("-");
        _filter["lcost"] = cost[0];
        _filter["hcost"] = cost[1];
        setFilter({ ...filter, ..._filter });
        break;
      case "cuisine":
        let checked = event.target.checked;

        if (checked) {
          const newCuisine = [...addCuisine, value];
          console.log({newCuisine});
          await setAddCuisine(newCuisine);
          _filter["cuisine"] = addCuisine;
          setFilter({ ...filter, ...{"cuisine":newCuisine } });
        } else {
          const newCuisine = addCuisine.filter((d) => d !== value);
          await setAddCuisine(newCuisine);
          _filter["cuisine"] = addCuisine;
          setFilter({ ...filter, ...{"cuisine":newCuisine } });

        }
        break;
      case "page":
        _filter["page"] = value;
        setFilter({ ...filter, ..._filter });
        break;
    }

    // console.log(_filter);
  };

  //mounting
  useEffect(() => {
    getLocationList();
  }, []);
  //  console.log(locationList);

  //mounting & update of filter
  useEffect(() => {
    getFilterDetails(filter);
  }, [filter]);

  return (
    <>
      <HeaderSearch />

      {/* <!-- section --> */}
      <div className="row">
        <div className="col-12 px-5 pt-4">
          <p className="h3 fw-bolder">Breakfast Places In Mumbai</p>
        </div>
        {/* <!-- food item --> */}
        <div className="col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4">
          <FilterPart locationList={locationList} filterData={filterData} />
          {/* <!-- search result --> */}
          <div className="col-12 col-lg-8 col-md-7">
            {searchList.map((item, index) => {
              return <SearchItem key={index} item={item} />;
            })}
            ;
            <Pagination filterData={filterData} pageCount={pageCount} />
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSearch;

{
  /* className= aria-hidden="true" */
}
