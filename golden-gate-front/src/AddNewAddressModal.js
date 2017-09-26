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
		console.log(this.props)
		return (
			<div id="add-new-address-wrapper" className="add-new-address-wrapper" >

				<div id="add-new-address-modal-content" ref="add-new-address-modal-content" className="add-new-address-modal-content" >

					<div id="add-new-address-modal-header">
							<span className="add-new-address-modal-close" onClick={this.addNewAddressModalCloseClicked.bind(this)} >&times;</span>
							<h2>ADD A NEW ADDRESS</h2>
					</div>

					<div id="about-me-modal-body">
						<div id="new-address-zip-code-container" className="new-address-long-fields" >
							<label className="all-new-address-labels" htmlFor="new-address-zip-code">Zip Code</label>
							<input id="new-address-zip-code" className="all-new-address-input-fields" defaultValue="" onChange={(event)=>this.props.addNewZipCode(event)} onBlur={(event)=>this.props.autoFillCityAndState(event)} />
						</div>
						<div id="new-address-first-name" className="new-address-short-fields">
							<label className="all-new-address-labels" htmlFor="new-address-first-name">First Name</label>
							<input className="all-new-address-input-fields" id="new-address-first-name" type="text" defaultValue="Usman" />
					    </div>
					    <div id="new-address-last-name" className="new-address-short-fields">
					    	<label className="all-new-address-labels" htmlFor="new-address-last-name">Last Name</label>
							<input className="all-new-address-input-fields" id="new-address-last-name" type="text" defaultValue="Pervaiz" />					
						</div>
						<div id="new-address-line1-container" className="new-address-long-fields" >
							<label className="all-new-address-labels" htmlFor="new-address-line1-field">Street Address</label>
							<input id="new-address-line1-field" className="all-new-address-input-fields" />
						</div>
						<div id="new-address-line2-container" className="new-address-long-fields" >
							<label className="all-new-address-labels" htmlFor="new-address-line2-field">Apt #, Floor, etc. (Optional)</label>
							<input id="new-address-line2-field" className="all-new-address-input-fields" />
						</div>
						<div id="new-address-city-container" className="new-address-short-fields">
							<label className="all-new-address-labels" htmlFor="new-first-name">City</label>
							<input className="all-new-address-input-fields" id="new-address-city-field"  type="text" value={this.props.newAddressCity} readOnly="true" />
					    </div>
					    <div id="new-address-state-container" className="new-address-short-fields">
					    	<label className="all-new-address-labels" htmlFor="new-last-name">State</label>
							<input className="all-new-address-input-fields" id="new-address-state-field" type="text" value={this.props.newAddressState} readOnly="true" />					
						</div>
						<div id="save-new-address" className="new-address-long-fields">
							<button className="save-new-address-button">SAVE</button>
						</div>
					</div>

				</div>
			</div>
			)
	}
}