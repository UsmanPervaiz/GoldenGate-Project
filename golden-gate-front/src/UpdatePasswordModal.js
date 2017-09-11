import React from "react";
import "./UpdatePasswordModal.css"

export default class UpdatePasswordModal extends React.Component {


	updatePasswordClicked() {

	}

	updatePasswordModalCloseClicked() {
		var a = this.refs["update-password-modal-content"]
		a.className = "hide-update-password-modal-content"
		setTimeout(()=> this.props.updatePasswordModalCloseClicked(), 800)
	}

	render() {

		return (
			<div id="update-password-modal-wrapper" className="update-password-modal-wrapper" ref="update-password-modal-wrapper" >

				<div id="update-password-modal-content" className="update-password-modal-content" ref="update-password-modal-content">
					<div id="update-password-modal-header" className="update-password-modal-header">
						<span className="update-password-modal-close" onClick={this.updatePasswordModalCloseClicked.bind(this)} >&times;</span>
						<h2>UPDATE PASSWORD</h2>
					</div>

					<div id="update-password-modal-body" className="update-password-modal-body">

						<div id="current-password-container" className="current-password-container">
							<label className="update-password-input-field-labels" htmlFor="current-password-input-field">Current Password</label>
							<input type="password" id="current-password-input-field" className="update-password-input-fields" defaultValue="abc123" />
							
						</div>
						<div id="new-password" className="update-password-container">
							<label className="update-password-input-field-labels" htmlFor="current-password-input-field">New Password</label>
							<input type="text" id="current-password-input-field" className="update-password-input-fields" defaultValue="abc123" />
						</div>
						<div id="confirm-new-password" className="update-password-container">
							<label className="update-password-input-field-labels" htmlFor="current-password-input-field">Confirm Password</label>
							<input type="text" id="current-password-input-field" className="update-password-input-fields" defaultValue="abc123" />
						</div>
						<div id="save-new-password" className="update-password-container">
							<button className="update-password-button">UPDATE</button>
						</div>
					</div>
				</div>
			</div>

			)
	}
}