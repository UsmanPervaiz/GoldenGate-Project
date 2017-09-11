import React from "react";
import "./Register.css"
import FontAwesome from "react-fontawesome"
import NavBar from "./NavBar.js"
import Validation from "react-validation"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import axios from "axios"
import CreateAccountErrorModal from "./createAccountErrorModal"
import CreateAccountSecurityQuestionModal from "./CreateAccountSecurityQuestionModal.js"


export default class Register extends React.Component{ c

	constructor() {
		super()
		this.state= {
			createAccountInvalidData: false,
			createAccountErrorModal: "hide-create-account-error-modal",
			createAccountErrorResponseData: "",
			createAccountFirstName: "",
			createAccountFirstNameError: "",
			createAccountFirstNameErrorDisplay: {display: "none"},
			createAccountLastName: "",
			createAccountLastNameError: "",
			createAccountLastNameErrorDisplay: {display: "none"},
			createAccountEmailField: "",
			createAccountEmailFieldError: "",
			createAccountEmailFieldErrorDisplay: {display: "none"},
			createAccountEmailConfirm: "", 
			createAccountConfirmEmailFieldError: "Typo! emails do not match.",
			createAccountConfirmEmailFieldErrorDisplay: { display: "none" },
			createAccountPassword: "",
			createAccountPasswordConfirm: "",
			createAccountPasswordError: "Password cannot begin with a number!",
			createAccountPasswordErrorDisplay: { display: "none"}, 
			createAccountPasswordConfirmError: "Typo! passwords did not match.",
			createAccountPasswordConfirmErrorDisplay: { display: "none" },
			gender: "",
			maleButtonColor: { background: 'white', color: "black" },
			femaleButtonColor: { background: 'white', color: "black"},
			birthdayMonth: "",
			birthdayDay: "",
			birthdayYear: "",
			createAccountSecurityQuestionModal: "",
			securityQuestions: ""
		}

	}

	// componentWillUpdate(nextProps, nextState) {
	// 	var createAccountButton = this.refs.createAccountSubmitButton
	// 	var testEmailField = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(nextState.createAccountEmailField)
	// 	nextState.createAccountInvalidData = !(nextState.createAccountFirstName && nextState.createAccountFirstName.match(/\d+/g) === null && nextState.createAccountLastName &&
	// 										  testEmailField && 
	// 										  nextState.createAccountEmailField && nextState.createAccountEmailField === nextState.createAccountEmailConfirm &&
	// 										  nextState.createAccountPassword.length === 6 && nextState.createAccountPasswordConfirm === nextState.createAccountPassword &&
	// 										  nextState.birthdayMonth && nextState.birthdayDay && nextState.birthdayYear)
	// 	if(nextState.createAccountInvalidData === false) {
	// 		createAccountButton.style.backgroundColor = "black"
	// 		createAccountButton.style.color = "white"
	// 	} else {
	// 		createAccountButton.style.backgroundColor = "white"
	// 		createAccountButton.style.color = "grey"
	// 		nextState.createAccountInvalidData = true
	// 	}
	// }

	signinOnEmailChange(e) {
		var signinEmailField = this.refs.signinEmailField
		this.props.signinOnEmailChange(e, signinEmailField)
	}

	signinOnPasswordChange(e) {
		var signinPasswordField = this.refs.signinPasswordField
		this.props.signinOnPasswordChange(e, signinPasswordField)
	}

	signinButtonClicked(e) {
		e.preventDefault()
		var signInErrorDiv = this.refs["signin-error-div"]
		this.props.signinButtonClicked(signInErrorDiv)
	}

