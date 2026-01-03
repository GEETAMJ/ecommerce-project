import axios from "axios"
import { useEffect, useState, Fragment } from "react";
import { Header } from "../../components/Header";
import { OrdersHeader } from "./OrdersHeader";
import { OrderDetailsGrid } from "./OrderDetailsGrid";
import "./OrdersPage.css"

export function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('/api/orders?expand=products')
            .then((response => {
                setOrders(response.data);
            }))
    }, [])

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order) => {
                        return (
                            <div key={order.id} className="order-container">

                                <OrdersHeader order={order}/>

                                <OrderDetailsGrid order={order}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}