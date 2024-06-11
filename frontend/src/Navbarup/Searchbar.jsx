import React from "react";
import "./navbarup.css"
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
    return (
        <div className="navbarup_searchbar">
            <select name="searchbar_select" id="searchbar" className="searchbar_select">
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
            </select>
            <form action="" className="searchbar_form">
                <input type="text" name="searchbar_input" id="searchbar" className="searchbar_input" />
                <button className="searchbar_button"><FaSearch className="searchbar_icon"/></button>
            </form>
        </div>
    );
};


export default Searchbar;
