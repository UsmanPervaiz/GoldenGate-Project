import React from 'react';
import "./Checkout.css";

export default class Checkout extends React.Component {

	constructor() {
		super()
	}


	render() {
		return (
			<div id="checkout-container">

				<div id="checkout-header-div">
					<h2>CHECKOUT</h2>
				</div>

				<div id="shipping-info-div">
					<h2>SHIPPING INFO
					<span id="required-label">Required</span></h2>
					<h5>Where do you want to ship your order?</h5>
				</div>

				<div id="shipping-address-container">
					<h4>Saved Addresses</h4>
					<div id="saved-address-div">

					</div>
				</div>

				<div id="shipping-options-container">
					<h3>Shipping Options</h3>
				</div>
			</div>)
	}
}