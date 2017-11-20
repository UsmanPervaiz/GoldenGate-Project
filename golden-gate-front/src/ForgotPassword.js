import React from 'react'
import Async from 'react-promise'
import "./ForgotPassword.css"

export default function ForgotPassword(props) {

	let forgotPasswordModalWrapper = null;
	let forgotPasswordModalEmailContent = null;
	let forgotPasswordModalSecurityQuestionsContent = null;
	let forgotPasswordInputField = null;
	let forgotPasswordInputFieldLabel = null;
	let forgotPasswordSecurityAnswerInputField = null;
	let forgotPasswordSecurityAnswerInputFieldLabel = null;
	let forgotPasswordSecurityQuestionBodyDiv = null;
	let forgotPasswordModalNewPasswordContent = null;
	let forgotPasswordNewPasswordInputFieldLabel = null;
	let forgotPasswordNewPasswordInputField = null;

	let prom = new Promise(function(resolve, reject){
					setTimeout(function() { 
						resolve(<button type="submit" className="forgot-password-continue-button" >Continue</button>)}, 2100)
				})
	// let randomQuestion = Math.floor(Math.random() * 3)

	function inputFieldLabelClicked(inputFieldLabel, inputField) {
		inputFieldLabel.style.fontSize = "0.7em"
		inputField.focus()	
	}

	function inputFieldFosuced(inputFieldLabel) {
		inputFieldLabel.style.fontSize = "0.7em"
	}

	function forgotPasswordContinueButtonClicked(e, prevContentDiv, newContentDiv) {
		e.preventDefault()
		let rotateContentDivsAnonymousFunction = rotateContentDivs(prevContentDiv, newContentDiv)
		props.forgotPasswordContinueButtonClicked(rotateContentDivsAnonymousFunction)
	}

	function rotateContentDivs(prevContentDiv, newContentDiv) {
		let a = prevContentDiv;
		let b = newContentDiv;
		return function() {
				a.style.transform = "rotateY(180deg)";
				a.style.overflow = "hidden";
				// a.style.backfaceVisibility = "hidden";		
				b.style.transform = "rotateY(0deg)";
				setTimeout(function() { b.style.borderRadius = "0%"; b.style.color = "black";}, 800)
			
		}
	}

	function memberInputtingSecurityQuestionAnswer(e) {
		props.memberInputtingSecurityQuestionAnswer(e)
	}

	function memberWantsToSubmitAnswer(e) {
		let anonymousFuction = rotateContentDivs(forgotPasswordModalSecurityQuestionsContent, forgotPasswordModalNewPasswordContent)
		props.memberWantsToSubmitAnswer(e, props.memberSecurityQuestions[props.forgotPasswordRandomNumber], anonymousFuction)
	}

	function memberWantsToSubmitNewPassword() {
		props.memberWantsToSubmitNewPassword()
	}

	function forgotPasswordCloseErrorMessage() {
		props.forgotPasswordCloseErrorMessage()
	}

	function closeForgotPasswordModal(e){
		if (e.target === forgotPasswordModalWrapper) {
			props.closeForgotPasswordModal()
		}
		
	}

	console.log("PROPS", props)

	return (
		<div className="forgot-password-modal-wrapper" ref={(div)=> forgotPasswordModalWrapper = div}  onClick={(e)=> closeForgotPasswordModal(e)}>

			{ props.forgotPasswordErrors ? 
				<div className="forgot-password-modal-error-div">
					<div>
						{props.forgotPasswordErrors[Object.keys(props.forgotPasswordErrors)[0]]}
						<span id="forgot-password-close-error-message" onClick={()=> forgotPasswordCloseErrorMessage()} >Close</span>
					</div>
				</div> : null
			}

			<div className="forgot-password-modal-email-content" ref={(div)=> forgotPasswordModalEmailContent = div} >
				<div className="forgot-password-modal-header" >
					<p>LET'S RESET YOUR PASSWORD</p>
				</ div>

				<div className="forgot-password-modal-body" >
					<form onSubmit={(e)=>forgotPasswordContinueButtonClicked(e, forgotPasswordModalEmailContent, forgotPasswordModalSecurityQuestionsContent)}>
						<label onClick={() => inputFieldLabelClicked(forgotPasswordInputFieldLabel, forgotPasswordInputField)} ref={(label) => {forgotPasswordInputFieldLabel = label} }  for="forgot-password-enter-email-field" className="forgot-password-enter-email-field-label" >Email</label>
						<input type="email" required ref={(input) => { forgotPasswordInputField = input }} onFocus={()=> inputFieldFosuced(forgotPasswordInputFieldLabel)} onChange={(e) => props.forgotPasswordEmailChange(e)} name="forgot-password-enter-email-field" className="forgot-password-enter-email-field" />
						{props.forgotPasswordInvalidEmail ? 
							<div id="forgot-password-invalid-email-error">
								No account found with this email!
							</div> : null
						}
						<Async promise={prom} then={(val) => val} />
						
					</form>
				</ div>			
			</ div>

			<div className="forgot-password-modal-security-questions-content" ref={(div)=> forgotPasswordModalSecurityQuestionsContent = div} >
				{ props.memberSecurityQuestions ? 
						<div className="forgot-password-security-question-body-div" ref={(div)=> forgotPasswordSecurityQuestionBodyDiv = div} >
							<p>
								{props.memberSecurityQuestions[props.forgotPasswordRandomNumber].question}
							</p>
							<form>
							<label for="forgot-password-security-question-answer" ref={(label)=> forgotPasswordSecurityAnswerInputFieldLabel = label} className="forgot-password-security-question-answer-label" onClick={() => inputFieldLabelClicked(forgotPasswordSecurityAnswerInputFieldLabel, forgotPasswordSecurityAnswerInputField)} >Answer</label>
							<input type="text" required name="forgot-password-security-question-answer" ref={(input)=> forgotPasswordSecurityAnswerInputField = input } className="forgot-password-security-question-answer-input-field" onFocus={()=> inputFieldFosuced(forgotPasswordSecurityAnswerInputFieldLabel)} onChange={(e)=> memberInputtingSecurityQuestionAnswer(e)} />
							{props.forgotPasswordInvalidAnswer ? 
								<div id="forgot-password-invalid-answer-div">
									Wrong Answer!
								</div> : null
							}
							<span id="forgot-password-modal-security-question-next-button" onClick={(e)=> memberWantsToSubmitAnswer(e)} ></span>
							</form>
						</div> 
						: null }	
			</div>

			<div className="forgot-password-modal-new-password-content" ref={(div)=> forgotPasswordModalNewPasswordContent = div} >
				<div className="forgot-password-security-question-body-div password-body-div">
					<p>
						New Password
					</p>
					<label for="forgot-password-new-password-input-filed" ref={(label)=> forgotPasswordNewPasswordInputFieldLabel = label} className="forgot-password-security-question-answer-label" onClick={() => inputFieldLabelClicked(forgotPasswordNewPasswordInputFieldLabel, forgotPasswordNewPasswordInputField)} >Password</label>
					<input type="text" name="forgot-password-new-password-input-filed" ref={(input)=> forgotPasswordNewPasswordInputField = input} className="forgot-password-security-question-answer-input-field" onFocus={()=> inputFieldFosuced(forgotPasswordNewPasswordInputFieldLabel)} onChange={(e)=> props.memberEnteringNewPassword(e)} />
					<span id="forgot-password-modal-security-question-next-button" onClick={(e)=> memberWantsToSubmitNewPassword(e)} ></span>
				</div>
			</div>

		</ div>
		)
}


// {props.memberSecurityQuestions ? props.memberSecurityQuestions.map((quest) => quest.question) : null}
// Selects the divs that are direct children of "forgot-password-modal-wrapper":