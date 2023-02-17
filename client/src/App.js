import { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Store } from './screens/Store';

function App() {
  const {state} = useContext(Store);
  const {cart } = state
  
  return (
    <BrowserRouter>
      <div>
        <header>
         <div className='logo'>
         <Link to="/">RedaShop</Link>
         </div>
          <nav className='navbar'>
            <ul>
              <li className='cart'>
                Cart {cart.cartItems.length > 0 && (<span className='danger'> {cart.cartItems.reduce((a, c) => a + c.quantity, 0)} </span>)}
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
