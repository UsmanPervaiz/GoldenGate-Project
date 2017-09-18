import React from "react";
import {Route, Switch} from "react-router-dom";
import "./Main.css";
import NavBar from "./NavBar";
import Electronics from "./Electronics.js";
import Register from "./Register.js";
import Cart from "./Cart.js"
// import "./csshake/dist/csshake-little.css"
import Welcome from "./Welcome.js";
import axios from "axios"
import SigninPopUp from "./SigninPopUp"
import "./csshake/dist/csshake-crazy.css";
import FontAwesome from "react-fontawesome";
import Checkout from "./Checkout.js";
import MyAccount from "./MyAccount.js";
import UserLoggedOutMessageModal from "./UserLoggedOutMessageModal.js";
import UserSignedInMessageModal from "./UserSignedInMessageModal.js"
import AccountCreatedMessageModal from "./AccountCreatedMessageModal.js";
import UserLogInModal from "./UserLogInModal.js";
import {withRouter} from "react-router";

class Main extends React.Component {

	constructor(props) {
		super()

		this.state = {
			userSignedIn: false,
			electronics: [],
			temporaryCart: [],
			memberCart: [],
			memberOrder: {},
			memberInfo: "",
			showMainPage: "show-main-page",
			showLoadingSymbol: "show-loading-symbol",
			signInAjaxErrorMessage: "",
			signinEmail: "",
			signinPassword: "",
			signInEmailError: "",
			signInPasswordError: "",		
			signInEmailErrorDisplay: {display: "none"},
			signinInvalidData: true,
			userLogInModal: "",
			userLoggedOutMessageModal: "",
			userSignedInMessageModal: "",
			accountCreatedMessageModal: ""
			}

		}

	imageClicked (event) {
		var imageClicked = event.target
		var modal = this.refs.appMyModal
		var modalImage = this.refs.img01
		modal.style.display = "block"
		modalImage.src = imageClicked.src 
		
	}

	myModalSpanClicked() {
		this.refs.appMyModal.style.display = "none"	
	}

	addToCartClicked(product, productQuantity) {

		if(this.state.userSignedIn) {
			if(this.state.memberCart.length === 0) {
		  		var token = localStorage.getItem("token")
		  		axios.post('http://localhost:3000/api/v1/order_details', {
						
							product_id: product.id,
							token: token,
							quantity: productQuantity
					
				}).then((resp)=> this.setState({
									memberCart: resp.data.currentOrderDetails,
									memberOrder: resp.data.order
				})
				).catch((error)=> console.log(error))
			
			} else {
				
				var token = localStorage.getItem("token")

		  		axios.put("http://localhost:3000/api/v1/order_details/500", {

				 		product_id: product.id,
						quantity: productQuantity,
						token: token  

				})
				.then((resp)=> this.setState({
					memberCart: resp.data.currentOrderDetails,
					memberOrder: resp.data.order
				}) )
				.catch((error) => console.log(error))
			} 
	    } else {
	    	if(localStorage.temporaryCart) {
	    		var getLocalCart = JSON.parse(localStorage.temporaryCart)
	    		getLocalCart.push(product)
	    		localStorage.setItem("temporaryCart", JSON.stringify(getLocalCart))
	    	} else {
	    		var setLocalCart = [product]
	    		localStorage.setItem("temporaryCart", JSON.stringify(setLocalCart))
	    		console.log(localStorage)
	    	}
		}
	}

	removeFromCartClicked(product) {
		var productToRemove = Object.values(product)[0]
		axios.delete(`http://localhost:3000/api/v1/order_details/${productToRemove.id}`,{
			headers: { 'token': localStorage.token }
		}).then((resp)=> this.setState({
							memberCart: resp.data.currentOrderDetails,
							memberOrder: resp.data.order
						})
		).catch((error)=> console.log(error))
	}

	electronicsClicked(e) {
		
		axios.get("http://localhost:3000/api/v1/products")
		.then((resp)=> {
			this.setState({
				electronics: resp.data
			})
		}).then(()=> this.props.history.push("/electronics"))
		.catch((error)=> console.log(error))
	}

	isUserSignedIn() {
		if(localStorage.token) {
			this.setState({
				userSignedIn: true
			})
		}
	}

	userSignedInMessageModal() {
		this.setState({
			userSignedInMessageModal: "show-logged-out-message-modal"
		})
		setTimeout(()=> 
			this.setState({
			userSignedInMessageModal: ""
		}), 1000)
	}

	userLoggedOutMessageModal() {
		this.setState({
			userLoggedOutMessageModal: "show-logged-out-message-modal"
		})
		setTimeout(()=> 
			this.setState({
			userLoggedOutMessageModal: ""
		}), 1000)
	}

