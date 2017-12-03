import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from 'react-router-dom'
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
		console.log(this.props, "PROPSSS")
		e.preventDefault()
		if(this.props.appState.signinEmail && this.props.appState.signinPassword) {
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

	componentWillReceiveProps(nextProps) {
		if(window.location.pathname === "/forgotpassword") {
			this.props.navBarSigninCloseClicked()
		}
	}

	render() {
		return(
			<div id="user-sign-in-modal-wrapper" className="user-sign-in-modal-wrapper" ref="user-sign-in-modal-wrapper" onClick={this.navBarSigninCloseClicked.bind(this)} >

				<div className="hide-user-signin-modal-error-div" ref="user-signin-modal-error-div">
					<FontAwesome className="exclamation-triangle" name="wrench" spin size="2x"
				 	style={{ position: "absolute", display: "block", top: "9px", left: "4px", color: "black", }}/>
					<h4>There was a problem.</h4>
					<span id="signinErrorSpan" >{this.props.appState.signInAjaxErrorMessage}</span>
				</div>
			
				<div id="user-sign-in-modal-back-face" ref="user-sign-in-modal-back-face" className="user-sign-in-modal-back-face" onFocus={this.userSignInBackFaceFocused.bind(this)} >
						
					<div id="user-sign-in-modal-front-face" className="user-sign-in-modal-front-face" ref="user-sign-in-modal-front-face">
						<span className="front-face-text" ref="front-face-text">LOGIN</span>
						<span className="sign-in-loader1"></span>
						<span className="sign-in-loader2"></span>
						<span className="loader-text">Signing In</span>
					</div>

					<form onSubmit={this.signInModalSubmitButtonClicked.bind(this)}>
						<input type="email" placeholder="Email" className="sign-in-modal-input-field" required onChange={this.signinOnEmailChange.bind(this)} />
						<input type="password" placeholder="Password" className="sign-in-modal-input-field" required ref="sign-in-password-field" onChange={this.signinOnPasswordChange.bind(this)}/>
						<label htmlFor="sign-in-modal-checkbox" className="keep-me-signed-in-checkbox-label" >Keep me signed in</label>
						<input type="checkbox" id="sign-in-modal-checkbox" onChange={(e)=>this.props.keepMeSignedInClicked(e)} />
						<Link to="/forgotpassword" style={{display: "block", marginLeft: "8%", paddingTop: "2%" }} >Forgot your password?</Link>
						<button type="submit" className="sign-in-modal-submit-button" ></button>
					</form>
				</div>
			</div> 
			)
	}
}