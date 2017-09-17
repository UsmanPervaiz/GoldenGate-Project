import React from "react";
import "./MyAccount.css";
import AboutMeModal from "./AboutMeModal";
import UpdatePasswordModal from "./UpdatePasswordModal";
import AddNewAddressModal from "./AddNewAddressModal"


export default class Account extends React.Component {

	constructor (props) {
		super()
		this.state = {
			aboutMeModal: "hide-about-me-modal",
			updatePasswordModal: "hide-update-password-modal",
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
			addNewAddressModal: "hide-add-new-address-modal"
		}

	}

	aboutMeEditClicked() {
		this.setState({
			aboutMeModal: "show-about-me-modal"
		})
	}

	aboutMeEditCloseClicked() {
		this.setState({
			aboutMeModal: "hide-about-me-modal"
		})
	}

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
		this.setState({
			newPassword: e.target.value
		}, () => console.log("newPassword", this.state.newPassword))
	}

	confirmNewPasswordChanged(e) {
		this.setState({
			confirmNewPassword: e.target.value
		}, () => console.log("ConfirmPassword", this.state.confirmNewPassword))
	}

	saveNewPasswordClicked(e) { //////////////////
		this.props.saveNewPassword(e)
	}

	updatePasswordModalCloseClicked() {
		this.setState({
			updatePasswordModal: "hide-update-password-modal"
		})
	}

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

		return (
			<div>

				{ this.state.aboutMeModal ===  "show-about-me-modal" ? <AboutMeModal aboutMeEditCloseClicked={this.aboutMeEditCloseClicked.bind(this)} /> : null }
				{ this.state.updatePasswordModal === "show-update-password-modal" ? <UpdatePasswordModal updatePasswordModalCloseClicked={this.updatePasswordModalCloseClicked.bind(this)} newPasswordChanged={this.newPasswordChanged.bind(this)} confirmNewPasswordChanged={this.confirmNewPasswordChanged.bind(this)} saveNewPasswordClicked={this.saveNewPasswordClicked.bind(this)} currentPasswordChanged={this.currentPasswordChanged.bind(this)} /> : null }
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

