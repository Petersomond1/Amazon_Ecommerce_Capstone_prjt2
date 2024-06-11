import React from 'react'
import './navbardown.css'
import { HiMiniUserCircle } from "react-icons/hi2";

const Sidebar = () => {


  return (
  <div className='sidebar'>
<div>
    <div className='nav-text'  style={{marginLeft: '10px', backgroundColor:'GrayText'}}>
<h1><HiMiniUserCircle  style={{size:'30', marginLeft: '10px', backgroundColor:'GrayText'}}/>Hello, Sign in </h1>
</div>
<hr />
<div>
    <h1>Trending</h1>
    <ul className='nav-text'>
        <li>Best Sellers</li>
        <li>New Releases</li>
        <li>Movers & Shakers</li>
   </ul>
</div>
<hr />
<div>
    <h1>Digital Content & Devices</h1>
   <ul className='nav-text'>
    <li>Amazon Luna-Cloud Gaming </li>
    <li>Prime Video</li>
    <li>Amazon Music</li>
    <li>Echo & Alexa</li>
    <li>Fire Tablets</li>
    <li>Fire TV</li>
    <li>Kindle E-readers & Books</li>
    <li>Audible Books & Originals</li>
    <li>Amazon Photos</li>
    <li>Amazon Appstore</li>
    </ul>
</div>
<hr />
<div>
    <h1>Shop By Department</h1>
    <ul className='nav-text'>
    <li>Clothing, Shoes, Jewelry & Watches</li>
    <li>Amazon Fresh</li>
    <li>Books</li>
    <li>Movies, Music & Games</li>
    <li>See all</li> 
    </ul>
</div>
<hr />
<div>
    <h1>Programs & Features</h1>
    <ul className='nav-text'>
    <li>Whole Foods Market</li>
    <li>Medical Care & Pharmacy</li>
    <li>Amazon Physical Stores</li>
    <li>Subscribe & Save</li>
    <li>See all</li>
    </ul>
</div>
<hr />
<div>
    <h1>Help & Settings</h1>
    <ul className='nav-text'>
    <li>Your Account</li>
    <li>English</li>
    <li>United States</li>
    <li>Sign in</li>
    </ul>
</div>
</div>
</div>
)}

export default Sidebar