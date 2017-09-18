import React from "react";
import axios from "axios"
import "./MyAccount.css";
import MyAccountAboutMeModal from "./MyAccountAboutMeModal";
import UpdatePasswordModal from "./UpdatePasswordModal";
import AddNewAddressModal from "./AddNewAddressModal"


export default class Account extends React.Component {

	constructor (props) {
		super()
		this.state = {
			aboutMeModal: "hide-about-me-modal",
			newFirstName: "",
			newLastName: "",
			newEmail: "",
			newGender: "",
			newDobMonth: "",
			newDobDay: "",
			newDobYear: "",
			updatePasswordModal: "hide-update-password-modal",
			currentPassword: "",
			currentPasswordError: "",
			currentPasswordErrorDisplay: {display: "none"},
			newPassword: "",
			newPasswordError: "",
			newPasswordErrorDisplay: {display: "none"},
			newPasswordConfirm: "",
			newPasswordConfirmError: "",
			newPasswordConfirmErrorDisplay: {display: "none"},
			addNewAddressModal: "hide-add-new-address-modal"
		}

	}

	////////////////////////////////////////////////// AboutMeModal

	aboutMeEditClicked() {
		this.setState({
			aboutMeModal: "show-about-me-modal"
		})
	}

	aboutMeFirstNameChanged(event) {
		var newFirstName = event.target.value
		this.setState({
			newFirstName: newFirstName
		})
	}

	aboutMeLastNameChanged(event) {
		var newLastName = event.target.value
		this.setState({
			newLastName: event.target.value
		})
	}

	aboutMeEmailChanged(event) {
		var newEmail = event.target.value
		this.setState({
			newEmail: newEmail
		})
	}

	aboutMeGenderClicked(event, gender) {
		var newGender = gender
		this.setState({
			newGender: newGender
		}, () => console.log("GENDERRRRRRR", this.state.newGender))
	}

	aboutMeDateOfBirthMonthOrDayChanged(event, arg) {
		var valueToChange = {} // we are going to pass an object to "setState", so it is not explicit to either month or day
		if(event.target.value.length > 2) {
			valueToChange[arg] = event.target.value.slice(0,2)
			event.target.value = event.target.value.slice(0,2)
			this.setState(
				valueToChange
			)
		} else {
			valueToChange[arg] = event.target.value
			this.setState(
				valueToChange
			, () => { 
					if(this.state[arg].length < 2) {
						valueToChange[arg] = "0" + this.state[arg]
						this.setState(
							valueToChange
						)
					}
				})
		}
	}

	aboutMeDateOfBirthYearChanged(event) {
		var newDobYear = event.target.value
		if(newDobYear.length > 4) {
			event.target.value = newDobYear.slice(0,4)
			this.setState({
				newDobYear: newDobYear.slice(0,4)
			}, () => console.log(this.state.newDobYear))
		} else {
			this.setState({
				newDobYear: newDobYear
			})
		}
	}

	aboutMeModalUpdateButtonClicked(event, closeModal) {	
		var newDob = ""
		if(this.state.newDobYear && this.state.newDobMonth && this.state.newDobDay) {
			newDob = `${this.state.newDobYear}-${this.state.newDobMonth}-${this.state.newDobDay}`
		} else if (this.state.newDobYear && this.state.newDobMonth) {
			newDob = this.state.newDobYear + "-" + this.state.newDobMonth + "-" + this.props.memberInfo.dob.slice(-2)
		} else if (this.state.newDobYear && this.state.newDobDay){
			newDob = this.state.newDobYear + "-" + this.props.memberInfo.dob.slice(5,7) + "-" + this.state.newDobDay
		} else if(this.state.newDobMonth && this.state.newDobDay){
			newDob = this.props.memberInfo.dob.slice(0,4) + "-" + this.state.newDobMonth + "-" + this.state.newDobDay
		} else if(this.state.newDobYear) {
			newDob = this.state.newDobYear + this.props.memberInfo.dob.slice(4,-1) 
		} else if(this.state.newDobMonth) {
			newDob = this.props.memberInfo.dob.slice(0,4) + "-" + this.state.newDobMonth + this.props.memberInfo.dob.slice(7,-1)
		} else if(this.state.newDobDay){
			newDob = this.props.memberInfo.dob.slice(0,8) + this.state.newDobDay
		}

		if(this.state.newFirstName || this.state.newLastName || this.state.newEmail || this.state.newGender || this.state.newDobMonth || this.state.newDobDay || this.state.newDobYear) {
			var member = {
				first_name: this.state.newFirstName,
				last_name: this.state.newtLastName,
				email: this.state.newEmail,
				gender: this.state.newGender,
				birthday: newDob
	    	}
			axios.put("http://localhost:3000/api/v1/members/0", 
						{ member: member },
						{ headers: {token: localStorage.token} } 
			).then(() => this.props.updateMemberInfo())
			.then(() => closeModal("updated"))
		} else {
			closeModal("ok")
		}
	}

