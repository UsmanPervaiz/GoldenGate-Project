import React from 'react'
import Async from 'react-promise'
import "./ForgotPassword.css"

export default function ForgotPassword(props) {

	let forgotPasswordModalEmailContent = null;
	let forgotPasswordModalSecurityQuestionsContent = null;
	let forgotPasswordInputField = null;
	let forgotPasswordInputFieldLabel = null;
	let forgotPasswordSecurityAnswerInputField = null;
	let forgotPasswordSecurityAnswerInputFieldLabel = null;
	let forgotPasswordSecurityQuestionBodyDiv = null;
	let prom = new Promise(function(resolve, reject){
					setTimeout(function() { 
						resolve(<button type="submit" className="forgot-password-continue-button" onClick={(e)=>forgotPasswordContinueButtonClicked(e)} >Continue</button>)}, 2100)
				})
	let randomQuestion = Math.floor(Math.random() * 3)

	function forgotPasswordLabelClicked() {
		forgotPasswordInputFieldLabel.style.fontSize = "1em"
		forgotPasswordInputField.focus()
		
	}

	function forgotPasswordInputFieldFocused() {
		forgotPasswordInputFieldLabel.style.fontSize = "1em"
	}

	function forgotPasswordContinueButtonClicked(e) {
		e.preventDefault()
		let anonymousFuction = rotateForgotPasswordModal()
		props.forgotPasswordContinueButtonClicked(anonymousFuction)
	}

	function rotateForgotPasswordModal() {
		let a = forgotPasswordModalEmailContent;
		let b = forgotPasswordModalSecurityQuestionsContent;
		console.log(forgotPasswordSecurityQuestionBodyDiv)
		return function() {
				a.style.transform = "rotateY(180deg)";		
				b.style.transform = "rotateY(0deg)";
				b.style.zIndex ="2";
				
				setTimeout(function() { b.style.borderRadius = "0%"; b.style.color = "black";}, 800)
			
		}
	}

	function forgotPasswordSecurityAnswerInputFieldFocused() {
		forgotPasswordSecurityAnswerInputFieldLabel.style.fontSize = "0.5em"
	}
	console.log("XXXXXX", props.memberSecurityQuestions)
	return (
		<div className="forgot-password-modal-wrapper" >

			<div className="forgot-password-modal-email-content" ref={(div)=> forgotPasswordModalEmailContent = div} >
				<div className="forgot-password-modal-header" >
					<p>LET'S RESET YOUR PASSWORD</p>
				</ div>

				<div className="forgot-password-modal-body" >
					<form>
						<label onClick={() => forgotPasswordLabelClicked()} ref={(label) => {forgotPasswordInputFieldLabel = label} }  for="forgot-password-enter-email-field" className="forgot-password-enter-email-field-label" >Email</label>
						<input type="email" ref={(input) => { forgotPasswordInputField = input }} onFocus={()=> forgotPasswordInputFieldFocused()} onChange={(e) => props.forgotPasswordEmailChange(e)} name="forgot-password-enter-email-field" className="forgot-password-enter-email-field" />
						<Async promise={prom} then={(val) => val} />
					</ form>
				</ div>			
			</ div>

			<div className="forgot-password-modal-security-questions-content" ref={(div)=> forgotPasswordModalSecurityQuestionsContent = div} >
				{ props.memberSecurityQuestions ? 
						<div className="forgot-password-security-question-body-div" ref={(div)=> forgotPasswordSecurityQuestionBodyDiv = div} >
							<p>
								{props.memberSecurityQuestions[randomQuestion].question}
							</p>
							<label for="forgot-password-security-question-answer" ref={(label)=> forgotPasswordSecurityAnswerInputFieldLabel = label} className="forgot-password-security-question-answer-label" >Answer</label>
							<input type="text" name="forgot-password-security-question-answer" ref={(input)=> forgotPasswordSecurityAnswerInputField = input } className="forgot-password-security-question-answer-input-field" onFocus={()=> forgotPasswordSecurityAnswerInputFieldFocused()} />
						</div> : null }	
			</div>
		</ div>
		)
}


// {props.memberSecurityQuestions ? props.memberSecurityQuestions.map((quest) => quest.question) : null}
// Selects the divs that are direct children of "forgot-password-modal-wrapper":