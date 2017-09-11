import React from "react";
import FontAwesome from "react-fontawesome";
import "./UserLogInModal.css";


export default class UserLogInModal extends React.Component {
	constructor() {
		super()
	}

	userSignInBackFaceFocused() {
		var a = this.refs["user-sign-in-modal-back-face"]
		a.className = "user-sign-in-modal-back-face focused"
		var b = this.refs["front-face-text"]
		b.className = "front-face-text focused"
	}

	signInModalSubmitButtonClicked(e) {
		if(this.props.mainState.signinEmail && this.props.mainState.signinPassword) {
			e.preventDefault()
			var logInForm = this.refs["user-sign-in-modal-back-face"]
			logInForm.className = "user-sign-in-modal-back-face loading" 
			var signInModalErrorDiv = this.refs["user-signin-modal-error-div"]
			setTimeout(()=> this.props.signInModalSubmitButtonClicked(e, signInModalErrorDiv, logInForm), 2000)
		} 
	}

	navBarSigninCloseClicked(e) {
		var eventTarget = e.target
		if(eventTarget === this.refs["user-sign-in-modal-wrapper"]) {
			this.props.navBarSigninCloseClicked()
		}
	}

	signinOnEmailChange(e) {
		this.props.signinOnEmailChange(e)
	}

	signinOnPasswordChange(e) {
		var signInPasswordField = this.refs["sign-in-password-field"]
		this.props.signinOnPasswordChange(e, signInPasswordField)
	}

	render() {
		return(
			<div id="user-sign-in-modal-wrapper" className="user-sign-in-modal-wrapper" ref="user-sign-in-modal-wrapper" onClick={this.navBarSigninCloseClicked.bind(this)} >

				<div className="hide-user-signin-modal-error-div" ref="user-signin-modal-error-div">
					<FontAwesome className="exclamation-triangle" name="wrench" spin size="2x"
				 	style={{ position: "absolute", display: "block", top: "9px", left: "4px", color: "black", }}/>
					<h4>There was a problem.</h4>
					<span id="signinErrorSpan" >{this.props.mainState.signInAjaxErrorMessage}</span>
				</div>
			
				<div id="user-sign-in-modal-back-face" ref="user-sign-in-modal-back-face" className="user-sign-in-modal-back-face" onFocus={this.userSignInBackFaceFocused.bind(this)} >
						
					<div id="user-sign-in-modal-front-face" className="user-sign-in-modal-front-face" ref="user-sign-in-modal-front-face">
						<span className="front-face-text" ref="front-face-text">LOGIN</span>
						<span className="sign-in-loader1"></span>
						<span className="sign-in-loader2"></span>
						<span className="loader-text">Signing In</span>
					</div>

					<form>
						<input type="text" placeholder="Email" className="sign-in-modal-input-field" required onChange={this.signinOnEmailChange.bind(this)} />
						<input type="text" placeholder="Password" className="sign-in-modal-input-field" required ref="sign-in-password-field" onChange={this.signinOnPasswordChange.bind(this)}/>
						<button type="submit" className="sign-in-modal-submit-button" onClick={this.signInModalSubmitButtonClicked.bind(this)} ></button>
					</form>

					<input type="checkbox" value="keep-me-signed-in" id="sign-in-modal-checkbox"/><span id="sign-in-modal-checkbox" >Keep me signed in.</span>
					<a href="#" id="forgot-password" >Forgot your password?</a>
				</div>
			</div> 
			)
	}
}