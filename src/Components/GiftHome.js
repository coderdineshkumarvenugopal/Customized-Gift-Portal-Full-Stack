import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GiftHome.css'
import { Link } from 'react-router-dom';

function GiftProductList() {
  const [giftProducts, setGiftProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const gift_photos = [
    "gift1.jpg",
    "gift2.jpg",
    "gift3.jpg",
    "gift4.jpg",
    "gift5.jpg",
  ];
  
  for (let i = 0; i < giftProducts.length; i++) {
    giftProducts[i]["photo"] = gift_photos[Math.floor(Math.random() * gift_photos.length)];
  }
  

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8096/show')
      .then((response) => {
        const giftProductsData = response.data;
        setGiftProducts(giftProductsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
    {navbar}
      <h1 style={{textAlign:'center',}}>Gift Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="gift-card-container">
          {giftProducts.map((product) => (
            <div key={product.gid} className="gift-card">
              <h2>{product.gname}</h2>
              <p>{product.gdesc}</p>
              <p>Price: ${product.gprice}</p>
              {/* <img src={product.photo} alt={product.gname} /> */}

              {/* <Link
                to={{
                  pathname: '/cart',
                  state: { product }, // Pass the selected product as state
                }}
              >
                <button className="buy-now-button">Buy Now</button>
              </Link> */}
              &nbsp;&nbsp;&nbsp;
              <a href={`/cust/${product.gid}`}>
                <button className="buy-now-button">Customize</button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GiftProductList;