	accountCreatedMessageModal() {
		this.setState({
			accountCreatedMessageModal: "show-logged-out-message-modal"
		})
		setTimeout(()=> 
			this.setState({
			accountCreatedMessageModal: ""
		}), 1000)
	}

	navBarSignInClicked() {
		this.setState({
			userLogInModal: "show-sign-in-modal"
		})
	}

	navBarSigninCloseClicked() {
		this.setState({
			userLogInModal: ""
		})
	}

	signinOnEmailChange(e) {
		var signinEmailFieldValue = e.target.value.trim()	
		 	this.setState({
				signinEmail: signinEmailFieldValue,
			},()=> console.log(this.state.signinEmail))
	}

	signinOnPasswordChange(e, signinPasswordField) {
		var signinPasswordFieldValue = e.target.value.trim()
		if(signinPasswordFieldValue.length > 15) {
			signinPasswordField.value = signinPasswordFieldValue.substr(0,15)
			this.setState({
				signinPassword: signinPasswordFieldValue.substr(0,15),
				signInPasswordError: "Password maximum length reached!"
			})
		} else {
			this.setState({
				signinPassword: signinPasswordFieldValue,
				signInPasswordErrorDisplay: {display: "none"}
			}, ()=> console.log(this.state.signinPassword))
		}
	}

	signinButtonClicked(signInErrorDiv) {
		axios.post("http://localhost:3000/api/v1/sign_in", {	
				email: this.state.signinEmail,
				password: this.state.signinPassword
				
			}).then((resp)=> {  
				localStorage.setItem("token", resp.data.token)
			})
		      .then((resp)=> this.props.history.push("/main"))
		      .then(()=> this.userSignedInMessageModal())
		      .catch((error)=> { 
		  		this.setState({
		  			signInAjaxErrorMessage: error.response.data.error
		  		}, () => signInErrorDiv.className = "show-signin-error-div" )} 
		  	  )
	}

	signInModalSubmitButtonClicked(e, signInErrorDiv, logInForm) {
			axios.post("http://localhost:3000/api/v1/sign_in", {	
				email: this.state.signinEmail,
				password: this.state.signinPassword
				
			}).then((resp)=> { 
				localStorage.setItem("token", resp.data.token)
			})
		      .then((resp)=> this.props.history.push("/main"))
		      .then(()=> {
		      	this.navBarSigninCloseClicked()
		      	this.setState({
		      		signinEmail: "",
		      		signInPasswordError: ""
		      	})
		      })
		      // .then(()=> this.userSignedInMessageModal())
		      .catch((error)=> { 
		  		this.setState({
		  			signInAjaxErrorMessage: error.response.data.error
		  		}, () => signInErrorDiv.className = "show-user-signin-modal-error-div") 
		  		logInForm.className = "user-sign-in-modal-back-face focused"
		  	  })
	}

	saveNewPassword(event) {
		event.preventDefault()
		console.log("TIPU")
	}

	updateMemberInfo() {
		axios.get("http://localhost:3000/api/v1/members/0", {
			headers: {"token": localStorage.token}
		}).then((resp) => this.setState({
								memberInfo: resp.data.memberInfo
							})
		)
	}

	componentDidUpdate(prevProps, prevState) {
		console.log("PREVSTATE", prevState, "THISSTATE", this.state)
	}

