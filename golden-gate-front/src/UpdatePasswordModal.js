import React from "react";
import "./UpdatePasswordModal.css"

export default class UpdatePasswordModal extends React.Component {


	updatePasswordModalCloseClicked(arg) {
		if(arg === "close") {
			var a = this.refs["update-password-modal-content"]
			a.className = "hide-update-password-modal-content"
			setTimeout(()=> this.props.updatePasswordModalCloseClicked(), 800)
		}
		else {
			var a = this.refs["update-password-modal-content"]
			a.className = "hide-update-password-modal-content password-updated-successfully"
			setTimeout(()=> this.props.updatePasswordModalCloseClicked(), 1900)

		}
	}

	render() {
		console.log("UPDATED", this.props)
		return (
			<div id="update-password-modal-wrapper" className="update-password-modal-wrapper" ref="update-password-modal-wrapper" >
				<div className="show-password-updated-text" ref="show-password-updated-text"  >
				"Password Updated Successfully!"
				</div>
				<div id="update-password-modal-content" className="update-password-modal-content" ref="update-password-modal-content">
					<div id="update-password-modal-header" className="update-password-modal-header" ref="update-password-modal-header">
						<span className="update-password-modal-close" onClick={this.updatePasswordModalCloseClicked.bind(this, "close")} >&times;</span>
						<h2>UPDATE PASSWORD</h2>
					</div>

					<div id="update-password-modal-body" className="update-password-modal-body" ref="update-password-modal-body">
						<form onSubmit={(event) => this.props.saveNewPasswordClicked(event, this.updatePasswordModalCloseClicked.bind(this))} >
						<div id="current-password-container" className="current-password-container">
						<p id="currentPasswordError" style={this.props.currentPasswordErrorDisplay} > {this.props.currentPasswordError} </p>
							<label className="update-password-input-field-labels" htmlFor="current-password-input-field">Current Password</label>
							<input required type="password" id="current-password-input-field" className="update-password-input-fields" defaultValue="" onChange={(event) => this.props.currentPasswordChanged(event)} />
							
						</div>
						<div id="new-password" className="update-password-container">
							<label className="update-password-input-field-labels" htmlFor="current-password-input-field">New Password</label>
							<input required type="password" id="new-password-input-field" className="update-password-input-fields" defaultValue="" onChange={(event) => this.props.newPasswordChanged(event)} />
							<p id="newPasswordError" style={this.props.newPasswordErrorDisplay} > {this.props.newPasswordError} </p>
						</div>
						<div id="confirm-new-password" className="update-password-container">
							<label className="update-password-input-field-labels" htmlFor="current-password-input-field">Confirm Password</label>
							<input required type="password" id="confirm-new-password-input-field" className="update-password-input-fields" defaultValue="" onChange={(event) => this.props.confirmNewPasswordChanged(event)} />
							<p id="newPasswordConfirmError" style={this.props.newPasswordConfirmErrorDisplay} > {this.props.newPasswordConfirmError} </p>
						</div>
						<div id="save-new-password" className="update-password-container">
							<button type="submit" className="update-password-button" >UPDATE</button>
						</div>
						</form>
					</div>
				</div>
			</div>

			)
	}
}