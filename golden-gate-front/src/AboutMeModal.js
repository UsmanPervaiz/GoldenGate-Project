import React from "react";
import "./AboutMeModal.css"
export default class AboutMeModal extends React.Component {


	aboutMeEditCloseClicked() {
	 	var a = this.refs["about-me-modal-content"]
	 	a.className = "hide-about-me-modal-content"
		setTimeout(() =>this.props.aboutMeEditCloseClicked(), 800)
		
	}

	render () {

		return (
			<div id="about-me-modal-wrapper" className="about-me-modal-wrapper" >

					<div id="about-me-modal-content" ref="about-me-modal-content" className="about-me-modal-content">

						<div id="modal-header">
							<span className="my-account-modal-close" onClick={this.aboutMeEditCloseClicked.bind(this)} >&times;</span>
							<h2>About Me</h2>
						</div>
								
						<div id="about-me-modal-body">

							<div id="edit-first-name">
								<label className="all-edit-account-labels" for="new-first-name">First Name</label>
								<input className="all-new-user-data" id="new-first-name" type="text" defaultValue="Usman" />
					    	</div>
					    	<div id="edit-last-name">
					    		<label className="all-edit-account-labels" for="new-last-name">Last Name</label>
								<input className="all-new-user-data" id="new-last-name" type="text" defaultValue="Pervaiz" />					
							</div>
							<div id="edit-email">
								<label className="all-edit-account-labels" for="new-user-email">Email</label>
								<input className="all-new-user-data" id="new-user-email" type="text" defaultValue="de.usman@yahoo.com" />
							</div>
							<div id="new-gender">
								<h3>Gender</h3>
								<div id="gender-male">
									MALE
								</div>
								<div id="gender-female">
									FEMALE
								</div>
							</div>

							<div id="new-dob">
								<h3>DOB</h3>
								<div id="dob-day" className="dob-data">
									<label className="all-edit-dob-labels" for="new-dob-month">Month</label>
									<input className="all-new-user-data2" id="new-dob-month" type="text" defaultValue="05" />
								</div>
								<div id="dob-month" className="dob-data">
									<label className="all-edit-dob-labels" for="new-dob-day">Day</label>
									<input className="all-new-user-data2" id="new-dob-day" type="text" defaultValue="11" />
								</div>
								<div id="dob-year" className="dob-data">
									<label className="all-edit-dob-labels" for="new-dob-year">Year</label>
									<input className="all-new-user-data2" id="new-dob-year" type="text" defaultValue="1980" />
								</div>
							</div>

							<div id="update-button">
								<button>UPDATE</button>
							</div>
						</div>			

					</div>
				
				</div>
			)
	}
}