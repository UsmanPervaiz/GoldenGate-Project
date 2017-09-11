
import React from "react";
import "./UserSignedInMessageModal.css"

export default class UserSignedInMessageModal extends React.Component {
	constructor(){
		super()

	}

	render() {
		return(
			<div id="user-signed-in-modal-wrapper" className="user-signed-in-modal-wrapper" >

				<div id="user-signed-in-modal-content" ref="user-signed-in-modal-content" className="user-signed-in-modal-content" >

					
						<h3>Successfully Logged In!</h3>
					
				</div>
			</div>
			)
	}
}