import React from 'react'
import { SlMenu } from 'react-icons/sl';
import './navbardown.css';
import { IconContext } from 'react-icons';
import { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Navbardown = () => {
    const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

    
    return (
        <>
<div className='navbardown'>
    <IconContext.Provider value={{color: 'underfined'}}>
                    <div className='navbar'>
                    <Link to="#" className="menu-bars">
                        <span style={{fontSize: '1.5rem'}}><SlMenu  onClick={showSidebar}/></span>
                        <span>All</span>
                    </Link>
                    </div>
                    <div style={{ marginLeft:'15px'}}>
                    <span >Medical Care</span>
                    <span style={{marginLeft:'15px'}}>Groceries</span>
                    <span style={{marginLeft:'15px'}}>Best Sellers</span>
                    <span style={{marginLeft:'15px'}}>Amazon Basics</span>
                    <span style={{marginLeft:'15px'}}>Prime</span>
                    <span style={{marginLeft:'15px'}}>New Releases</span>
                    <span style={{marginLeft:'15px'}}>Customer Service</span>
                    <span style={{marginLeft:'15px'}}>Music</span>
                    </div>
                    <span style={{marginLeft:'35px', position:'sticky'}}>Today's Deals</span>

                    <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <div className="nav-menu-items" onClick={showSidebar}>
            <span className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </span>
            <Sidebar />
          </div>
        </nav>
                </IconContext.Provider>
                </div>

       
         </>
    )
}

export default Navbardown


