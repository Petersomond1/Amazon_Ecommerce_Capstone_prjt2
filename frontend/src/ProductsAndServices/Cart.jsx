import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CartContext } from './CartContext.jsx';
import './cart.css';
import { useQuery } from 'react-query';
import axios from 'axios';

function Cart() {
    const { cart, setCart, total, setTotal, removeFromCart, updateQuantityInCart } = useContext(CartContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const getCart = async () => {
        const response = await axios.get("http://localhost:5000/api/cart");
        return response.data;
    };

    const { data, status } = useQuery("cart", getCart, {
        onSuccess: (data) => {
            setCart(data.cart);
            const totalValue = Number(data.total);
            setTotal(isNaN(totalValue) ? 0 : totalValue);
        }
    });

    useEffect(() => {
        if (status === 'error') {
            console.error('Error fetching cart:', data);
        }
    }, [status, data]);

    const handleInc = async (event, id) => {
        event.preventDefault();
        const product = cart.find(product => product.id === id);
        if (product) {
            await updateQuantityInCart(id, product.quantity_in_stock + 1);
        }
    };

    const handleDec = async (event, id) => {
        event.preventDefault();
        const product = cart.find(product => product.id === id);
        if (product && product.quantity_in_stock > 1) {
            await updateQuantityInCart(id, product.quantity_in_stock - 1);
        }
    };

    const handleRemove = async (event, id) => {
        event.preventDefault();
        await removeFromCart(id);
    };

    let content;

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
                                <div className="x">${Number(product.price).toFixed(2)}</div>
                                <span className="y">${(Number(product.price) * Number(product.quantity_in_stock)).toFixed(2)}</span>
                            </div>
                        ))}
                        <Link to={'/'} className="z"> Continue Shopping </Link>
                    </div>
                    <div id="summary" className="ab">
                        <h1 className="ac">Order Summary</h1>
                        <div className="ad">
                            <span className="ae">Products {cart.length}</span>
                            <span className="af">${Number(total).toFixed(2)}</span>
                        </div>
                        <div>
                            <label className="ag">Shipping</label>
                            <select className="ah">
                                <option>Standard shipping - $10.00</option>
                            </select>
                        </div>
                        <div className="ai">
                            <label className="ag">Promo Code</label>
                            <input id="promo-code" placeholder="Enter your code" className="aj"></input>
                            <button className="al">Apply</button>
                        </div>
                        <div className="ak">
                            <span className="al">Total Cost</span>
                            <span className="al">${(Number(total) + 10).toFixed(2)}</span>
                        </div>
                        <button className="am" onClick={() => navigate('/order')}>Checkout</button>
                    </div>
                </div>
            </div>
        );
    }

    return content;
}

export default Cart;
