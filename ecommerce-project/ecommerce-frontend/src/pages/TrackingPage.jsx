import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { NavLink } from "react-router";
import { useParams } from "react-router";
import "./TrackingPage.css"
import "../components/Header.css"

export function TrackingPage({cart}) {
    const {orderId, productId} = useParams();
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }
        fetchTrackingData();
    }, [orderId]);
    if(!order)
    {
        return null;
    }
    const selectedProduct = order.products.find((product) => {
        return productId == product.productId;
    });
    let totalDeliverTimeMs = selectedProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    let timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    let deliveryProgress = (timePassedMs/totalDeliverTimeMs)*100;
    if(deliveryProgress > 100)
    {
        deliveryProgress = 100;
    }
    return (
        <>
            <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
            <Header cart={cart}/>

            <div className="tracking-page">
                <div className="order-tracking">
                    <NavLink className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </NavLink>

                    <div className="delivery-date">
                        {deliveryProgress < 100 ? "Arriving on" : "Delivered on"} {dayjs(selectedProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                    </div>

                    <div className="product-info">
                        {selectedProduct.name}
                    </div>

                    <div className="product-info">
                        Quantity: {selectedProduct.quantity}
                    </div>

                    <img className="product-image" src={selectedProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${deliveryProgress < 33 && "current-status"}`} >
                            Preparing
                        </div>
                        <div className={`progress-label ${(deliveryProgress >= 33 && deliveryProgress < 100) && "current-status"}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${deliveryProgress >= 100 && "current-status"}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div style={{width: `${deliveryProgress}%`}} className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    );
}