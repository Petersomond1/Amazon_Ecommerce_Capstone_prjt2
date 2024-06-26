import Searchbar from './Searchbar';
import './navbarup.css';
import React, { useContext } from 'react';
import { BsGeoAlt } from "react-icons/bs";
import { CartContext } from '../ProductsAndServices/CartContext.jsx';
import { Link } from 'react-router-dom';

function Navbarup() {
    const { cart } = useContext(CartContext);
    const onSearch = (keyword) => {
        console.log(`Searching for ${keyword}`);
    };

    return (
        <header>
            <div className='navbarup'>
                <div style={{ display: 'flex' }}>
                    <div className='navbarup_amazon_logo'></div>
                    <div style={{ display: 'flex', marginLeft: '5px', marginRight: '10px' }}>
                        <span style={{ marginTop: '14px', color: 'white', fontSize: '18px' }}><BsGeoAlt /></span>
                        <div style={{ display: 'block' }}>
                            <div style={{ display: 'flex' }}>
                                <span><small>Delivering to</small></span>
                                <span>address</span>
                            </div>
                            <strong><span>Update location</span></strong>
                        </div>
                    </div>
                </div>
                <div style={{ marginLeft: '10px', marginRight: '10px' }}><Searchbar onSearch={onSearch} /></div>
                <div style={{ display: 'flex' }}>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <span className='lang_flag'></span>
                        <select className='navbarup_lang_select' name="language" id="language">
                            <option value="english">EN</option>
                            <option value="spanish">ES</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                        <div style={{ display: 'block' }}>
                            <span><small>Hello, Sign in</small></span><br />
                            <span><strong>Account & Lists</strong></span>
                        </div>
                        <select style={{ background: '#0707076c', color: 'white', border: 'none' }} name="Login" id="Login">
                            <option value="signin">
                            </option>
                        </select>
                    </div>

                    <div style={{ display: 'block', marginLeft: '5px', position: 'sticky', marginRight: '15px', marginTop: '10px' }}>
                        <span><small>Returns</small></span> <br />
                        <span><strong>& Orders</strong></span>
                    </div>
                    <Link to={"/api/cart"}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                        <div style={{ display: 'block', marginLeft: '5px', marginRight: '15px' }}>
                            <span className='navbarup_cart'>{cart?.length?? 0}</span>
                            {console.log(cart)};
                        </div>
                        <span style={{ marginTop: '15px' }}>Cart</span>
                    </div>
                    </Link>
                    <div style={{ display: 'block' }}>
                                <span><small>Your</small></span> <br />
                                <span><strong>Prime</strong></span>
                            </div>
                </div>
            </div>
        </header>
    );
}

export default Navbarup;
