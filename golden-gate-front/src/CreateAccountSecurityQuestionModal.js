import React from "react";
import "./CreateAccountSecurityQuestionModal.css"


export default class CreateAccountSecurityQuestionModal extends React.Component {
	constructor() {
		super()
		this.state = {
			divHeading1: "Click to select a security question...",
			divHeading2: "Click to select a security question...",
			divHeading3: "Click to select a security question...",
			showSecurityQuestions1: false,
			showSecurityQuestions2: false,
			showSecurityQuestions3: false,
			securityQuestionAnswer1: false,
			securityQuestionAnswer2: false,
			securityQuestionAnswer3: false,
			showSecurityQuestionSubmitButton: false
		}
	}

	selectSecurityQuestionClicked(num, e) {
		var showTheseSecurityQuestions = `showSecurityQuestions${num}`
		var newObject = {}
		
		if(this.state[showTheseSecurityQuestions]) {
			newObject[showTheseSecurityQuestions] = false
			this.setState(
				newObject
			, () => { var spanArrow = this.refs[`security-question-select-heading-arrow${num}`]; spanArrow.className = "security-question-select-heading-arrow" })
		} else {
			newObject[showTheseSecurityQuestions] = true
			this.setState(
				newObject
			, () => { var spanArrow = this.refs[`security-question-select-heading-arrow${num}`]; spanArrow.className = "security-question-select-heading-arrow up" })
		}
	}

	securityQuestionSelected(question, num) {
		
		var showTheseSecurityQUestions = `showSecurityQuestions${num}`
		var selectThisDivHeading = `divHeading${num}`
		var newObject = {}
		newObject[selectThisDivHeading] = question
		newObject[showTheseSecurityQUestions] = false
		this.setState(
			newObject
		, () => { var changeArrow = this.refs[`security-question-select-heading-arrow${num}`]; changeArrow.className = "security-question-select-heading-arrow" })
	}

	securityQuestionAnswerFieldChanged(num, e) {
		var securityQuestionAnswer = `securityQuestionAnswer${num}`
		var newObject = {}
		newObject[securityQuestionAnswer] = e.target.value
		this.setState (
			newObject
			, () => { 
					if (this.state.securityQuestionAnswer1 && this.state.securityQuestionAnswer2 
						&& this.state.securityQuestionAnswer3 
						&& this.state.divHeading1 !== "Click to select a security question..." 
						&& this.state.divHeading2 !== "Click to select a security question..." 
						&& this.state.divHeading3 !== "Click to select a security question...") {
						this.setState({
							showSecurityQuestionSubmitButton : true })
					} else {
						this.setState({
							showSecurityQuestionSubmitButton : false })
					}
				})
	}

	createAccountSecurityQuestionSubmitButtonClicked(e) {
		e.preventDefault()
		// var questionsAndAnswers = this.state.divHeading1
		var questionsAndAnswers = {
								[this.state.divHeading1]: this.state.securityQuestionAnswer1,
								[this.state.divHeading2]: this.state.securityQuestionAnswer2,
								[this.state.divHeading3]: this.state.securityQuestionAnswer3
		}
		this.props.createAccountSecurityQuestionModalSubmitButtonClicked(questionsAndAnswers)
	}


	render() {
		console.log(this.props)
		var repeatDiv = [1,2,3]
		return (

			<div id="create-account-security-question-modal-wrapper" className="create-account-security-question-modal-wrapper" ref="create-account-security-question-modal-wrapper" >
				<div id="create-account-security-question-modal-content" className="create-account-security-question-modal-content" >
					
					<div id="create-account-security-question-modal-header" className="create-account-security-question-modal-header" >
						<h2>ACCOUNT SECURITY QUESTION</h2>
						<h4>Please answer any three security questions to finish creating your account (required).</h4>
					</div>
					<form>

					{ repeatDiv.map((num, i) => { 
						let a = 0
						let b = 0
						if(i === 0) {
							a = 0
							b = 5
						} else if (i === 1) {
							a = 5
							b = 10
						} else if (i === 2) {
							a = 10
							b = 15
						}
						return (

							<div className="create-account-security-question-and-answer-div">

								<div className="security-question-select-heading-div" onClick={this.selectSecurityQuestionClicked.bind(this, num)} >
									{ this.state[`divHeading${num}`]}
									<span className="security-question-select-heading-arrow" ref={`security-question-select-heading-arrow${num}`}></span>
								</div>
								{ this.state[`showSecurityQuestions${num}`] ? <div className="list-security-questions-div" >{this.props.securityQuestions.slice(a,b).map((question) => {
																			return ( <div onClick={this.securityQuestionSelected.bind(this, question, num)} >{question}</div> ) }) 
																			} </div> : null 
								}
								
								<input type="text" placeholder="type your answer here" required className="security-answer-input-field" onChange={this.securityQuestionAnswerFieldChanged.bind(this, num)} />
							</div>
						)
					}  
					) }

					{ this.state.showSecurityQuestionSubmitButton ? <button type="submit" className="security-answer-input-field button" onClick={this.createAccountSecurityQuestionSubmitButtonClicked.bind(this)} >FINISH CREATING YOUR ACCOUNT</button> : null }
					</form>
				</div>
			</div>
			)
	}
} 


