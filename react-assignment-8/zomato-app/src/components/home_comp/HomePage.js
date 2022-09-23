import React from 'react'
import QuickSearch from './QuickSearch';
import Wallpaper from './Wallpaper';

function HomePage() {
  return (
    <>
    <Wallpaper/>
    <QuickSearch/>
    </>
  )
}

export default HomePage;

// http://localhost:4000/api/get-restaurant-by-location-id?lid=1&rest=do