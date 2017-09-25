import React from "react";
import "./MyAccountAboutMeModal.css"
export default class MyAccountAboutMeModal extends React.Component {


	aboutMeEditCloseClicked(arg) {
		if(arg === "close") {
	 		var a = this.refs["about-me-modal-content"]
	 		a.className = "hide-about-me-modal-content"
			setTimeout(() =>this.props.aboutMeEditCloseClicked(), 800)
		}
		else {
			var a = this.refs["about-me-modal-content"]
	 		a.className = "hide-about-me-modal-content memberInfo-updated-successfully"
			setTimeout(() =>this.props.aboutMeEditCloseClicked(), 1900)
		}
		
	}

	render () {
		return (
			<div id="about-me-modal-wrapper" className="about-me-modal-wrapper" >

					<div id="about-me-modal-content" ref="about-me-modal-content" className="about-me-modal-content">

						<div id="modal-header">
							<span className="my-account-modal-close" onClick={this.aboutMeEditCloseClicked.bind(this, "close")} >&times;</span>
							<h2>About Me</h2>
						</div>
								
						<div id="about-me-modal-body">
						<form onSubmit={(event) => this.props.aboutMeModalUpdateButtonClicked(event, this.aboutMeEditCloseClicked.bind(this))} >
							<div id="edit-first-name">
								<label className="all-edit-account-labels" htmlFor="new-first-name">First Name</label>
								<input className="all-new-user-data" id="new-first-name" type="text" defaultValue={this.props.memberInfo.firstName} onChange={(event) => this.props.aboutMeFirstNameChanged(event)}/>
					    	</div>
					    	<div id="edit-last-name">
					    		<label className="all-edit-account-labels" htmlFor="new-last-name">Last Name</label>
								<input className="all-new-user-data" id="new-last-name" type="text" defaultValue={this.props.memberInfo.lastName} onChange={(event) => this.props.aboutMeLastNameChanged(event)} />					
							</div>
							<div id="edit-email">
								<label className="all-edit-account-labels" htmlFor="new-user-email">Email</label>
								<input className="all-new-user-data" id="new-user-email" type="email" defaultValue={this.props.memberInfo.email} onChange={(event) => this.props.aboutMeEmailChanged(event)}/>
							</div>
							<div id="new-gender">
								<h3>Gender</h3>
								<div id="gender-male" onClick={(event) => this.props.aboutMeGenderClicked(event, "Male")}>
									MALE
								</div>
								<div id="gender-female" onClick={(event) => this.props.aboutMeGenderClicked(event, "Female")} >
									FEMALE
								</div>
							</div>
							
							<div id="new-dob">
								<h3>DOB</h3>

								<div id="dob-day" className="dob-data">
									<label className="all-edit-dob-labels" htmlFor="new-dob-month">Month</label>
									<input className="all-new-user-data2" id="new-dob-month" type="text"  defaultValue={this.props.memberInfo.dob.slice(5,7)} onChange={(event) => this.props.aboutMeDateOfBirthMonthOrDayChanged(event, "newDobMonth")} />
								</div>
								<div id="dob-month" className="dob-data">
									<label className="all-edit-dob-labels" for="new-dob-day">Day</label>
									<input className="all-new-user-data2" id="new-dob-day" type="text"  defaultValue={this.props.memberInfo.dob.slice(-2)} onChange={(event) => this.props.aboutMeDateOfBirthMonthOrDayChanged(event, "newDobDay")} />
								</div>
								<div id="dob-year" className="dob-data">
									<label className="all-edit-dob-labels" for="new-dob-year">Year</label>
									<input className="all-new-user-data2" id="new-dob-year" type="text"  defaultValue={this.props.memberInfo.dob.slice(0,4)} onChange={(event) => this.props.aboutMeDateOfBirthYearChanged(event)} />
								</div>
							</div>

							<div id="update-button">
								<button type="submit" >UPDATE</button>
							</div>
							</form>
						</div>			

					</div>
				
				</div>
			)
	}
}