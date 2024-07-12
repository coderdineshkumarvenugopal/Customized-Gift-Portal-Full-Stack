import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CustomizeGift.css';

function CustomizeGift() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Handle the selected image, e.g., store it in state
    setSelectedImage(file);
  };

  const handleOrderSummary = () => {
    const orderSummaryData = {
      productId: product.gid,
      image: selectedImage,
    };
    setOrderSummary(orderSummaryData);
  };

  return (
    <div>
    {navbar}
      <h1 style={{textAlign:'center'}}>Customize Gift</h1>
      {product && (
        <div className='card'>
           <h2>{product.gname}</h2>
          <p>{product.gdesc}</p>
          <p>Price: ${product.gprice}</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} /><br/><br/>
         <a href={`/order/${product.gid}`}> <button className="buy-now-button" onClick={handleOrderSummary}>Place Order</button></a>
        </div>
      )}
    </div>
  );
}

export default CustomizeGift;