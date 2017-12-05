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
// import "./csshake/dist/csshake-crazy.css";
import FontAwesome from "react-fontawesome";
import Checkout from "./Checkout.js";
import MyAccount from "./MyAccount.js";
import UserLogInModal from "./UserLogInModal.js";
import UserLoggedOutMessageModal from "./UserLoggedOutMessageModal.js";
import UserSignedInMessageModal from "./UserSignedInMessageModal.js"
import AccountCreatedMessageModal from "./AccountCreatedMessageModal.js";
import ForgotPassword from "./ForgotPassword.js";
import {withRouter} from "react-router";

var copyOfAllElectronics = null;

class App extends React.Component {

	constructor(props) {
		super()

		this.state = {
			userSignedIn: false,
			keepUserSignedIn: false,
			addedToCart: "",
			electronics: [],
			electronicsCopy: [],
			temporaryCart: "",
			temporaryCartTotal: "",
			memberSearchWord: null,
			memberCart: "",
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
			accountCreatedMessageModal: "",
			forgotPasswordEmail: null,
			forgotPasswordInvalidEmail: null,
			forgotPasswordInvalidAnswer: null,
			forgotPasswordEmail2: null,
			forgotPasswordNewPassword: null,
			forgotPasswordErrors: null,
			forgotPasswordRandomNumber: Math.floor(Math.random() * 3),
			memberSecurityQuestions: null,
			securityQuestionAnswer: null,

			}

		}



	closeForgotPasswordModal(e) {
		window.location.assign("/register")
		this.setState({
			forgotPasswordEmail: null,
			securityQuestionAnswer: null,
			memberSecurityQuestions: null,
		})
		
	}

	forgotPasswordEmailChange(event) {
		let memberEmail = event.target.value.trim()
		if(this.state.forgotPasswordInvalidEmail){
			this.setState({
				forgotPasswordInvalidEmail: null
			}, () => this.setState({
				forgotPasswordEmail: memberEmail,
			})
			)
		} else {
			if(memberEmail) {
				this.setState({
					forgotPasswordEmail: memberEmail,
				})
			}
		}
    }

	forgotPasswordContinueButtonClicked(rotateContentDivs){
		this.forgotPasswordCheckIfMemberExists(rotateContentDivs)
	}

	forgotPasswordCheckIfMemberExists(rotateContentDivs) {
		axios.post("http://localhost:3000/api/v1/check_if_member_exists",
				{ memberEmail: this.state.forgotPasswordEmail}
			)
		.then(()=> this.getSecurityQuestions(rotateContentDivs))
		.catch((error)=> { 
						this.setState({
							forgotPasswordInvalidEmail: true,
							forgotPasswordEmail: null
						})
					}
		)

	}

	getSecurityQuestions(rotateContentDivs) {
		axios.get(`http://localhost:3000/api/v1/security_questions`, {
			 params: { 
			 	forgotPasswordEmail: this.state.forgotPasswordEmail 
			 } 
			} )
		.then((resp) => this.setState({
							memberSecurityQuestions: resp.data.security_questions,
							forgotPasswordEmail2: this.state.forgotPasswordEmail, // saving the value of forgotPasswordEmail before setting it to null, so we can use the value when calling memberWantsToSubmitAnswer() method.
							forgotPasswordEmail: null // setting to null to re-render App.js Component, look at shouldComponentUpdate() method.
						})
		)
		.then(()=> rotateContentDivs())
	}

	memberInputtingSecurityQuestionAnswer(e) {
		let memberAnswer = e.target.value.trim()
		//we have to use an if statement to make sure the value of this.state.securityQuestionAnswer never turns false.
		//because when a user deletes all the letters from the input field, an empty string will be set as the value of securityQuestionAnswer, 
		//thus making 'this.state.securityQuestionAnswer = false ',which in return  will cause shouldComponentUpdate to return false and re-render
		//the app.js component.
		if(this.state.forgotPasswordInvalidAnswer) {
			this.setState({
				forgotPasswordInvalidAnswer: null,//with this set to null, ForgotPassword.js will not display the error div.
				securityQuestionAnswer: null // setting to null to re-render App.js, in order to remove the error message from the screen, check shouldComponentUpdate() method.

			}, () => {
				if(memberAnswer) {
					this.setState({
						securityQuestionAnswer: memberAnswer
			   		})
				}
			}
			)
		} else {
			if(memberAnswer) {
				this.setState({
					securityQuestionAnswer: memberAnswer

				})
			}
		}
	}

