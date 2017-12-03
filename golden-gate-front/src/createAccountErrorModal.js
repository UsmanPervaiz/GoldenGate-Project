import React from "react";
import "./createAccountErrorModal.css"

export default class CreateAccountErrorModal extends React.Component {
	constructor() {
		super()
	}

createAccountErrorModalCloseClicked() {
	var modalToAnimate = this.refs["create-account-error-modal-content"]
	modalToAnimate.className = "hide-create-account-error-modal-content"
	setTimeout(()=> this.props.createAccountErrorModalCloseClicked(), 800)
}

	render() {
		console.log("PROPSSSSS", Object.values(this.props.createAccountErrorResponseData.error))
		var accountErrors = []
		Object.values(this.props.createAccountErrorResponseData.error).map(function(errorArray) {
			console.log("ERRRORS", typeof errorArray)
				errorArray.forEach(function(error) {
					accountErrors.push(error)
				})
		})

		return (
			
				<div id="create-account-error-modal-wrapper" className="create-account-error-modal-wrapper" ref="create-account-error-modal-wrapper" >

					<div id="create-account-error-modal-content" ref="create-account-error-modal-content" className="create-account-error-modal-content">
						
					<div id="create-account-error-modal-header" className="create-account-error-modal-header">
						<span className="create-account-error-modal-close" onClick={this.createAccountErrorModalCloseClicked.bind(this)} >&times;</span>
						<h2>ERRORS FOUND!</h2>
					</div>

						<div id="create-account-error-modal-body" className="create-account-error-modal-body" >
						<ul className="create-account-error-list">
							{accountErrors.map((error)=> <li>{error}</li>)}
						</ul>
						</div>

					</div>
				</div>
			
			)
	}
}