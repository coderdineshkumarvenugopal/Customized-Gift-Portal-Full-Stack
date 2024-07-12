import React from 'react';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import GiftProductList from './Components/GiftHome';
import Cart from './Components/Cart';
import CustomizeGift from './Components/CustomizeGift';
import OrderConfirmation from './Components/OrderConfirmation';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegistrationForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/gift-shop' element={<GiftProductList/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/cust/:gid' element={<CustomizeGift/>}/>
          <Route path='/order/:gid' element={<Cart/>}/>
          <Route path='/order-confirmation' element={<OrderConfirmation/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  
  );
}

export default App;