	memberWantsToSubmitAnswer(e, securityQuestion, rotateContentDivs) {
		
		axios.post(`http://localhost:3000/api/v1/verify_security_question_answer/${securityQuestion.id}`, 
			{ memberAnswer: this.state.securityQuestionAnswer,
			  memberEmail: this.state.forgotPasswordEmail2 }
			)
		.then((resp)=> {
						this.setState({
							securityQuestionAnswer: null
						})
		})
		.then(()=> rotateContentDivs())
		.catch((error)=> {
						this.setState({
							forgotPasswordInvalidAnswer: true,
							securityQuestionAnswer: null
						})
						
		})
	}

	memberEnteringNewPassword(e) {
		let newPassword = e.target.value.trim()
		this.setState({
			forgotPasswordNewPassword: newPassword
		})
	}

	memberWantsToSubmitNewPassword() {
		axios.put("http://localhost:3000/api/v1/update_password_with_forgot_password", 
				{ newPassword: this.state.forgotPasswordNewPassword,
				  memberEmail: this.state.forgotPasswordEmail2 }
			)
		.then((resp)=> this.props.history.push("/register"))
		.catch((error)=> {
			console.log(error.response.data.error)
			this.setState({
				forgotPasswordErrors: error.response.data.error
			})
		})
		
	}

