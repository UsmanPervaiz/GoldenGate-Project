import React from "react";
import "./CreateAccountSecurityQuestionModal.css"


export default class CreateAccountSecurityQuestionModal extends React.Component {
	constructor() {
		super()
		this.state = {
			selectHeading1: "Click to select a security question...",
			selectHeading2: "Click to select a security question...",
			selectHeading3: "Click to select a security question...",
			showSecurityQuestions1: "",
			showSecurityQuestions2: "",
			showSecurityQuestions3: "",
			securityQuestionAnswer1: "",
			securityQuestionAnswer2: "",
			securityQuestionAnswer3: "",
			showSecurityQuestionSubmitButton: false
		}
	}

	selectSecurityQuestionClicked(num, e) {
		var showTheseSecurityQuestions = `showSecurityQuestions${num}`
		var newObject = {}
		newObject[showTheseSecurityQuestions] = "show"
		
		if(this.state[showTheseSecurityQuestions]) {
			newObject[showTheseSecurityQuestions] = ""
			this.setState(
				newObject
			, () => { var spanArrow = this.refs[`security-question-select-heading-arrow${num}`]; spanArrow.className = "security-question-select-heading-arrow" })
		} else {
			this.setState(
				newObject
			, () => { var spanArrow = this.refs[`security-question-select-heading-arrow${num}`]; spanArrow.className = "security-question-select-heading-arrow up" })
		}
	}

	securityQuestionSelected(question, num) {
		console.log(question)
		var hideTheseSecurityQUestions = `showSecurityQuestions${num}`
		var selectThisHeading = `selectHeading${num}`
		var newObject = {}
		newObject[selectThisHeading] = question
		newObject[hideTheseSecurityQUestions] = ""
		this.setState(
			newObject
		, () => { var changeArrow = this.refs[`security-question-select-heading-arrow${num}`]; changeArrow.className = "security-question-select-heading-arrow" })
	}

	securityQuestionAnswerFieldChanged(num, e) {
		var securityQuestionAnswer = `securityQuestionAnswer${num}`
		var newObject = {}
		newObject[securityQuestionAnswer] = e.target.value
		if(this.state.securityQuestionAnswer1 && this.state.securityQuestionAnswer2 && this.state.securityQuestionAnswer3 && this.state.selectHeading1 !== "Click to select a security question..." && this.state.selectHeading2 !== "Click to select a security question..." && this.state.selectHeading3 !== "Click to select a security question...") {
			newObject.showSecurityQuestionSubmitButton = true
			this.setState(
				newObject 
				, ()=> console.log(this.state.securityQuestionAnswer3))
		} else {
			newObject.showSecurityQuestionSubmitButton = false
			this.setState(
				newObject 
				, ()=> console.log("mummy",this.state.securityQuestionAnswer3))
		}
	}


	render() {
		console.log(this.props)
		var repeatDiv = [1,2,3]
		return (

			<div id="create-account-security-question-modal-wrapper" className="create-account-security-question-modal-wrapper" ref="create-account-security-question-modal-wrapper" >
				<div id="create-account-security-question-modal-content" className="create-account-security-question-modal-content" >
					
					<div id="create-account-security-question-modal-header" className="create-account-security-question-modal-header" >
						<h2>ACCOUNT SECURITY QUESTION</h2>
						<h4>Please choose a security question to recover</h4>
					</div>


					{ repeatDiv.map((num, i) => { 
						var a = 0
						var b = 0
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
									{ this.state[`selectHeading${num}`]}
									<span className="security-question-select-heading-arrow" ref={`security-question-select-heading-arrow${num}`}></span>
								</div>
								{ this.state[`showSecurityQuestions${num}`] ? <div className="list-security-questions-div" >{this.props.securityQuestions.slice(a,b).map((question) => {
																		return ( <div onClick={this.securityQuestionSelected.bind(this, question, num)} > 
																					{question}
																				</div> )
								}) }</div> : null }
								
								<input type="text" placeholder="type your answer here" required className="security-answer-input-field" onChange={this.securityQuestionAnswerFieldChanged.bind(this, num)} />
							</div>
						)
					}  
					) }

					{ this.state.showSecurityQuestionSubmitButton ? <button type="submit" className="security-answer-input-field button">FINISH CREATING YOUR ACCOUNT</button> : null }
					
				</div>
			</div>
			)
	}
} 


