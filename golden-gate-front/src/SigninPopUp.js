import React from "react"
import "./SigninPopUp.css"


export default class SigninPopUp extends React.Component {

	constructor () {
		super()
		this.state = {
			signin: 'popuptext'
		}
	}

	signinClicked() {
		console.log("mememme")
		this.setState({
			signin: 'show'
			})
	}

	render() {
		return (
		  <div> 
		  	 <h2>Popup</h2>

			 <div className="popup" onClick={this.signinClicked.bind(this)} >Click me to toggle the popup!
  			 <span className={this.state.signin} id="myPopup" ><input type="text" /></span>
			 </div>
		  </div>

			)
	}
}