import {Routes, Route} from 'react-router'
import axios from "axios"
import { useEffect, useState } from 'react'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const FetchAppData = async () => {
      const response = await axios.get('http://localhost:3000/api/cart-items?expand=product');
      setCart(response.data);
    }
    FetchAppData();
    }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>}/>
      <Route path="/checkout" element={<CheckoutPage cart={cart}/>}/>
      <Route path="/orders" element={<OrdersPage cart={cart}/>}/>
      <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default App
