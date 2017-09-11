import React from "react";
import "./AccountCreatedMessageModal.css";

export default class AccountCreatedMessageModal extends React.Component {
	constructor() {
		super()
	}

	render() {
		return(
			<div id="account-created-message-modal-wrapper" className="account-created-message-modal-wrapper" >

				<div id="account-created-message-modal-content" ref="account-created-message-modal-content" className="account-created-message-modal-content" >

					<h3>Account Created Successfully!</h3>

				</div>
			</div>
			)
	}
}