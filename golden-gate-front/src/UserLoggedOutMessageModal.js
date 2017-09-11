
import React from "react";
import "./UserLoggedOutMessageModal.css"

export default class UserLoggedOutMessageModal extends React.Component {
	constructor(){
		super()

	}

	render() {
		return(
			<div id="user-logged-out-modal-wrapper" className="user-logged-out-modal-wrapper" >

				<div id="user-logged-out-modal-content" ref="user-logged-out-modal-content" className="user-logged-out-modal-content" >

					
						<h3>Successfully Logged Out!</h3>
					
				</div>
			</div>
			)
	}
}