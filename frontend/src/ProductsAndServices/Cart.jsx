import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext.jsx';
import './cart.css';

function Cart() {
    const { cart, removeFromCart, total, updateQuantityInCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleInc = (event, id) => {
        event.preventDefault();
        const item = cart.find(item => item.id === id);
        if (item) {
            updateQuantityInCart(id, item.quantity_in_stock + 1);
        }
    };

    const handleDec = (event, id) => {
        event.preventDefault();
        const item = cart.find(item => item.id === id);
        if (item && item.quantity_in_stock > 1) {
            updateQuantityInCart(id, item.quantity_in_stock - 1);
        }
    };

    const handleRemove = async (event, id) => {
        event.preventDefault();
        removeFromCart(id);
    };

    const handleChangeQuantity = (event, itemId) => {
        const newQuantity = parseInt(event.target.value);
        updateQuantityInCart(itemId, newQuantity);
    };

    let content;
console.log('cart at Cart', cart);
    if (!cart || cart.length === 0) {
        content = <div style={{ color: 'black' }}>Cart is Empty</div>;
    } else {
        content = (
            <div className="a">
                <div className="b">
                    <div className="c">
                        <div className="d">
                            <h1 className="e">Shopping Cart</h1>
                            <h2 className="e">{cart.length} Items</h2>
                        </div>
                        <div className="f">
                            <h3 className="g">Product Details</h3>
                            <h3 className="h">Quantity</h3>
                            <h3 className="h">Price</h3>
                            <h3 className="h">Total</h3>
                        </div>
                        {cart.map((product, index) => (
                            product && <div className="j" key={product.id + "_" + index}>
                                <div className="k">
                                    <div className="l">
                                        <img className="m" src={product.image} alt={product.title} />
                                    </div>
                                    <form className="n">
                                        <span className="o">{product.title}</span>
                                        <span className="p">{product.category}</span>
                                        <button className="q" onClick={(event) => product && handleRemove(event, product.id)}>Remove</button>
                                    </form>
                                </div>
                                <div className="r">
                                    <button className="s" onClick={(event) => handleDec(event, product.id)}>-</button>
                                    <input className="t" type="text" value={product.quantity_in_stock} readOnly />
                                    <button className="u" onClick={(event) => handleInc(event, product.id)}>+</button>
                                </div>
                                <div className="x">${product.price}</div>
                                <span className="y">${(product.price * product.quantity_in_stock).toFixed(2)}</span>
                            </div>
                        ))}
                        <Link to={'/products'} className="z"> Continue Shopping </Link>
                    </div>
                    <div id="summary" className="ab">
                        <h1 className="ac">Order Summary</h1>
                        <div className="ad">
                            <span className="ae">Products {cart.length}</span>
                            <span className="af">${total.toFixed(2)}</span>
                        </div>
                        <div>
                            <label className="ag">Shipping</label>
                            <select className="ah">
                                <option>Standard shipping - $10.00</option>
                            </select>
                        </div>
                        <div className="ai">
                            <label htmlFor="promo" className="aj">Promo Code</label>
                            <input type="text" id="promo" placeholder="Enter your code" className="ak" />
                        </div>
                        <button className="al">Apply</button>
                        <div className="am">
                            <div className="an">
                                <span>Total cost</span>
                                <span>${(total + 10).toFixed(2)}</span>
                            </div>
                            <button onClick={() => navigate('/Login?redirect=/api/checkouttoshipping')} className="ao">
                                CheckoutToShipping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {content}
        </>
    );
}

export default Cart;
