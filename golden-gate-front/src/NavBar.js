import React from "react";
import "./NavBar.css"
import axios from "axios";
import {withRouter} from "react-router"
import Cart from "./Cart.js"
var FontAwesome = require('react-fontawesome');


class NavBar extends React.Component {

	constructor(props) {
		super()

		this.state = {
			favorites: "",
			// navBarMyAccount: "nav-my-account-button hidden",
			friends: "",
			// navSignIn: "navSignIn show",
		}
		
	}

	registerClicked() {
		this.props.history.push("/register")
	}

	signOutClicked () {
		localStorage.clear();
		sessionStorage.clear()
		this.props.navBarSignOutClicked()
		this.props.userLoggedOutMessageModal()
		this.props.history.push("/main")
	}

	navBarSignInClicked() {
		this.props.navBarSignInClicked()
	}

	myAccountButtonClicked() {
		this.props.history.push("/myaccount")
	}

	componentWillReceiveProps(prevProps, nextProps) {
		if(this.props.userSignedIn) {
			this.setState({
				navSignIn: "navSignIn hidden",
				navBarMyAccount: "nav-my-account-button show"
			})
		}
		// } else {
		// 	this.setState({
		// 		navSignIn: 'navSignIn show',
		// 		navBarMyAccount: 'nav-my-account-button hidden'
		// 	})
		// }
	}


// componentWillMount() {
	
// 		if(this.props.userSignedIn) {
// 			this.setState({
// 				navSignIn: "navSignIn hidden",
// 				navBarMyAccount: "nav-my-account-button show"
// 			})
// 		} else {
// 			this.setState({
// 				navSignIn: 'navSignIn show',
// 				navBarMyAccount: 'nav-my-account-button hidden'
// 			})
// 		}
// 	}

	electronicsClicked() {
		this.props.electronicsClicked()
	}

	
	navCartClicked() {	
		this.props.history.push("/cart")
	}

	navBarSearchFieldFocused() {
		this.navBarSearchDiv.style.width = "45%";
	}

  render() {

  let memberCart = null
		if(this.props.memberCart.length) {
			memberCart = this.props.memberCart
		} else {
			memberCart = this.props.temporaryCart
		}

	return (
	  <div id="navbardiv">

		<div id="nav-bar-company-logo">
			<a href="/main">Golden Gate</a>
			<a href="#">Become a VIP Member</a>
		</div>

		<div id="electronic-div" onClick={this.electronicsClicked.bind(this)}>
			Electronics
		</div>
			
		{ this.props.userSignedIn ? 
			<div id="nav-bar-user-name">
				Welcome, {this.props.memberInfo.firstName} {this.props.memberInfo.lastName} 
			</div>
		: null }

		<div id="nav-search-div" onFocus={this.navBarSearchFieldFocused.bind(this)} ref={(navBarSearchDiv) => { this.navBarSearchDiv = navBarSearchDiv } } >
			<input type="text" name="searchbox" placeholder="Search Here" onChange={(e)=>this.props.memberEnteringDataInSearchField(e)} />
			<button id="search-button" onClick={()=>this.props.memberWantsToSubmitSearch()} >Search</button>
		</div>

		<div id="nav-bar-envelope">
			<FontAwesome name="envelope" size="2x"
			 style={{ position: "absolute", color: "yellow", right: "1.8%", top: "5%" }}/>
		</div>

		<div id="nav-bar-customer-service">
			Customer Service 
		</div>

		<div id="nav-bar-feedback">
			Feedback
		</div>

		<div id="navShoppingCartDiv" onClick={this.navCartClicked.bind(this)} >
			<FontAwesome name="shopping-cart" size="3x"
			 style={{ position: "absolute", color: "#DEB887", right: "1.5%", top: "58%" }}/>
			 { memberCart.length > 0 ? <div id="cartCount">{memberCart.length}</div> : null }
		</div>

		{this.props.userSignedIn ? 
		<div className='nav-my-account-button show'>
			<button onClick={this.myAccountButtonClicked.bind(this)} >My Account</button><span><button id="navBarSignout" onClick={this.signOutClicked.bind(this)} >Sign Out</button></span>
		</div> : null }
		
		{this.props.userSignedIn ? 
		 null :
		<div className='navSignIn show' >
			<button id="navBarSignInButton" onClick={this.navBarSignInClicked.bind(this)} >Sign In</button>
			<button id="navBarRegisterButton" onClick={this.registerClicked.bind(this)}>Register</button>
		</div>
		}

		
	</div>
		)
	}
}

export default withRouter(NavBar)

// <div className="nav-favorites hidden">
// 			<FontAwesome className="heart" name="heart" size="lg"
// 			 style={{ position: "absolute", color: "red", right: "0", top: "0" }}/>
// 			Favorites
// </div>

