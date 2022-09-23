import React, { useEffect, useState } from 'react'
import axios from 'axios';
import QuickSearchItem from './QuickSearchItem';


function QuickSearch() {
  let [mealType,setMealType] = useState([]);

  let getQuickSearchData = async()=>{
    // console.log("click");

    let URL = "http://localhost:4000/api/get-meal-type-list";
    try {
      let response = await axios.get(URL);
      //  console.log(response.data);
       let {status,mealTypes} = response.data;  
       if(status){
        setMealType([...mealTypes]);
       }else{
        alert("meal not found");
       }   
    } catch (error) {
      alert(error);
      console.log(error);
    }   
  };


useEffect(()=>{
  getQuickSearchData();
},[]);

  return (
    <>

<section className="container-fluid">
        <div className="row">
          <div className="col-10 my-4 py-2 g-0">
            <p className="h4 fw-bold text-color">Quick Searches</p>
            <p className="fs-6 text-color">Discover restaurants by type of meal</p> 
          </div>
        </div>

        <div className="row">
          <div className="col-12 flex-wrap g-0 d-flex justify-content-evenly">
         
             {mealType.map((meal)=>{
              return <QuickSearchItem meal ={meal} key={meal._id} />
            })}

           
          </div>
        </div>
      </section>
    
    </>
  )
}

export default QuickSearch;