	forgotPasswordCloseErrorMessage() {
		this.setState({
			forgotPasswordErrors: null
		})
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
		let newMemberAddresses = this.state.memberAddresses
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
		let memberAddresses = this.state.memberAddresses
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
			let modifiedMemberAddresses = resp.data.memberAddresses
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
			let modifiedMemberAddresses = resp.data.memberAddresses
			modifiedMemberAddresses.forEach((address) => {
				address.userWantsToDelete = false
			})
			this.setState({
				memberAddresses: modifiedMemberAddresses
			})
		})
	}

	imageClicked(event) {
		let imageClicked = event.target
		let modal = this.refs.appMyModal
		let modalImage = this.refs.img01
		modal.style.display = "block"
		modalImage.src = imageClicked.src 
		
	}

	myModalSpanClicked() {
		this.refs.appMyModal.style.display = "none"	
	}

	addToCartClicked(product, productQuantity, divForUpdatedItem, updateButtonforItem) {
		// let updatedElectronics = JSON.parse(JSON.stringify(this.state.electronics))
		// updatedElectronics.forEach(function(electronicProduct) {
		// 	if(electronicProduct.id === product.id) {
		// 		electronicProduct.style = {opacity: 0.5}
		// 	}
		// })
		if(this.state.userSignedIn) {
			if(this.state.memberCart.length === 0) {
		  		let token = localStorage.getItem("token") || sessionStorage.getItem("token")
		  		axios.post('http://localhost:3000/api/v1/order_details', {
							product_id: product.id,
							token: token,
							quantity: productQuantity				
				}).then((resp) => { 
					this.setState({
									memberCart: resp.data.currentOrderDetails,
									memberOrder: resp.data.order,
									addedToCart: true,
									// electronics: updatedElectronics
					}) 
				})
				.then(() => {
					if(this.state.temporaryCart.length) {
						console.log("AddToCart-TempCart", this.state.temporaryCart)
						let newTemporaryCart = this.state.temporaryCart
						newTemporaryCart.shift()
						this.setState({
							temporaryCart: newTemporaryCart
						}, () => { 
							if(this.state.temporaryCart.length) {
								let singleProductObject = this.state.temporaryCart[0]
								let singleProductKey = Object.keys(singleProductObject)[0]
								this.addToCartClicked(singleProductObject[singleProductKey], parseInt(singleProductKey))
							} else {
								this.setState({
									temporaryCart: ""
								})
							}
						})
						
					}
				})
				.catch((error)=> console.log(error))
			
			} else {
				let token = localStorage.getItem("token") || sessionStorage.getItem("token")

		  		axios.put("http://localhost:3000/api/v1/order_details/500", {
				 		product_id: product.id,
						quantity: productQuantity,
						token: token  
				})
				.then((resp)=> this.setState({
					memberCart: resp.data.currentOrderDetails,
					memberOrder: resp.data.order,
					addedToCart: true,
					// electronics: updatedElectronics
				}) 
				)
				.then(() => {
					if(this.state.temporaryCart.length) {
						console.log("AddToCart-TempCart", this.state.temporaryCart)
						let newTemporaryCart = this.state.temporaryCart
						newTemporaryCart.shift()
						this.setState({
							temporaryCart: newTemporaryCart
						}, () => { 
							if(this.state.temporaryCart.length) {
								let singleProductObject = this.state.temporaryCart[0]
								let singleProductKey = Object.keys(singleProductObject)[0]
								this.addToCartClicked(singleProductObject[singleProductKey], parseInt(singleProductKey))
							} else {
								this.setState({
									temporaryCart: ""
								})
							}
						})
						
					}
				})
				.then(() => { 
					if(divForUpdatedItem) {
						let currentClassName = divForUpdatedItem.className
						let newClassName = "item-in-cart-updated-successfully"
						divForUpdatedItem.className = "item-in-cart-updated-successfully"
						updateButtonforItem.className = "hide-update-cart-button"
						setTimeout(function() { divForUpdatedItem.className = currentClassName }, 1000)

					}
				})
				.catch((error) => console.log(error))
			} 
	    } else {
	    	
	    	if(this.state.temporaryCart.length) {
	    		let temporaryCart = JSON.parse(localStorage.getItem("temporaryCart"))
	    		let isProductAlreadyInCart = false;    		
	    		temporaryCart.forEach((itemObject,index) => {
	    			for(let key in itemObject) {
	    				if(itemObject[key].id === product.id) {
	    					isProductAlreadyInCart = true
	    					let productQuatityModified = {[productQuantity]: product}
	    					temporaryCart.splice(index, 1, productQuatityModified)
	    				} 
	    			}
	    		})
	    		if(!isProductAlreadyInCart) {
	    			temporaryCart.push({[productQuantity]: product})
	    		}
	    		localStorage.setItem("temporaryCart", JSON.stringify(temporaryCart))
	    		this.setState({
	    			temporaryCart: temporaryCart,
	    			// electronics: updatedElectronics
	    		}, () => {
	    			this.temporaryCartTotal()
	    			console.log(copyOfAllElectronics)
	    			this.checkIfElectronicItemIsAlreadyInCart()
	    		})



	    	} else { 	
	    		let newTemporaryCart = []
	    		newTemporaryCart.push({[productQuantity]: product})
	    		localStorage.setItem("temporaryCart", JSON.stringify(newTemporaryCart))
	    		this.setState({
	    			temporaryCart: newTemporaryCart,
	    			// electronics: updatedElectronics
	    		}, () => {
	    			console.log(copyOfAllElectronics)
	    			this.temporaryCartTotal()
	    			this.checkIfElectronicItemIsAlreadyInCart()
	    		}
	    		)
	    	}
		}
	}

	removeFromCartClicked(product) {
		let useThisToken = localStorage.getItem("token") || sessionStorage.getItem("token")

		let productToRemove = parseInt(Object.values(product)[0].id)
		if(this.state.userSignedIn) {
			axios.delete(`http://localhost:3000/api/v1/order_details/${productToRemove}`,{
				headers: { 'token': useThisToken }
			})
			.then((resp)=> this.setState({
							memberCart: resp.data.currentOrderDetails,
							memberOrder: resp.data.order
						},() => {
							this.resetElectronicsListAfterRemoveFromCartClicked(product)
						})
			
			).catch((error)=> console.log(error))
		} else {
			let temporaryCart = JSON.parse(localStorage.getItem("temporaryCart"))
			
			temporaryCart.forEach((itemObject,index) => {
				for(let key in itemObject) {
					
					if(itemObject[key].id === Object.values(product)[0].id) {
						temporaryCart.splice(index, 1)
						break;
					}
				}
			})
			localStorage.setItem("temporaryCart", JSON.stringify(temporaryCart))
			this.setState({
				temporaryCart: temporaryCart
			}, () => {
				this.temporaryCartTotal()
				this.resetElectronicsListAfterRemoveFromCartClicked(product)
			})
		}
	}

	temporaryCartTotal() {
		if(this.state.temporaryCart.length) {
			let allTemporaryCartItemsTotalArray = []
			this.state.temporaryCart.forEach((itemObject) => {
				for(let key in itemObject) {
					let itemQuantity = parseInt(key)
					let itemTotal = itemQuantity * (itemObject[key].sale_price * 100)

					allTemporaryCartItemsTotalArray.push(itemTotal)
				}
			})
			let temporaryCartSubTotal = (allTemporaryCartItemsTotalArray.reduce((acc, total) => {
				return acc + total
			}) / 100).toFixed(2)
			let taxOnTemporaryCart = parseFloat(((8.75 / 100) * temporaryCartSubTotal).toFixed(2)) //we have to use parseFloat here because .toFixed() converts a number to a string and also becuase we want a decimal value.
			let temporaryCartTotal = parseFloat(((((temporaryCartSubTotal * 100) + (taxOnTemporaryCart * 100)) / 100) + 999 / 100).toFixed(2))
			this.setState({
				temporaryCartTotal: {subTotal: temporaryCartSubTotal, tax: taxOnTemporaryCart, total: temporaryCartTotal, shipping: 9.99}
			})
		}
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
		let signinEmailFieldValue = e.target.value.trim()	
		 	this.setState({
				signinEmail: signinEmailFieldValue,
			},()=> console.log(this.state.signinEmail))
	}

	signinOnPasswordChange(e, signinPasswordField) {
		let signinPasswordFieldValue = e.target.value.trim()
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
			.then(()=> {
				let useThisToken = localStorage.getItem("token") || sessionStorage.getItem("token")
				if(useThisToken) {
					axios.get("http://localhost:3000/api/v1/carts/show", {
						headers: { token: useThisToken }
					})
					.then((resp) => {
						let modifiedMemberAddresses = resp.data.addresses
						modifiedMemberAddresses.forEach((address) => {
							address.userWantsToDelete = false
						})
						this.setState({
							signinEmail: "",
		      				signInPasswordError: "",
							userSignedIn: true,
							memberCart: resp.data.currentOrderDetails,
							memberOrder: resp.data.order,
							memberInfo: resp.data.memberInfo,
							memberAddresses: modifiedMemberAddresses
						})
					})
					.catch((error)=> console.log(error.response))
					.then(()=> this.checkIfElectronicItemIsAlreadyInCart())
					.then(()=> {
						if(this.state.temporaryCart.length) {					
							let singleProductObject = this.state.temporaryCart[0]
							let singleProductKey = Object.keys(singleProductObject)[0]
							this.addToCartClicked(singleProductObject[singleProductKey], parseInt(singleProductKey))
							localStorage.removeItem("temporaryCart")
					    }
				    })
				}
	
			})
			.then(()=> this.userSignedInMessageModal())
		    .then((resp)=> this.props.history.push("/main"))
		    .catch((error)=> { 
		  		this.setState({
		  			signInAjaxErrorMessage: error.response.data.error
		  		}, () => signInErrorDiv.className = "show-signin-error-div" )} 
		  	  )
	}

				
				
			
			// else {
			// 	this.setState({
			// 		userSignedIn: false,
			// 		memberCart: "",
			// 		memberOrder: {},
			// 		memberInfo: "",
			// 		memberAddresses: []
			// 	})
			// }

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

	electronicsClicked(e) {	
		// this.setState({
		// 	electronics: copyOfAllElectronics
		// },() => this.props.history.push("/electronics"))	
		this.props.history.push("/electronics")	
	}

	memberEnteringDataInSearchField(e) {
		this.setState({
			memberSearchWord: e.target.value.trim().toLowerCase()
		},()=> console.log(this.state.memberSearchWord))
	} 

	memberWantsToSubmitSearch() {
		let memberSearchResults = [];
			let that = this
			copyOfAllElectronics.forEach(function(product) {
				if(product.name.toLowerCase().includes(that.state.memberSearchWord)) {
					memberSearchResults.push(product)
				}
			})
			this.setState({
				electronics: memberSearchResults
			}, () => this.props.history.push("/electronics"))
	}

	getElectronicsFromServer() {
		axios.get("http://localhost:3000/api/v1/products")
		.then((resp)=> {
			this.setState({
				electronicsCopy: resp.data,
				electronics: resp.data
			},()=> this.checkIfElectronicItemIsAlreadyInCart())
		})
	}

	resetElectronicsListAfterRemoveFromCartClicked(product) {
		// let memberCart = this.state.memberCart || this.state.temporaryCart
		let z = JSON.parse(JSON.stringify(this.state.electronics))

		for (let i = 0; i < z.length; i++) {
			if(z[i].id === Object.values(product)[0].id) {
				
				delete z[i].style
				console.log(z[i])
				break;
			}
		}
		this.setState({
			electronics: z
		})
	}
							
	checkIfElectronicItemIsAlreadyInCart() {
		console.log(this.state.electronics)
		console.log(this.state.electronicsCopy)
		let memberCart = this.state.memberCart || this.state.temporaryCart
		let a = this.state.electronicsCopy.map(function(productObject) {
					let instanceOfProductObject = JSON.parse(JSON.stringify(productObject))
					memberCart.forEach(function(prodObj) {
						for(let key in prodObj) {
							if(instanceOfProductObject.id === prodObj[key].id ) {
								instanceOfProductObject.style = {opacity: "0.5"}
								console.log("MATCH",instanceOfProductObject)
								break;
							}
							// else {
							// 	console.log("oiyeeeee", instanceOfProductObject)
							// 	delete instanceOfProductObject.style
							// }
						}
				})
			return instanceOfProductObject
		})

		this.setState({
			electronics: a
		})
		
			// let electronicsToSave = this.state.electronics
			// console.log(this.state.electronicsToSave)
			// let memberCart = this.state.memberCart || this.state.temporaryCart
			// // if(memberCart.length >= 1 ) {

			// 	electronicsToSave.forEach(function(item,i) {					
			// 		memberCart.forEach(function(prodObj) {
			// 			for(let key in prodObj) {
			// 				if(prodObj[key].id === item.id) {
			// 					item.style = {opacity: "0.5"}
			// 					console.log("MATCH", item)
			// 				} 
			// 				else {
							
			// 						console.log("NOMATCH",item.style)
			// 						delete item.style

								
			// 				}
			// 			}
			// 		})
			// 	}.bind(this))
			// 	console.log(electronicsToSave)
			// 	this.setState({
			// 		electronics: electronicsToSave
			// 	})
			// // } else {
			// // 	this.setState({
			// // 		electronics: respData
			// // 	},()=> { console.log(this.state.electronics); copyOfAllElectronics = respData})
			// // }		
	}

	componentDidMount() {
		console.log("APP DID MOUNT", this.state)
		// let useThisToken = localStorage.getItem("token") || sessionStorage.getItem("token")
		let useThisToken = localStorage.getItem("token")//sessionsStorage will clear out once the window is closed,so when component is mounted there is no sessionStorage, that is why we are only checking for localStorage.
	
		if(useThisToken) {
			axios.get("http://localhost:3000/api/v1/carts/show", {
				headers: { token: useThisToken }
			}).then((resp)=>  { 
					let modifiedMemberAddresses = resp.data.addresses
					modifiedMemberAddresses.forEach((address) => {
						address.userWantsToDelete = false
					})
					this.setState({
						memberCart: resp.data.currentOrderDetails,
						memberOrder: resp.data.order,
						userSignedIn: true,
						memberInfo: resp.data.memberInfo,
						memberAddresses: modifiedMemberAddresses
			    	}, ()=> this.getElectronicsFromServer() )
		   	})
			.catch((error)=> console.log(error.response))

		} else {
			this.setState({
				userSignedIn: false
			},()=> this.getElectronicsFromServer() )
		}
		if (localStorage.temporaryCart){
			let getTemporaryCart = JSON.parse(localStorage.temporaryCart)
			this.setState({
				temporaryCart: getTemporaryCart
			}, () => this.temporaryCartTotal())
		}
		setTimeout(()=> this.setState({
			showLoadingSymbol: "hide-loading-symbol"
		}), 1000)
	}

	shouldComponentUpdate(nextProp, nextState){
		console.log("NEXTSTATE", nextState)
		if(nextState.securityQuestionAnswer || nextState.forgotPasswordEmail) {
			return false
		} else {
			return true
		}
		
	}

	componentDidUpdate(prevProps, prevState) {
		console.log("APP DID UPDATE", this.state)

	}

	componentWillReceiveProps(nextProps) {
		// This life-cycle method is skppied on "this.setState" and that is the reason why the loading symbol is not seen when updating the sign-in input fields
		console.log("APPWillReceiveProps", nextProps)
		if(nextProps.location.pathname !== "/forgotpassword") {
			this.setState({
				showLoadingSymbol: "show-loading-symbol"
			})
			setTimeout(()=> this.setState({
				showLoadingSymbol: "hide-loading-symbol"
			}), 1000)
		}
	}

	render () {
	
		return (
			<div >
			
			  	<div id={this.state.showMainPage}>

			  		<div id="navBar">
						<NavBar electronicsClicked={this.electronicsClicked.bind(this)} userSignedIn={this.state.userSignedIn} memberEnteringDataInSearchField={this.memberEnteringDataInSearchField.bind(this)} memberWantsToSubmitSearch={this.memberWantsToSubmitSearch.bind(this)} memberCart={this.state.memberCart} temporaryCart={this.state.temporaryCart} memberInfo={this.state.memberInfo} userLoggedOutMessageModal={this.userLoggedOutMessageModal.bind(this)} navBarSignInClicked={this.navBarSignInClicked.bind(this)} navBarSignOutClicked={this.navBarSignOutClicked.bind(this)} />
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
	  			  		<Route exact path="/cart" render={(props)=> <Cart {...props} userSignedIn={this.state.userSignedIn} navBarSignInClicked={this.navBarSignInClicked.bind(this)} temporaryCart={this.state.temporaryCart} temporaryCartTotal={this.state.temporaryCartTotal} memberCart={this.state.memberCart} memberOrder={this.state.memberOrder} addToCartClicked={this.addToCartClicked.bind(this)} removeFromCartClicked={this.removeFromCartClicked.bind(this)} /> } />
			  	  		<Route exact path="/checkout" component={Checkout} />
			  	  		<Route exact path="/myaccount" render={(props)=> <MyAccount {...props} userSignedIn={this.state.userSignedIn} memberInfo={this.state.memberInfo} updateMemberInfo={this.updateMemberInfo.bind(this)} navBarSignInClicked={this.navBarSignInClicked.bind(this)} memberAddresses={this.state.memberAddresses} updateMemberAddresses={this.updateMemberAddresses.bind(this)} userWantsToDeleteAddress={this.userWantsToDeleteAddress.bind(this)} doNotDeleteMemberAddressClicked={this.doNotDeleteMemberAddressClicked.bind(this)} permanentlyDeleteMemberAddress={this.permanentlyDeleteMemberAddress.bind(this)} setDefaultAddressClicked={this.setDefaultAddressClicked.bind(this)} /> }/>			  	  
			  			<Route exact path="/forgotpassword" render={(props)=> <ForgotPassword {...props} forgotPasswordRandomNumber={this.state.forgotPasswordRandomNumber} memberSecurityQuestions={this.state.memberSecurityQuestions} forgotPasswordContinueButtonClicked={this.forgotPasswordContinueButtonClicked.bind(this)} forgotPasswordCheckIfMemberExists={this.forgotPasswordCheckIfMemberExists.bind(this)} forgotPasswordEmailChange={this.forgotPasswordEmailChange.bind(this)} memberInputtingSecurityQuestionAnswer={this.memberInputtingSecurityQuestionAnswer.bind(this)} memberWantsToSubmitAnswer={this.memberWantsToSubmitAnswer.bind(this)} memberEnteringNewPassword={this.memberEnteringNewPassword.bind(this)} memberWantsToSubmitNewPassword={this.memberWantsToSubmitNewPassword.bind(this)} forgotPasswordInvalidEmail={this.state.forgotPasswordInvalidEmail} forgotPasswordInvalidAnswer={this.state.forgotPasswordInvalidAnswer} forgotPasswordErrors={this.state.forgotPasswordErrors} forgotPasswordCloseErrorMessage={this.forgotPasswordCloseErrorMessage.bind(this)} closeForgotPasswordModal={this.closeForgotPasswordModal.bind(this)} /> } />
			  		</Switch>
				</div>
			</div>

			)
	}
}

export default withRouter(App)