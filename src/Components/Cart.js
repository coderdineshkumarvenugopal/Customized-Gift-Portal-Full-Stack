import React, { useState, useEffect } from 'react';
import {useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './OrderSummary.css';

function OrderSummary() {
  const [product, setProduct] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const navigate = useNavigate();
  const navbar = (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/orders">Orders</Link></li>
      </ul>
    </nav>
  );
  const [paymentMethod, setPaymentMethod] = useState('gpay');
  useEffect(() => {
    const id = parseInt(window.location.pathname.split('/')[2]);
    axios
      .get(`http://127.0.0.1:8096/show/${id}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  const handleOrderSummary = () => {
    const orderSummaryData = {
      productId: product.gid,
    };
    setOrderSummary(orderSummaryData);
  };


const handlePaymentMethodChange = (e) => {
  const paymentMethod = e.target.value;
  setPaymentMethod(paymentMethod);
};
const handlePlaceOrder = () => {
    const orderData = {
      type_of_delivery: paymentMethod,
      cust_id: 1,
    };
   
    axios
      .post('http://127.0.0.1:8096/neworder', orderData)
      .then((response) => {
        console.log('Order placed successfully');
        navigate('/order-confirmation');
      })
      .catch((error) => {
        console.log('Error placing order: ', error);
      });
  };
  
  
  return (
    <div>
    {navbar}
        <h1 style={{textAlign:"center"}}>Order Summary</h1>  
      {product && (
          <div className='order-summary'>
          <span><h2>Product Name: </h2>{product.gname}</span>
          <h2>Price: </h2><p>${product.gprice}</p>
          <h2>Payment Method : </h2>
          <div>
    <input type="radio" name="paymentMethod" value="gpay" checked={paymentMethod === 'gpay'} onChange={handlePaymentMethodChange} />
    <label for="gpay">GPay</label>
  </div>
  <div>
    <input type="radio" name="paymentMethod" value="paytm" checked={paymentMethod === 'paytm'} onChange={handlePaymentMethodChange} />
    <label for="paytm">Paytm</label>
  </div>
  <div>
    <input type="radio" name="paymentMethod" value="phonepe" checked={paymentMethod === 'phonepe'} onChange={handlePaymentMethodChange} />
    <label for="paytm">PhonePe</label>
  </div>
  <div>
    <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={handlePaymentMethodChange} />
    <label for="COD">Cash on Delivery</label>
  </div><br/>
          <button className="buy-now-button" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;