	aboutMeEditCloseClicked() {
		this.setState({
			aboutMeModal: "hide-about-me-modal",
		})
	}
	///////////////////////////////////////////////////// AboutMeModal

	///////////////////////////////////////////////////// UpdatePasswordModal

	updatePasswordClicked() {
		this.setState({
			updatePasswordModal: "show-update-password-modal"
		})
	}

	currentPasswordChanged(e) {
			this.setState({
			currentPassword: e.target.value
		}, () => console.log("currentPassword", this.state.currentPassword))
	}

	newPasswordChanged(e) {
		var newPassword = e.target.value;
		if(/^[a-zA-Z]/.test(newPassword) || !newPassword) {
			this.setState({
				newPassword: e.target.value,
				newPasswordErrorDisplay: { display: "none" },
				newPasswordError: ""
			})
		} else {
			e.target.value = ""
			this.setState({
				newPassword: "",
				newPasswordErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "34.0%", margin: "0 auto"},
				newPasswordError: "Passwords can only begin with letters!"
			})
		}
		if(newPassword.length > 15) {
			e.target.value = newPassword.substr(0, 15)
			this.setState({
				newPasswordErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "34.0%", margin: "0 auto"},
				newPasswordError: "Password maximum length reached!"
			})
		}
	}

	confirmNewPasswordChanged(e) {
		var newPasswordConfirm = e.target.value;
		if(/^[a-zA-Z]/.test(newPasswordConfirm) || !newPasswordConfirm) {
			this.setState({
				newPasswordConfirm: e.target.value,
				newPasswordConfirmErrorDisplay: { display: "none" },
				newPasswordConfirmError: ""
			})
		} else {
			e.target.value = ""
			this.setState({
				newPasswordConfirm: "",
				newPasswordConfirmErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "54%", margin: "0 auto"},
				newPasswordConfirmError: "Passwords can only begin with letters!"
			})
		}
		if(newPasswordConfirm.length > 15) {
			e.target.value = newPasswordConfirm.substr(0, 15)
			this.setState({
				newPasswordConfirmErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "54%", margin: "0 auto"},
				newPasswordConfirmError: "Password maximum length reached!"
			})
		}
	}

	saveNewPasswordClicked(event, callback) { //////////////////
		event.preventDefault()
		var isEverythingOk = true
		if(this.state.newPassword.length < 6) {
			isEverythingOk = false
			this.setState({
				newPasswordErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "34.0%", margin: "0 auto"},
				newPasswordError: "Password must be of minimum 6 characters!"
			})
		}
		if(this.state.newPassword !== this.state.newPasswordConfirm) {
			isEverythingOk = false
			this.setState({
				newPasswordConfirm: "",
				newPasswordConfirmErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "54%", margin: "0 auto"},
				newPasswordConfirmError: "Passwords do not match!"
			})
		}
		if(isEverythingOk) {
			var data = {
				"currentPassword": this.state.currentPassword,
				"password": this.state.newPassword,
			}
			axios.defaults.headers.common['Token'] = localStorage.token;
			axios.put("http://localhost:3000/api/v1/update_password", data)
			.then(()=> callback("updated"))
			.catch((error)=> {
				this.setState({
					currentPasswordError: error.response.data.error,
					currentPasswordErrorDisplay: {position: "absolute", paddingBottom: "0em", height: "5px", color: "red", top: "14%", margin: "0 auto"}
				})
			})
		}
	}

	updatePasswordModalCloseClicked() {
		this.setState({
			updatePasswordModal: "hide-update-password-modal",
			currentPassword: "",
			currentPasswordError: "",
			currentPasswordErrorDisplay: {display: "none"},
			newPassword: "",
			newPasswordError: "",
			newPasswordErrorDisplay: {display: "none"},
			newPasswordConfirm: "",
			newPasswordConfirmError: "",
			newPasswordConfirmErrorDisplay: {display: "none"},
		})
	}
	/////////////////////////////////////////////////// UpdatePasswordModal

	addNewAddressClicked() {
		console.log("address")
		this.setState({
			addNewAddressModal: "show-add-new-address-modal"
		})
	}

	addNewAddressModalCloseClicked() {
		this.setState({
			addNewAddressModal: "hide-add-new-address-modal"
		})
	}

	render() {
		console.log("FORCEEED myaccount" ,"memberInfo", this.props)
		return (
			<div>

				{ this.state.aboutMeModal ===  "show-about-me-modal" ? <MyAccountAboutMeModal aboutMeEditCloseClicked={this.aboutMeEditCloseClicked.bind(this)} memberInfo={this.props.memberInfo} aboutMeFirstNameChanged={this.aboutMeFirstNameChanged.bind(this)} aboutMeLastNameChanged={this.aboutMeLastNameChanged.bind(this)} aboutMeEmailChanged={this.aboutMeEmailChanged.bind(this)} aboutMeGenderClicked={this.aboutMeGenderClicked.bind(this)} aboutMeDateOfBirthMonthOrDayChanged={this.aboutMeDateOfBirthMonthOrDayChanged.bind(this)} aboutMeDateOfBirthYearChanged={this.aboutMeDateOfBirthYearChanged.bind(this)} aboutMeModalUpdateButtonClicked={this.aboutMeModalUpdateButtonClicked.bind(this)} /> : null }
				{ this.state.updatePasswordModal === "show-update-password-modal" ? <UpdatePasswordModal updatePasswordModalCloseClicked={this.updatePasswordModalCloseClicked.bind(this)} newPasswordChanged={this.newPasswordChanged.bind(this)} confirmNewPasswordChanged={this.confirmNewPasswordChanged.bind(this)} saveNewPasswordClicked={this.saveNewPasswordClicked.bind(this)} currentPasswordChanged={this.currentPasswordChanged.bind(this)} newPasswordError={this.state.newPasswordError} newPasswordErrorDisplay={this.state.newPasswordErrorDisplay} newPasswordConfirmError={this.state.newPasswordConfirmError} newPasswordConfirmErrorDisplay={this.state.newPasswordConfirmErrorDisplay} currentPasswordError={this.state.currentPasswordError} currentPasswordErrorDisplay={this.state.currentPasswordErrorDisplay} /> : null }
				{ this.state.addNewAddressModal === "show-add-new-address-modal" ? <AddNewAddressModal addNewAddressModalCloseClicked={this.addNewAddressModalCloseClicked.bind(this)} /> : null }

			<div id="account-container">
			
				<div id="account-menu">
					<div id="account-header">
						MY ACCOUNT 
					</div>

					<ul id="account-menu-list-ul">
						<li className="list-group-item">
							<a className="a-list-item" id="order-history" href="/myaccount/order-history">Order History</a>
						</li><br />
						<li className="list-group-item">
							<a className="a-list-item" id="account-settings" href="/myaccount">Account Settings</a>
						</li>
					</ul>
				</div>

				<div id="user-information-container">
					<h1>ACCOUNT SETTINGS</h1>
					<div id="user-about-me">
						<h3 className="all-account-settings-headings">About Me</h3>
						<div id="user-about-me-details">

							<div id="user-name-container">
								<div id="user-name-header">
									Name:
								</div>
								<div id="user-first-name">
									{this.props.memberInfo.firstName}
								</div>
								<div id="user-last-name">
									{this.props.memberInfo.lastName}
								</div>
							</div>

							<div id="user-email-container">
								<div id="user-email-header">
									Email:
								</div>
								<div id="user-email">
									{this.props.memberInfo.email}
								</div>
							</div>

							<div id="user-gender-container">
								<div id="user-gender-header">
									Gender:
								</div>
								<div id="user-gender">
									{this.props.memberInfo.gender}
								</div>
							</div>

							<div id="user-dob-container">
								<div id="user-dob-header">
									DOB:
								</div>
								<div id="user-dob">
									{this.props.memberInfo.dob}
								</div>
							</div>

							<div id="user-info-edit-container">
								<button id="user-info-edit-button" onClick={this.aboutMeEditClicked.bind(this)}  >Edit</button>
							</div>
						</div>
					</div>

					<div id="update-user-password">
						<span onClick={this.updatePasswordClicked.bind(this)} >Update Password</span>
					</div>

					<div id="saved-user-addresses-container">
						<h3 className="all-account-settings-headings">Saved Addresses</h3>
						<h4 className="all-account-settings-headings" onClick={this.addNewAddressClicked.bind(this)} >Add Address</h4>
						<div id="saved-user-address-data">

						</div>
					</div>

				</div>

			</div> 
			</div>
			)
	}
}

