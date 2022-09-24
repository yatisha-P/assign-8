
import React from "react";
import HomePage from "./components/home_comp/HomePage";
import FilterSearchPage from './components/filtersearch_comp/FilterSearchPage';
import Restaurant from "./components/restaurant_comp/Restaurant";
import{Routes,Route}from "react-router-dom";
// import RegistrationForm from "./components/user_comp/RegistrationForm";



function App() {
 
  return (
    <>
    
    <main className="container-fluid">
    <Routes>
      <Route path="/" element={<HomePage/>}/>
       <Route path="/quick-search" element={<FilterSearchPage/>}/>
       <Route path="/restaurant/:id" element={<Restaurant/>}/>
    </Routes>
    </main>
    {/* <RegistrationForm/> */}
    </>
   
  );
}

export default App;
