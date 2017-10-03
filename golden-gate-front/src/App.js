import React from "react";
import {Route, Switch} from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import Electronics from "./Electronics.js";
import Register from "./Register.js";
import Cart from "./Cart.js"
// import "./csshake/dist/csshake-little.css"
import Welcome from "./Welcome.js";
import axios from "axios"
import "./csshake/dist/csshake-crazy.css";
import FontAwesome from "react-fontawesome";
import Checkout from "./Checkout.js";
import MyAccount from "./MyAccount.js";
import UserLoggedOutMessageModal from "./UserLoggedOutMessageModal.js";
import UserSignedInMessageModal from "./UserSignedInMessageModal.js"
import AccountCreatedMessageModal from "./AccountCreatedMessageModal.js";
import UserLogInModal from "./UserLogInModal.js";
import {withRouter} from "react-router";

class App extends React.Component {

	constructor(props) {
		super()

		this.state = {
			userSignedIn: false,
			keepUserSignedIn: false,
			addedToCart: "",
			electronics: [],
			temporaryCart: [],
			memberCart: [],
			memberOrder: {},
			memberInfo: "",
			memberAddresses: [],
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

	keepMeSignedInClicked(e) {
		console.log("EVIL", e.target.checked)
		let keepMeSignedInCheckdOrNot = e.target.checked
		this.setState( (prevState, props) => {
			return {keepUserSignedIn: keepMeSignedInCheckdOrNot}
		})
	}

	updateMemberAddresses(addresses) {
		this.setState({
			memberAddresses: addresses
		})
	}

	userWantsToDeleteAddress(addressToDelete) {
		var newMemberAddresses = this.state.memberAddresses
		newMemberAddresses.forEach((address) => {
			address.userWantsToDelete = false
		})
		newMemberAddresses.forEach((address) => {
			if(address === addressToDelete) {
				address.userWantsToDelete = true
			}
		})
		this.setState({
			memberAddresses: newMemberAddresses
			})
	}

	doNotDeleteMemberAddressClicked() {
		var memberAddresses = this.state.memberAddresses
		memberAddresses.forEach((address)=>{
			address.userWantsToDelete = false
		})
		this.setState({
			memberAddresses: memberAddresses
		})
	}

	permanentlyDeleteMemberAddress(addressId) {
		let useThisToken = null
		if(localStorage.getItem("token")) {
			useThisToken = localStorage.getItem("token")
		} else {
			useThisToken = sessionStorage.getItem("token")
		}
		axios.delete(`http://localhost:3000/api/v1/addresses/${addressId}`,
			{ headers: {"TOKEN": useThisToken} }
			)
		.then((resp)=> {
			var modifiedMemberAddresses = resp.data.memberAddresses
			modifiedMemberAddresses.forEach((address) => {
				address.userWantsToDelete = false
			})
			this.setState({
				memberAddresses: modifiedMemberAddresses
			})
		})
	}

	setDefaultAddressClicked(addressId) {
		let useThisToken = null
		if(localStorage.getItem("token")) {
			useThisToken = localStorage.getItem("token")
		} else {
			useThisToken = sessionStorage.getItem("token")
		}
		axios.put(`http://localhost:3000/api/v1/set_default_address/${addressId}`,
			{addressId: addressId},
			{ headers: {"TOKEN": useThisToken} }
			)
		.then((resp)=> {
			var modifiedMemberAddresses = resp.data.memberAddresses
			modifiedMemberAddresses.forEach((address) => {
				address.userWantsToDelete = false
			})
			this.setState({
				memberAddresses: modifiedMemberAddresses
			})
		})
	}

	imageClicked(event) {
		var imageClicked = event.target
		var modal = this.refs.appMyModal
		var modalImage = this.refs.img01
		modal.style.display = "block"
		modalImage.src = imageClicked.src 
		
	}

	myModalSpanClicked() {
		this.refs.appMyModal.style.display = "none"	
	}

	addToCartClicked(product, productQuantity, divForUpdatedItem, updateButtonforItem) {
		var updatedElectronics = this.state.electronics
		updatedElectronics.forEach(function(electronicProduct) {
			if(electronicProduct === product) {
				electronicProduct.style = {opacity: 0.5}
			}
		})
		if(this.state.userSignedIn) {
			if(this.state.memberCart.length === 0) {
		  		let token = localStorage.getItem("token")
		  		if(!token) {
		  			token = sessionStorage.getItem("token")
		  		}
		  		axios.post('http://localhost:3000/api/v1/order_details', {
						
							product_id: product.id,
							token: token,
							quantity: productQuantity
					
				}).then((resp)=> { 

					this.setState({
									memberCart: resp.data.currentOrderDetails,
									memberOrder: resp.data.order,
									addedToCart: true,
									electronics: updatedElectronics
				}) 

				})
				.catch((error)=> console.log(error))
			
			} else {
				let token = localStorage.getItem("token")
		  		if(!token) {
		  			token = sessionStorage.getItem("token")
		  		}
		  		axios.put("http://localhost:3000/api/v1/order_details/500", {

				 		product_id: product.id,
						quantity: productQuantity,
						token: token  

				})
				.then((resp)=> this.setState({
					memberCart: resp.data.currentOrderDetails,
					memberOrder: resp.data.order,
					addedToCart: true,
					electronics: updatedElectronics
				}) 
				)
				.then(() => { 
					if(divForUpdatedItem) {
					var currentClassName = divForUpdatedItem.className
					var newClassName = "item-in-cart-updated-successfully"
					divForUpdatedItem.className = "item-in-cart-updated-successfully"
					updateButtonforItem.className = "hide-update-cart-button"
					setTimeout(function() { divForUpdatedItem.className = currentClassName }, 1000)

				}})
				.catch((error) => console.log(error))
			} 
	    } else {
	    	
	    	if(localStorage.getItem("temporaryCart").length) {

	    		let temporaryCart = JSON.parse(localStorage.getItem("temporaryCart"))
	    		let isProductAlreadyInCart = false;
	    		
	    		temporaryCart.forEach((itemObject,index) => {
	    			for(var key in itemObject) {
	    				if(itemObject[key].id === product.id) {
	    					isProductAlreadyInCart = true
	    					let modifyProductQuantity = {[productQuantity]: product}
	    					temporaryCart.splice(index, 1, modifyProductQuantity)
	    				} 
	    			}
	    		})
	    		if(!isProductAlreadyInCart) {

	    			temporaryCart.push({[productQuantity]: product})
	    		}
	    		console.log("CCCC:", temporaryCart)
	    		localStorage.setItem("temporaryCart", JSON.stringify(temporaryCart))
	    		this.setState({
	    			temporaryCart: temporaryCart
	    		})

	    	} else {  
	    	console.log("xxxxxxx")		
	    		let setTemporaryCart = []
	    		setTemporaryCart.push({[productQuantity]: product})
	    		localStorage.setItem("temporaryCart", JSON.stringify(setTemporaryCart))
	    		this.setState({
	    			temporaryCart: setTemporaryCart
	    		})
	    	}
		}
	}


	removeFromCartClicked(product) {
		let useThisToken = localStorage.getItem("token") || sessionStorage.getItem("token")
		// let localStorageToken = localStorage.getItem("token") 
		// let sessionStorageToken = sessionStorage.getItem("token")
		// if(localStorageToken) {
		// 	useThisToken = localStorageToken
		// } else {
		// 	useThisToken = sessionStorageToken
		// }

		var productToRemove = parseInt(Object.values(product)[0].id)
		if(this.state.userSignedIn) {
			axios.delete(`http://localhost:3000/api/v1/order_details/${productToRemove}`,{
				headers: { 'token': useThisToken }
			}).then((resp)=> this.setState({
							memberCart: resp.data.currentOrderDetails,
							memberOrder: resp.data.order
						})
			).catch((error)=> console.log(error))
		} else {
			let temporaryCart = JSON.parse(localStorage.getItem("temporaryCart"))
			
			temporaryCart.forEach((itemObject,index) => {
				for(var key in itemObject) {
					
					if(itemObject[key].id === Object.values(product)[0].id) {
						console.log("item:", product)
						// delete itemObject[key]
						temporaryCart.splice(index, 1)
						break;
					}
				}
			})
			localStorage.setItem("temporaryCart", JSON.stringify(temporaryCart))
			this.setState({
				temporaryCart: temporaryCart
			})
		}
	}

	electronicsClicked(e) {	
		axios.get("http://localhost:3000/api/v1/products")
		.then((resp)=> {
			if(this.state.memberCart.length >= 1 ) {
				resp.data.forEach(function(item,i) {					
					this.state.memberCart.forEach(function(prodObj) {
						for(var key in prodObj) {
							if(prodObj[key].id === item.id) {
								item.style = {opacity: "0.5"}
							} 
						}
					})
				}.bind(this))
					this.setState({
						electronics: resp.data
					})
			} else {
				this.setState({
					electronics: resp.data
				})
			}
				
		})
		.then(()=> this.props.history.push("/electronics"))
		.catch((error)=> console.log(error))
			
	}

	isUserSignedIn() {
		let checkThisToken = null
		let localStorageToken = localStorage.getItem("token")
		let sessionStorageToken = sessionStorage.getItem("token")
		if(localStorageToken) {
			checkThisToken = localStorageToken
		} else {
			checkThisToken = sessionStorageToken
		}
		if(checkThisToken) {
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

	navBarSignOutClicked() {
		this.setState({
			userSignedIn: false,
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
				if(this.state.keepUserSignedIn) {
					localStorage.setItem("token", resp.data.token)
				} else {
					sessionStorage.setItem("token", resp.data.token)
				}
			})
			.then(()=> this.setState({
				signinEmail: "",
		      	signInPasswordError: "",
				userSignedIn: true
			}))
			// .then(()=> {
			// 	if(localStorage.getItem("temporaryCart")) {				
			// 		JSON.parse(localStorage.getItem("temporaryCart")).forEach((itemObject) => {
			// 			for(var key in itemObject) {
			// 					this.addToCartClicked(itemObject[key], parseInt(key))
			// 			}
			// 		})
			// 	}	
			// })
			.then(()=> this.userSignedInMessageModal())
		      .then((resp)=> this.props.history.push("/main"))
		      .catch((error)=> { 
		      	console.log(error.response)
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
				
				if(this.state.keepUserSignedIn) {
					localStorage.setItem("token", resp.data.token)
				} else {
					sessionStorage.setItem("token", resp.data.token)
				}
			})
		      .then(()=> {
		      	this.navBarSigninCloseClicked()
		      	this.setState({
		      		signinEmail: "",
		      		signInPasswordError: "",
		      		userSignedIn: true
		      	})
		      })
		      .then((resp)=> this.props.history.push("/main"))
		      .catch((error)=> { 
		  		this.setState({
		  			signInAjaxErrorMessage: error.response.data.error
		  		}, () => signInErrorDiv.className = "show-user-signin-modal-error-div") 
		  		logInForm.className = "user-sign-in-modal-back-face focused"
		  	  })
	}

	updateMemberInfo() {
		let useThisToken = null
		let localStorageToken = localStorage.getItem("token")
		let sessionStorageToken = sessionStorage.getItem("token")

		if(localStorageToken) {
			useThisToken = localStorageToken
		} else {
			useThisToken = sessionStorageToken
		}
		axios.get("http://localhost:3000/api/v1/members/0", {
			headers: {"token": useThisToken}
		}).then((resp) => this.setState({
								memberInfo: resp.data.memberInfo
							})
		)
	}

	componentDidUpdate(prevProps, prevState) {
		console.log("APP DID UPDATE", this.state)

	}


	componentWillReceiveProps(nextProps) {
		// This life-cycle method is skppied on "this.setState" and that is the reason why the loading symbol is not seen when updating the sign-in input fields
		console.log("APPWillReceiveProps", nextProps)
		this.setState({
				showLoadingSymbol: "show-loading-symbol"
			})
		let useThisToken = null
		let localStorageToken = localStorage.getItem("token")
		let sessionStorageToken = sessionStorage.getItem("token")
		if(localStorageToken) {
			useThisToken = localStorageToken
		} else {
			useThisToken = sessionStorageToken
		}
		if(useThisToken) {
			axios.get("http://localhost:3000/api/v1/carts/show", {
				headers: { token: useThisToken }
			}).then((resp)=> {
					var modifiedMemberAddresses = resp.data.addresses
					modifiedMemberAddresses.forEach((address) => {
					address.userWantsToDelete = false
					})
					this.setState({
						userSignedIn: true,
						memberCart: resp.data.currentOrderDetails,
						memberOrder: resp.data.order,
						memberInfo: resp.data.memberInfo,
						memberAddresses: modifiedMemberAddresses
			    	})
			})
			.then(()=> {
				if(localStorage.getItem("temporaryCart")) {				
					JSON.parse(localStorage.getItem("temporaryCart")).forEach((itemObject) => {
						for(var key in itemObject) {
							this.addToCartClicked(itemObject[key], parseInt(key))
						}
					})
				}	
			})
			.catch((error)=> console.log(error.response))
		} 
		else {
			this.setState({
				userSignedIn: false,
				memberCart: [],
				memberOrder: {},
				memberInfo: "",
				memberAddresses: []
			})
		}
		setTimeout(()=> this.setState({
			showLoadingSymbol: "hide-loading-symbol"
		}), 1000)
	}

	componentDidMount() {
		console.log("APP DID MOUNT", this.state)
		var localStorageToken = localStorage.getItem("token")
		var sessionStorageToken = sessionStorage.getItem("token")
		var useThisToken = null
		if(localStorageToken) {
			useThisToken = localStorageToken
		} else {
			useThisToken = sessionStorageToken
		}
	
		if(useThisToken) {
			axios.get("http://localhost:3000/api/v1/carts/show", {
				headers: { token: useThisToken }
			}).then((resp)=>  { 
					var modifiedMemberAddresses = resp.data.addresses
					modifiedMemberAddresses.forEach((address) => {
						address.userWantsToDelete = false
					})
					this.setState({
						memberCart: resp.data.currentOrderDetails,
						memberOrder: resp.data.order,
						userSignedIn: true,
						memberInfo: resp.data.memberInfo,
						memberAddresses: modifiedMemberAddresses
			    	})
		   	})
			.catch((error)=> console.log(error.response))
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
	
		return (
			<div >
			
			  	<div id={this.state.showMainPage}>
			  		<div id="navBar">
						<NavBar electronicsClicked={this.electronicsClicked.bind(this)} userSignedIn={this.state.userSignedIn} memberCart={this.state.memberCart} temporaryCart={this.state.temporaryCart} memberInfo={this.state.memberInfo} userLoggedOutMessageModal={this.userLoggedOutMessageModal.bind(this)} navBarSignInClicked={this.navBarSignInClicked.bind(this)} navBarSignOutClicked={this.navBarSignOutClicked.bind(this)} />
			  		</div>
			  		<div id={this.state.showLoadingSymbol}>
			  			<div id="loading-symbol-body">
			    			<FontAwesome className="circle-o-notch" name="circle-o-notch" spin size="5x"/>
			    			<h2>Loading....</h2>
			    		</div>
			  		</div>

			  	{ this.state.addedToCart ? 
			  		<div id="myModal" ref="appMyModal" className="appModal" >
						<span className="appClose" onClick={ this.myModalSpanClicked.bind(this) } >&times;</span>
						<img className="app-modal-content" id="img01" ref="img01" />
						<div id="caption" ref="caption" ></div>
					</div> 
					: null }

				<div id="myModal" ref="appMyModal" className="appModal" >
					<span className="appClose" onClick={ this.myModalSpanClicked.bind(this) } >&times;</span>
					<img className="app-modal-content" id="img01" ref="img01" />
					<div id="caption" ref="caption" ></div>
				</div>

				{ this.state.userLoggedOutMessageModal ? <UserLoggedOutMessageModal userLoggedOutMessageModal={this.userLoggedOutMessageModal.bind(this)} /> : null }
				{ this.state.accountCreatedMessageModal ? <AccountCreatedMessageModal accountCreatedMessageModal={this.accountCreatedMessageModal.bind(this)} /> : null }
				{ this.state.userSignedInMessageModal  ? <UserSignedInMessageModal /> : null }
			  	{ this.state.userLogInModal ? <UserLogInModal keepMeSignedInClicked={this.keepMeSignedInClicked.bind(this)} navBarSigninCloseClicked={this.navBarSigninCloseClicked.bind(this)} signinOnEmailChange={this.signinOnEmailChange.bind(this)} signinOnPasswordChange={this.signinOnPasswordChange.bind(this)} signInModalSubmitButtonClicked={this.signInModalSubmitButtonClicked.bind(this)} appState={this.state} /> : null }

			  	<Switch>
			      <Route exact path="/" render={(props)=> <Welcome {...props} />} />
			      <Route exact path="/login" render={(props)=> <UserLogInModal keepMeSignedInClicked={this.keepMeSignedInClicked.bind(this)} navBarSigninCloseClicked={this.navBarSigninCloseClicked.bind(this)} signinOnEmailChange={this.signinOnEmailChange.bind(this)} signinOnPasswordChange={this.signinOnPasswordChange.bind(this)} signInModalSubmitButtonClicked={this.signInModalSubmitButtonClicked.bind(this)} appState={this.state} /> } />
	  			  <Route exact path="/register" render={(props)=> <Register {...props} userSignedIn={this.state.userSignedIn} keepMeSignedInClicked={this.keepMeSignedInClicked.bind(this)} accountCreatedMessageModal={this.accountCreatedMessageModal.bind(this)} userSignedInMessageModal={this.userSignedInMessageModal.bind(this)} signinOnEmailChange={this.signinOnEmailChange.bind(this)} signinOnPasswordChange={this.signinOnPasswordChange.bind(this)} signinButtonClicked={this.signinButtonClicked.bind(this)} signinEmail={this.state.signinEmail} signinPassword={this.state.signinPassword} signInAjaxErrorMessage={this.state.signInAjaxErrorMessage} signInEmailError={this.state.signInEmailError} signInPasswordError={this.state.signInPasswordError} /> }/>
			      <Route exact path="/electronics" render={(props) => <Electronics {...props} electronics={this.state.electronics} imageClicked={this.imageClicked.bind(this)} electronicsList={this.state.electronics} memberCart={this.state.memberCart} addToCartClicked={this.addToCartClicked.bind(this)}/> } />
	  			  <Route exact path="/cart" render={(props)=> <Cart {...props} userSignedIn={this.state.userSignedIn} navBarSignInClicked={this.navBarSignInClicked.bind(this)} temporaryCart={this.state.temporaryCart} memberCart={this.state.memberCart} memberOrder={this.state.memberOrder} addToCartClicked={this.addToCartClicked.bind(this)} removeFromCartClicked={this.removeFromCartClicked.bind(this)} /> } />
			  	  <Route exact path="/checkout" component={Checkout} />
			  	  <Route exact path="/myaccount" render={(props)=> <MyAccount {...props} userSignedIn={this.state.userSignedIn} memberInfo={this.state.memberInfo} updateMemberInfo={this.updateMemberInfo.bind(this)} navBarSignInClicked={this.navBarSignInClicked.bind(this)} memberAddresses={this.state.memberAddresses} updateMemberAddresses={this.updateMemberAddresses.bind(this)} userWantsToDeleteAddress={this.userWantsToDeleteAddress.bind(this)} doNotDeleteMemberAddressClicked={this.doNotDeleteMemberAddressClicked.bind(this)} permanentlyDeleteMemberAddress={this.permanentlyDeleteMemberAddress.bind(this)} setDefaultAddressClicked={this.setDefaultAddressClicked.bind(this)} /> }/>			  	  
			  	</Switch>
				</div>
			</div>

			)
	}
}

export default withRouter(App)