	componentWillReceiveProps() {
		console.log("mainWillReceiveProps")
		if(localStorage.token) {
			this.setState({
				userSignedIn: true,
				// showMainPage: "hide-main-page",
				showLoadingSymbol: "show-loading-symbol"
			})
			axios.get("http://localhost:3000/api/v1/carts/show", {
				headers: { token: localStorage.token }
			}).then((resp)=> this.setState({
								memberCart: resp.data.currentOrderDetails,
								memberOrder: resp.data.order,
								userSignedIn: true,
								memberInfo: resp.data.memberInfo
			    			})
			).catch((error)=> console.log(error.response))
		} else {
		 	this.setState({
		 		userSignedIn: false
		 	})
		 
			if (localStorage.temporaryCart) {
				var getLocalCart = JSON.parse(localStorage.temporaryCart)
				this.setState({
				temporaryCart: getLocalCart
				})
			}
		}
		setTimeout(()=> this.setState({
			// showMainPage: "show-main-page",
			showLoadingSymbol: "hide-loading-symbol"
		}), 1000)
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	console.log("mainDidUpdate", "thisState",this.state, "PREVSTATE", prevState)
	// 	axios.get("http://localhost:3000/api/v1/carts/show", {
	// 			headers: { token: localStorage.token }
	// 		}).then((resp)=> {
	// 			if(resp.data.currentOrderDetails !== this.state.memberCart || resp.data.order !== this.state.memberOrder || resp.data.memberInfo !== this.state.memberInfo) {
	// 				this.setState({
	// 						memberCart: resp.data.currentOrderDetails,
	// 						memberOrder: resp.data.order,
	// 						userSignedIn: true,
	// 						memberInfo: resp.data.memberInfo
	// 		    	})
	// 			}
	// 		}
	// 		).catch((error)=> console.log(error.response))
	// }

	componentDidMount() {
		if(localStorage.token) {
			axios.get("http://localhost:3000/api/v1/carts/show", {
				headers: { token: localStorage.token }
			}).then((resp)=>  { this.setState({
								memberCart: resp.data.currentOrderDetails,
								memberOrder: resp.data.order,
								userSignedIn: true,
								memberInfo: resp.data.memberInfo
			    			})
			console.log("XXXXX", resp.data)
		        }
			).catch((error)=> console.log(error.response))
		} else {
			this.setState({
				userSignedIn: false
			})
		}
		if (localStorage.temporaryCart){
			var getLocalCart = JSON.parse(localStorage.temporaryCart)
			this.setState({
				temporaryCart: getLocalCart
			})
		}
		setTimeout(()=> this.setState({
			// showMainPage: "show-main-page",
			showLoadingSymbol: "hide-loading-symbol"
		}), 1000)
	}


	render () {
		console.log("FORCED MAIN")
		return (
			<div >
				
			  <div id={this.state.showMainPage}>
			  <div id="navBar">
				<NavBar electronicsClicked={this.electronicsClicked.bind(this)} userSignedIn={this.state.userSignedIn} memberCart={this.state.memberCart} memberName={this.state.memberName} userLoggedOutMessageModal={this.userLoggedOutMessageModal.bind(this)} navBarSignInClicked={this.navBarSignInClicked.bind(this)} />
			  </div>
				<div id="myModal" ref="appMyModal" className="appModal" >
					<span className="appClose" onClick={ this.myModalSpanClicked.bind(this) } >&times;</span>
					<img className="app-modal-content" id="img01" ref="img01" />
					<div id="caption" ref="caption" ></div>
				</div>

				{ this.state.userLoggedOutMessageModal ? <UserLoggedOutMessageModal userLoggedOutMessageModal={this.userLoggedOutMessageModal.bind(this)} /> : null }
				{ this.state.accountCreatedMessageModal ? <AccountCreatedMessageModal accountCreatedMessageModal={this.accountCreatedMessageModal.bind(this)} /> : null }
				{ this.state.userSignedInMessageModal  ? <UserSignedInMessageModal /> : null }
			  	{ this.state.userLogInModal ? <UserLogInModal navBarSigninCloseClicked={this.navBarSigninCloseClicked.bind(this)} signinOnEmailChange={this.signinOnEmailChange.bind(this)} signinOnPasswordChange={this.signinOnPasswordChange.bind(this)} signInModalSubmitButtonClicked={this.signInModalSubmitButtonClicked.bind(this)} mainState={this.state} /> : null }

			  	<Switch>
			      <Route exact path="/" render={(props)=> <Welcome {...props} />} />
			      <Route exact path="/signin" render={(props)=> <SigninPopUp {...props} />} />
	  			  <Route exact path="/register" render={(props)=> <Register {...props} userSignedIn={this.state.userSignedIn} accountCreatedMessageModal={this.accountCreatedMessageModal.bind(this)} userSignedInMessageModal={this.userSignedInMessageModal.bind(this)} signinOnEmailChange={this.signinOnEmailChange.bind(this)} signinOnPasswordChange={this.signinOnPasswordChange.bind(this)} signinButtonClicked={this.signinButtonClicked.bind(this)} mainState={this.state} /> }/>
			      <Route exact path="/electronics" render={(props)=> <Electronics {...props} imageClicked={this.imageClicked.bind(this)} electronicsList={this.state.electronics} addToCartClicked={this.addToCartClicked.bind(this)}/> } />
	  			  <Route exact path="/cart" render={(props)=> <Cart {...props} userSignedIn={this.state.userSignedIn} temporaryCart={this.state.temporaryCart} memberCart={this.state.memberCart} memberOrder={this.state.memberOrder} addToCartClicked={this.addToCartClicked.bind(this)} removeFromCartClicked={this.removeFromCartClicked.bind(this)} /> } />
			  	  <Route exact path="/checkout" component={Checkout} />
			  	  <Route exact path="/myaccount" render={(props)=> <MyAccount {...props} userSignedIn={this.state.userSignedIn} memberInfo={this.state.memberInfo} saveNewPassword={this.saveNewPassword.bind(this)} updateMemberInfo={this.updateMemberInfo.bind(this)} /> }/>
			  	</Switch>
				</div>

			  <div id={this.state.showLoadingSymbol}>
			  	<div id="loading-symbol-body">
			    <FontAwesome className="circle-o-notch" name="circle-o-notch" spin size="5x"/>
			    <h2>Loading....</h2>
			    </div>
			  </div>

			</div>

			)
	}
}

export default withRouter(Main)