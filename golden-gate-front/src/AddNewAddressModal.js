import React from "react";
import axios from "axios"
import $ from 'jquery'
import "./AddNewAddressModal.css";

export default class AddNewAddressModal extends React.Component {

	addNewAddressModalCloseClicked() {
		var modalToAnimate = this.refs["add-new-address-modal-content"]
		modalToAnimate.className = "hide-add-new-address-modal-content"
		setTimeout(()=> this.props.addNewAddressModalCloseClicked(),800)
	}

	render() {
		console.log("ADDRESS", this.props.newAddressData)
		return (
			<div id="add-new-address-wrapper" className="add-new-address-wrapper" >

				<div id="add-new-address-modal-content" ref="add-new-address-modal-content" className="add-new-address-modal-content" >

					<div id="add-new-address-modal-header">
							<span className="add-new-address-modal-close" onClick={this.addNewAddressModalCloseClicked.bind(this)} >&times;</span>
							<h2>ADD A NEW ADDRESS</h2>
					</div>

					<div id="about-me-modal-body">
					<form onSubmit={(event)=>this.props.addNewAddressSaveButtonClicked(event)} >
						<div id="new-address-zip-code-container" className="new-address-long-fields" >
							<label className="all-new-address-labels" htmlFor="new-address-zip-code">Zip Code</label>
							<input id="new-address-zip-code" required className="all-new-address-input-fields" defaultValue="" onChange={(event)=>this.props.addNewAddressDataChanged(event, "newAddressZipCode")} />
						</div>
						<div id="new-address-first-name" className="new-address-short-fields">
							<label className="all-new-address-labels" htmlFor="new-address-first-name">First Name</label>
							<input className="all-new-address-input-fields" required id="new-address-first-name" type="text" defaultValue="" onChange={(event)=>this.props.addNewAddressDataChanged(event, "newAddressFirstName")} />
					    </div>
					    <div id="new-address-last-name" className="new-address-short-fields">
					    	<label className="all-new-address-labels" htmlFor="new-address-last-name">Last Name</label>
							<input className="all-new-address-input-fields" required id="new-address-last-name" type="text" defaultValue="" onChange={(event)=>this.props.addNewAddressDataChanged(event, "newAddressLastName")}/>					
						</div>
						<div id="new-address-line1-container" className="new-address-long-fields" >
							<label className="all-new-address-labels" htmlFor="new-address-line1-field">Street Address</label>
							<input id="new-address-line1-field" required className="all-new-address-input-fields" onChange={(event)=>this.props.addNewAddressDataChanged(event, "newAddressLine1")} />
						</div>
						<div id="new-address-line2-container" className="new-address-long-fields" >
							<label className="all-new-address-labels" htmlFor="new-address-line2-field">Apt #, Floor, etc. (Optional)</label>
							<input id="new-address-line2-field" className="all-new-address-input-fields" onChange={(event)=>this.props.addNewAddressDataChanged(event, "newAddressLine2")} />
						</div>
						<div id="new-address-city-container" className="new-address-short-fields">
							<label className="all-new-address-labels" htmlFor="new-address-city-field">City</label>
							<input className="all-new-address-input-fields" id="new-address-city-field"  type="text" value={this.props.newAddressData.newAddressCity} readOnly="true" />
					    </div>
					    <div id="new-address-state-container" className="new-address-short-fields">
					    	<label className="all-new-address-labels" htmlFor="new-address-state-field">State</label>
							<input className="all-new-address-input-fields" id="new-address-state-field" type="text" value={this.props.newAddressData.newAddressState} readOnly="true" />					
						</div>
						<div id="new-address-phone-container" className="new-address-long-fields">
							<label className="all-new-address-labels" htmlFor="new-address-phone-field">Phone Number</label>
							<input className="all-new-address-input-fields" id="new-address-phone-field" required type="text" defaultValue="" onChange={(event)=>this.props.addNewAddressDataChanged(event, "newAddressPhoneNumber")} />
						</div>
						<div id="new-address-type-container" className="new-address-long-fields">
					
							<input type="radio" id="radio1" name="address-type" value="billing" className="address-type-radio-buttons" onChange={(event)=> this.props.addNewAddressDataChanged(event, "newAddressType")} />
							<label htmlFor="radio1">Billing</label>
							<input type="radio" id="radio2" name="address-type" value="shipping" className="address-type-radio-buttons" onChange={(event)=> this.props.addNewAddressDataChanged(event, "newAddressType")} />
							<label htmlFor="radio2">Shipping</label>
							<input type="checkbox" id="radio3" name="address-default" className="address-type-radio-buttons" onChange={(event)=> this.props.addNewAddressDataChanged(event, "newAddressDefault")}/>
							<label htmlFor="radio3">Default</label>
						</div>
						<div id="save-new-address" className="new-address-long-fields">
							<button type="submit" className="save-new-address-button">SAVE</button>
						</div>
						</form>
					</div>

				</div>
			</div>
			)
	}
}