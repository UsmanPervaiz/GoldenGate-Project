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

  render() {
  console.log("RRRRRRR", this.props)
	return (
	  <div id="navbardiv">

		<div className="navBrandNameLogo">
			<a href="/main">Golden Gate</a>
			<a href="#">Become a VIP Member</a>
		</div>

		<div className="navDepartments">
			<ul>
				<li id="department">Departments
					<ul>
						<li onClick={this.electronicsClicked.bind(this)} >Electronics
							<ul>
								<li>Laptop</li>
								<li>Tablets</li>
							</ul>
						</li>
						<li id="second">Clothing
							<ul>
								<li>Clothing 1</li>
								<li>Clothing 2</li>
								<li>Clothing 3</li>
							</ul>
						</li>
					</ul>
				</li>	
			</ul>

		</div>

		<div>
			<ul className="NavBar">
			 
			</ul>
		</div>
			
		<div className="navSearchInput">
			{ this.props.userSignedIn ? <p>Welcome, {this.props.memberInfo.firstName} {this.props.memberInfo.lastName} </p> : null }
			<input type="text" name="searchbox" placeholder="Search Here" />
			<span className="searchButton"><button>Search</button></span>
		</div>

		<div className="navEnvelope">
			<FontAwesome className="envelope" name="envelope" size="2x"
			 style={{ position: "absolute", color: "yellow", right: "35px", top: "25px" }}/>
		</div>

		<div className="navShoppingCartDiv" onClick={this.navCartClicked.bind(this)} >
			<FontAwesome className="shoppingCart" name="shopping-cart" size="3x"
			 style={{ position: "absolute", color: "#DEB887", float:"right", right: "4.3%", top: "9.4%" }}/>
			 <span id="navCartName" >Cart</span>
			 { this.props.memberCart.length > 0 ? <div id="cartCount">{this.props.memberCart.length}</div> : null }
		</div>

		{this.props.userSignedIn ? 
		<div className='nav-my-account-button show'>
			<button onClick={this.myAccountButtonClicked.bind(this)} >My Account</button><span><button id="navBarSignout" onClick={this.signOutClicked.bind(this)} >Sign Out</button></span>
		</div> : null }

		<div className="nav-favorites hidden">
			<FontAwesome className="heart" name="heart" size="lg"
			 style={{ position: "absolute", color: "red", right: "85px", top: "1px" }}/>
			Favorites
		</div>
		
		{this.props.userSignedIn ? 
		 null :
		<div className='navSignIn show' >
			<button id="navBarSignInButton" onClick={this.navBarSignInClicked.bind(this)} >Sign In</button>
			<button id="navBarRegisterButton" onClick={this.registerClicked.bind(this)}>Register</button>
		</div>
		}

		<div className="navCustomerService">
			Customer Service 
		</div>

		<div className="navMembership">
			Membership
		</div>

		<div className="navFeedback">
			Feedback
		</div>

		
	</div>
		)
	}
}

export default withRouter(NavBar)