	createAccountFirstNameChange(e) {
		var createAccountFirstName = e.target.value.trim()
		if(/\d/.test(createAccountFirstName)) { // The test() method tests for a match in a string, returns true if it finds a match, otherwise it returns false.
			ReactDOM.findDOMNode(this.refs.createAccountFirstNameInputField).value = createAccountFirstName.slice(0,-1) // if string is of length 3, and if beginIndex is -1, it is treated as (stringLength - 1) and it will only select begining from index 2, which will give you the last character in teh string..
			ReactDOM.findDOMNode(this.refs.createAccountFirstNameInputField).style.border = "2px solid red"
			this.setState({
				createAccountFirstNameErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "8.6%", left: "4.5%"},
				createAccountFirstNameError: "Name cannot contain numbers!"
			})
		} else {
			ReactDOM.findDOMNode(this.refs.createAccountFirstNameInputField).style.border = "2px solid green"
			this.setState({
				createAccountFirstName: createAccountFirstName,
				createAccountFirstNameErrorDisplay: {display: "none"}
			})
		}
	}

	createAccountFirstNameInputFieldBlurred() {
		if(!this.state.createAccountFirstName.length) {
			ReactDOM.findDOMNode(this.refs.createAccountFirstNameInputField).style.border = "2px solid red"
			this.setState({
				createAccountFirstNameErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "8.6%", left: "4.5%"},
				createAccountFirstNameError: "First name cannot be blank!"
			})
		} 
	}

	createAccountLastNameChange(e) {
		var createAccountLastName = e.target.value.trim()
		if(/\d/.test(createAccountLastName)) {
			ReactDOM.findDOMNode(this.refs.createAccountLastNameInputField).value = createAccountLastName.slice(0,-1)
			ReactDOM.findDOMNode(this.refs.createAccountLastNameInputField).style.border = "2px solid red"
			this.setState({
				createAccountLastNameErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "8.6%", left: "52.5%"},
				createAccountLastNameError: "Last name cannot contain numbers!"
			})
		} else {
			ReactDOM.findDOMNode(this.refs.createAccountLastNameInputField).style.border = "2px solid green"
			this.setState({
			createAccountLastName: createAccountLastName,
			createAccountLastNameErrorDisplay: {display: "none"}
			})
		}
	}

	createAccountLastNameInputFieldBlurred() {
		if(!this.state.createAccountLastName) {
			ReactDOM.findDOMNode(this.refs.createAccountLastNameInputField).style.border = "2px solid red"
			this.setState({
				createAccountLastNameErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "8.6%", left: "52.5%"},
				createAccountLastNameError: "Last name cannot be blank!"
			})
		} 
	}

	createAccountEmailChange(e) {
		var createAccountEmailField = e.target.value.trim()
		if(isNaN(createAccountEmailField[0])) {	
		 	this.setState({
				createAccountEmailField: createAccountEmailField,
				createAccountEmailFieldErrorDisplay: {display: "none"}
			})
		} else {
			ReactDOM.findDOMNode(this.refs.createAccountEmailField).value = ""
			this.setState({
				createAccountEmailFieldErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "20.2%", left: "4.5%"},
				createAccountEmailFieldError: "Email cannot begin with a Number!"
			})
		}
	}   

	createAccountEmailFieldBlurred(){
		if(this.state.createAccountEmailField) {
			if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.createAccountEmailField) === false) {
				ReactDOM.findDOMNode(this.refs.createAccountEmailField).style.border = "2px solid red"
				this.setState({
					createAccountEmailFieldErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "20.2%", left: "4.5%"},
					createAccountEmailFieldError: "Invalid Email!"
				})
			} else {
				ReactDOM.findDOMNode(this.refs.createAccountEmailField).style.border = "2px solid green"
				ReactDOM.findDOMNode(this.refs.createAccountConfirmEmailField).style.border = "2px solid red"
			}
			if(this.state.createAccountEmailConfirm) {
				if(this.state.createAccountEmailField !== this.state.createAccountEmailConfirm ) {
					ReactDOM.findDOMNode(this.refs.createAccountConfirmEmailField).style.border = "2px solid red"
					this.setState({
						createAccountConfirmEmailFieldErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "20.2%", left: "52.5%"},
						createAccountConfirmEmailFieldError: "Emails do not match!"
					})
				} else {
					ReactDOM.findDOMNode(this.refs.createAccountConfirmEmailField).style.border = "2px solid green"
					this.setState({
						createAccountConfirmEmailFieldErrorDisplay: { display: "none"},
						createAccountConfirmEmailFieldError: ""
					})
				}
			}	
		} else  {
				ReactDOM.findDOMNode(this.refs.createAccountEmailField).style.border = "2px solid red"
				this.setState({
					createAccountEmailFieldErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "20.2%", left: "4.5%"},
					createAccountEmailFieldError: "Email cannot be blank!"
				})
				if(this.state.createAccountEmailConfirm) {
					ReactDOM.findDOMNode(this.refs.createAccountConfirmEmailField).style.border = "2px solid red"
					this.setState({
						createAccountConfirmEmailFieldErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "20.2%", left: "52.5%"},
						createAccountConfirmEmailFieldError: "Emails do not match!"
					})
				}
			}		
	}    

	createAccountEmailConfirmChange(e) {
		console.log("email", e.target.value)
		var prevStateConfirmEmailField = this.state.createAccountEmailConfirm;
		var createAccountConfirmEmailField = e.target.value;
		if(this.state.createAccountEmailField) {
			if(this.state.createAccountEmailField.startsWith(createAccountConfirmEmailField)) {
				this.setState({
					createAccountEmailConfirm: e.target.value,
					createAccountConfirmEmailFieldErrorDisplay: { display: "none"}
				})
			} else {
				ReactDOM.findDOMNode(this.refs.createAccountConfirmEmailField).value = ""
				this.setState({
					createAccountEmailConfirm: "",
					createAccountConfirmEmailFieldErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "20.2%", left: "52.5%"},
					createAccountConfirmEmailFieldError: "Typo! Emails did not match.",
				})
			}
		} else {
			ReactDOM.findDOMNode(this.refs.createAccountConfirmEmailField).value = ""
			this.setState({
				createAccountEmailConfirm: "",
				createAccountConfirmEmailFieldErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "20.2%", left: "52.5%"},
				createAccountConfirmEmailFieldError: "Please Fill in the box on the left first."
				})
		}
	}

	createAccountEmailConfirmFieldBlurred(){
		if(this.state.createAccountEmailField) {
			if(this.state.createAccountEmailField === this.state.createAccountEmailConfirm && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.createAccountEmailField)) {
				ReactDOM.findDOMNode(this.refs.createAccountEmailField).style.border = "2px solid green"
				ReactDOM.findDOMNode(this.refs.createAccountConfirmEmailField).style.border = "2px solid green"
				this.setState({
					createAccountEmailFieldErrorDisplay: {display: "none"},
					createAccountEmailFieldError: "",
					createAccountConfirmEmailFieldErrorDisplay: { display: "none"},
					createAccountConfirmEmailFieldError: ""
				})
			} else {
				ReactDOM.findDOMNode(this.refs.createAccountConfirmEmailField).style.border = "2px solid red"
				this.setState({
					createAccountConfirmEmailFieldErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "20.2%", left: "52.5%"},
					createAccountConfirmEmailFieldError: "Emails do not match!",
				})
			}
		} 
		if(!this.state.createAccountEmailConfirm) {
			ReactDOM.findDOMNode(this.refs.createAccountConfirmEmailField).style.border = "2px solid red"
			this.setState({
				createAccountConfirmEmailFieldErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "20.2%", left: "52.5%"},
				createAccountConfirmEmailFieldError: "Email cannot be blank!"
				})
		}
	}

	createAccountPasswordChange(e) {
		var createAccountPassword = e.target.value;
		if(/^[a-zA-Z]/.test(createAccountPassword)) {
			this.setState({
				createAccountPassword: e.target.value,
				createAccountPasswordErrorDisplay: { display: "none" },
				createAccountPasswordError: ""
			})
		} else {
			ReactDOM.findDOMNode(this.refs.createAccountPasswordField).value = ""
			this.setState({
				createAccountPassword: "",
				createAccountPasswordErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "31.8%", left: "4.8%"},
				createAccountPasswordError: "Passwords can only begin with letters!"
			})
		}
		if(createAccountPassword.length > 15) {
			ReactDOM.findDOMNode(this.refs.createAccountPasswordField).value = createAccountPassword.substr(0, 15)
			this.setState({
				createAccountPasswordErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "31.8%", left: "4.8%"},
				createAccountPasswordError: "Password maximum length reached!"
			})
		}
	}  

	createAccountPasswordBlurred() {
		if(this.state.createAccountPassword) {
			if(this.state.createAccountPassword.length >= 6) {
				ReactDOM.findDOMNode(this.refs.createAccountPasswordField).style.border = "2px solid green"
				ReactDOM.findDOMNode(this.refs.createAccountPasswordConfirm).style.border = "2px solid red"
			} else if(this.state.createAccountPassword.length > 0) {
				ReactDOM.findDOMNode(this.refs.createAccountPasswordField).style.border = "2px solid red"
				this.setState({
					createAccountPasswordErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "31.8%", left: "4.8%"},
					createAccountPasswordError: "Password minimum 6 characters!"
				})
			} 
		} else {
				ReactDOM.findDOMNode(this.refs.createAccountPasswordField).style.border = "2px solid red"
				this.setState({
					createAccountPasswordErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "31.8%", left: "4.8%"},
					createAccountPasswordError: "Passwords cannot be blank!"
				})
			}
		if(this.state.createAccountPasswordConfirm) {
			if(this.state.createAccountPassword !== this.state.createAccountPasswordConfirm) {
				ReactDOM.findDOMNode(this.refs.createAccountPasswordConfirm).style.border = "2px solid red"
			
				this.setState({
					createAccountPasswordConfirmErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "31.8%", left: "52.5%"},
					createAccountPasswordConfirmError: "Passwords do not match!"
				})
			} else {
				ReactDOM.findDOMNode(this.refs.createAccountPasswordConfirm).style.border = "2px solid green"
				this.setState({
					createAccountPasswordConfirmErrorDisplay: {display: "none"},
					createAccountPasswordConfirmError: ""
				})
			    }
		}
	}

	createAccountPasswordConfirmChange(e) {
		console.log("pass", e.target.value)
		var prevStateConfirmPassword = this.state.createAccountPasswordConfirm;
		var createAccountPasswordConfirm = e.target.value;
		if(this.state.createAccountPassword) {
			if(this.state.createAccountPassword.startsWith(createAccountPasswordConfirm)) {
				this.setState({
					createAccountPasswordConfirm: createAccountPasswordConfirm,
					createAccountPasswordConfirmErrorDisplay: { display: "none" },
				})
			} else {
				ReactDOM.findDOMNode(this.refs.createAccountPasswordConfirm).value = ""
				this.setState({
					createAccountPasswordConfirmErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "31.8%", left: "52.5%"},
					createAccountPasswordConfirmError: "Typo! Passwords did not match.",
				})
			}
		} else {
			ReactDOM.findDOMNode(this.refs.createAccountPasswordConfirm).value = ""
			this.setState({
				createAccountPasswordConfirm: "",
				createAccountPasswordConfirmErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "31.8%", left: "52.5%"},
				createAccountPasswordConfirmError: "Please Fill in the box on the left first."
				})
		}
	}

	createAccountPasswordConfirmBlurred() {
		if(this.state.createAccountPassword) {
			if(this.state.createAccountPassword === this.state.createAccountPasswordConfirm) {
				ReactDOM.findDOMNode(this.refs.createAccountPasswordConfirm).style.border = "2px solid green"
				ReactDOM.findDOMNode(this.refs.createAccountPasswordField).style.border = "2px solid green"
				this.setState({
					createAccountPasswordErrorDisplay: {display: "none"},
					createAccountPasswordError: "",
					createAccountPasswordConfirmErrorDisplay: {display: "none"},
					createAccountPasswordConfirmError: ""
				})
			} else {
				ReactDOM.findDOMNode(this.refs.createAccountPasswordConfirm).style.border = "2px solid red"
				this.setState({
					createAccountPasswordConfirmErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "31.8%", left: "52.5%"},
					createAccountPasswordConfirmError: "Passwords do not match!"
				})
			}
		}
		if(!this.state.createAccountPasswordConfirm) {
			ReactDOM.findDOMNode(this.refs.createAccountPasswordConfirm).style.border = "2px solid red"
				this.setState({
					createAccountPasswordConfirmErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "31.8%", left: "52.5%"},
					createAccountPasswordConfirmError: "Passwords cannot be blank!"
				})
		}
	}

	genderMaleClicked(e) {
		e.preventDefault()
		
		if(this.state.maleButtonColor.background === 'white') {
		this.setState({
			gender: e.target.value,
			maleButtonColor: { background: 'black', color: "white" },
			femaleButtonColor: { background: 'white', color: "black"}
		})
		} else {
			this.setState({
				gender: '',
				maleButtonColor: { background: 'white' }
			})
		}
	}

	genderFemaleClicked(e) {
		e.preventDefault()
		if(this.state.femaleButtonColor.background === 'white') {
			this.setState({
				gender: e.target.value,
				femaleButtonColor: { background: 'black', color: "white" },
				maleButtonColor: { background: 'white', color: "black" }
		})
		} else {
			this.setState({
				gender: '',
				femaleButtonColor: { background: 'white', color: "black"}
			})
		}

	}

	birthdayMonthChange(e) {
		this.setState({
			birthdayMonth: e.target.value
		})
	}

	birthdayDayChange(e) {
		this.setState({
			birthdayDay: e.target.value
		})
	}
	
	birthdayYearChange(e) {
		this.setState({
			birthdayYear: e.target.value
		})
	}

	createAccountButtonClicked(e) {
		e.preventDefault()
		var genderSelectedOrNot = ""
		if(!this.state.gender) {
			genderSelectedOrNot = "Not Provided"
		} else {
			genderSelectedOrNot = this.state.gender
		}
		var birthDate = `${this.state.birthdayYear}/${this.state.birthdayMonth}/${this.state.birthdayDay}`
		var member = {
			first_name: this.state.createAccountFirstName,
			last_name: this.state.createAccountLastName,
			gender: genderSelectedOrNot,
			birthday: birthDate,
			email: this.state.createAccountEmailConfirm,
			password: this.state.createAccountPassword,
	    }
	    // axios.post('http://localhost:3000/api/v1/create_new_account',
	    axios.post('http://localhost:3000/api/v1/check_validity', 
    		member: member
  		)
  		.then((resp)=> {
			console.log("RESP", resp)
			console.log("DATA, resp.data")
			// this.setState({
			// 	securityQuestions: resp.data,
			// 	createAccountSecurityQuestionModal: "show"
			// }, ()=> console.log(this.state.securityQuestions, "oooOOOooO"))
		})
		
  		// .then((resp)=> localStorage.setItem("token", resp.data.token))
  		// .then(()=> this.props.history.push("/main"))
  		// .then(()=> this.createAccountSecurityQuestionModal.bind(this))
  		// .then(()=> this.props.accountCreatedMessageModal())
  		.catch((error)=> {
  			this.setState({
  				createAccountErrorResponseData: error.response.data,
  				createAccountErrorModal: "show-create-account-error-modal"
  			})
  		})
	}

	// createAccountButtonClicked(e) {
	// 	e.preventDefault()
	// 	axios.get("http://localhost:3000/api/v1/security_questions")
	// 	.then((resp)=> {
			
	// 		this.setState({
	// 			securityQuestions: resp.data,
	// 			createAccountSecurityQuestionModal: "show"
	// 		}, ()=> console.log(this.state.securityQuestions, "oooOOOooO"))
	// 	})
	// }

	createAccountErrorModalCloseClicked() {
		this.setState({
			createAccountErrorModal: "hide-create-account-error-modal"
		})
	}

	 createAccountSecurityQuestionModal() {

	  }

	render () {
		console.log(this.props, "state-register")
  	  var numbers = []
	  for (var i = 2017; i >= 1900; i--) {
        numbers.push(i)
	  }

	return (
		
		<div id="registerPageDiv">
			{ this.state.createAccountErrorModal ===  "show-create-account-error-modal" ? <CreateAccountErrorModal createAccountErrorResponseData={this.state.createAccountErrorResponseData} createAccountErrorModalCloseClicked={this.createAccountErrorModalCloseClicked.bind(this)}/> : null }
		 	{ this.state.createAccountSecurityQuestionModal ? <CreateAccountSecurityQuestionModal securityQuestions={this.state.securityQuestions} /> : null }
		<div id="signinPage">

			<div id="signinError" className="hide-signin-error-div" ref="signin-error-div">
				<FontAwesome className="exclamation-triangle" name="wrench" spin size="2x"
			 	style={{ position: "absolute", display: "block", top: "9px", left: "4px", color: "black", }}/>
				<h4>There was a problem.</h4>
				<span id="signinErrorSpan" >{this.props.mainState.signInAjaxErrorMessage}</span>
			</div>

			<div id="signinInfoDiv">
				<div id="signInHeadingDiv">
					SIGN IN
				</div>
				
				<label id="signinEmailLabel">Email</label>
				<div id="signInEmailErrorDiv">
					{this.props.mainState.signInEmailError}
				</div>
				<input id="signinEmailField" ref="signinEmailField" onChange={this.signinOnEmailChange.bind(this)} type="text"  placeholder="Email Address" />
				<br />
				<label id="signinPagePasswordLabel">Password</label>
				<div id="signInPasswordErrorDiv" >
					{this.props.mainState.signInPasswordError}
				</div>
				<input id="signinPasswordField" ref="signinPasswordField" onChange={this.signinOnPasswordChange.bind(this)} type="password" />
				<br /><br />
				<button id="signinPageButton" onClick={this.signinButtonClicked.bind(this)} >Sign In</button>
				<br />
				<input id="signinPageRadio1" type="checkbox" /><span id="signinRadioText">Keep me signed in.</span>
				<br />
				<a id="signinPageForgotPassword" href="#">Forgot your password?</a>
			</div>

			<div id="createNewAccountDiv">
				<div id="create-new-account-header-div">
					<h2>Create New Account</h2>
				</div>

				<form onSubmit={this.createAccountButtonClicked.bind(this)}>
					<p id="createAccountFirstNameError" style={this.state.createAccountFirstNameErrorDisplay} >{this.state.createAccountFirstNameError}</p>
					<input id="createAccountFirstNameInputField" ref="createAccountFirstNameInputField" onBlur={this.createAccountFirstNameInputFieldBlurred.bind(this)} type="text" onChange={this.createAccountFirstNameChange.bind(this)} placeholder="First Name"/>
					<p id="createAccountLasttNameError" style={this.state.createAccountLastNameErrorDisplay} >{this.state.createAccountLastNameError}</p>
					<span><input id="createAccountLastNameInputField" ref="createAccountLastNameInputField" onBlur={this.createAccountLastNameInputFieldBlurred.bind(this)} type="text" onChange={this.createAccountLastNameChange.bind(this)} placeholder="Last Name" /></span>
					<p id="createAccountEmailFieldError" style={this.state.createAccountEmailFieldErrorDisplay} >{this.state.createAccountEmailFieldError} </p>
					<input id="createAccountEmailField" ref="createAccountEmailField" type="email" onBlur={this.createAccountEmailFieldBlurred.bind(this)} onChange={this.createAccountEmailChange.bind(this)} placeholder="Email" />
					<p id="createAccountConfirmEmailFieldError" style={this.state.createAccountConfirmEmailFieldErrorDisplay} >{this.state.createAccountConfirmEmailFieldError} </p>
					<span><input id="createAccountConfirmEmailField" ref="createAccountConfirmEmailField" type="email" onBlur={this.createAccountEmailConfirmFieldBlurred.bind(this)} onChange={this.createAccountEmailConfirmChange.bind(this)} placeholder="Confirm Email" /></span>
					<p id="createAccountPasswordError" style={this.state.createAccountPasswordErrorDisplay} >{this.state.createAccountPasswordError} </p>
					<input id="createAccountPasswordField" autoComplete="off" ref="createAccountPasswordField" type="text" onBlur={this.createAccountPasswordBlurred.bind(this)} onChange={this.createAccountPasswordChange.bind(this)} placeholder="Password (Minimum 6 Characters)" />
					<p id="createAccountPasswordConfirmError" style={this.state.createAccountPasswordConfirmErrorDisplay} >{this.state.createAccountPasswordConfirmError} </p>
					<span><input id="createAccountConfirmPasswordField" autoComplete="off" ref="createAccountPasswordConfirm" type="text" onBlur={this.createAccountPasswordConfirmBlurred.bind(this)} onChange={this.createAccountPasswordConfirmChange.bind(this)} placeholder="Confirm Password" /></span>
					<p id="passwordRequirement">Passwords can only begin with an alphabet and the length should be between 6-15 characters.</p>

					<div id="signinGenderDiv">
					<span><h5>Optional</h5></span>
						<h3>Gender</h3>

					</div>

					<div id="signinGenderSelection">
						<button id="signinGenderMaleButton" style={this.state.maleButtonColor} value="Male" onClick={this.genderMaleClicked.bind(this)} >Male</button>
						<span><button id="signinGenderFemaleButton" style={this.state.femaleButtonColor} value="Female" onClick={this.genderFemaleClicked.bind(this)} >Female</button></span>
					</div>

					<div id="signinBirthdayTextDiv">
						<h4>Birthday</h4>
					</div>

					<div id="signinBirthdayMonthDiv">
						<select name="month" id="signinBirthdayMonthSelect" onChange={this.birthdayMonthChange.bind(this)} style={{width: "180px", height: "38px"}}>
							<option value="" disabled selected>Month</option>
							<option value="01">January</option>
							<option value="02">February</option>
							<option value="03">March</option>
							<option value="04">April</option>
							<option value="05">May</option>
							<option value="06">June</option>
							<option value="07">July</option>
							<option value="08">August</option>
							<option value="09">September</option>
							<option value="10">October</option>
							<option value="11">November</option>
							<option value="12">December</option>
						</select>

						<span><select name="day" id="signinBirthdayDaySelect"  onChange={this.birthdayDayChange.bind(this)} style={{width: "180px", height: "38px"}}>
							<option value="" disabled selected>Day</option>
							{Array.from(new Array(32), (x, index) => { 
								if(index !== 0) {
									if(index < 10) {
										return <option value={`0${index}`}>{index}</option> 
									} else {
										return <option value={index}>{index}</option>
							    	}
						    	}
							})
							}	
						</select></span>

						<span><select name="year" id="signinBirthdayYearSelect"  onChange={this.birthdayYearChange.bind(this)} style={{width: "180px", height: "38px"}}>
							<option value="" disabled selected>Year</option>
							{ numbers.map((number) => <option value={number}>{number}</option> ) }
						</select></span>
					</div>

					<div id="createAccountSubmitDiv">
						<button ref="createAccountSubmitButton" type="submit" disabled={this.state.createAccountInvalidData}>SUBMIT</button>
						<p>Submit button will be enabled once all fields are valid.</p>
					</div>
				</form>
			</div>
		</div>
		</div>
		
		)
	}
}