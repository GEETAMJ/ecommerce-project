import { NavLink } from "react-router";
import "./CheckoutHeader.css"
import mobileLogo from "../../assets/mobile-logo.png";
import checkoutLockIcon from "../../assets/icons/checkout-lock-icon.png"

export function CheckoutHeader({cart}) {
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity
    })
    return (
        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <NavLink to="/">
                        <img className="logo" src="images/logo.png" />
                        <img className="mobile-logo" src={mobileLogo} />
                    </NavLink>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<NavLink className="return-to-home-link"
                        to="/">{totalQuantity} items</NavLink>)
                </div>

                <div className="checkout-header-right-section">
                    <img src={checkoutLockIcon} />
                </div>
            </div>
        </div>
    );
}