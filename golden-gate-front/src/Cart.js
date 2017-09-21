import React from "react"
import "./Cart.css"
import FontAwesome from "react-fontawesome"

var cartArrayItem = "" /* this is a check to add "s" in "item" if more than one items in cart*/
var selectedCart = []


export default class Cart extends React.Component {

	constructor(props) {
		super()
		this.state = {
			cartPageAskSignIn: "ask-to-sign-in-show",
			itemsInCartDiv: "items-in-cart-show",
			cartEmptyOrNot: "cart-empty-or-not-hide",
			divOrderSummary: "order-summary-show",
			showCartPage: "hide-cart-page",
			showLoadingSymbol: "hide-loading-symbol",
			inCartupdateQuantityButton: "hide-update-cart-button",
			updatedQuantity: {quantityInputFieldX: "x"},
		
		}
	}

	componentWillMount() {
		if(this.props.memberCart.length < 1 && this.props.temporaryCart.length < 1) {
			this.setState({
				itemsInCartDiv: "items-in-cart-hide",
				cartEmptyOrNot: "cart-empty-or-not-show",
				divOrderSummary: "order-summary-hide",
			})
		} else {
			this.setState({
				itemsInCartDiv: "items-in-cart-show",
				cartEmptyOrNot: "cart-empty-or-not-hide",
				divOrderSummary: "order-summary-show",
			})
		}
		if(this.props.userSignedIn) {
			this.setState({
				cartPageAskSignIn: "ask-to-sign-in-hide"
			})

		}
		if(this.props.memberCart.length < 2 && this.props.temporaryCart.length < 2) {
			cartArrayItem = "Item"

		} else {
			cartArrayItem = "Items"
		}
	}

	componentWillReceiveProps() {
		
	setTimeout(() => {
		if(this.props.memberCart.length < 1 && this.props.temporaryCart.length < 1) {
			this.setState({
				itemsInCartDiv: "items-in-cart-hide",
				cartEmptyOrNot: "cart-empty-or-not-show",
				divOrderSummary: "order-summary-hide",
			})
		} else {

			this.setState({
				itemsInCartDiv: "items-in-cart-show",
				cartEmptyOrNot: "cart-empty-or-not-hide",
				divOrderSummary: "order-summary-show",
			})
		}
		if(this.props.userSignedIn) {
			this.setState({
				cartPageAskSignIn: "ask-to-sign-in-hide"
			})

		}
		if(this.props.memberCart.length < 1 && this.props.temporaryCart.length < 1) {
			cartArrayItem = "Item"

		} else {
			cartArrayItem = "Items"
		}
	}, 1000)
	}

	componentDidMount() {
		setTimeout(()=> this.setState({
			showLoadingSymbol: "hide-loading-symbol",
			showCartPage: "show-cart-page"
		}), 1000)
	}

	 increaseQuantityClicked(i) {
    	
    	var quantityInputField = `quantityInputField${i}`
    	var oldValue = parseInt(this.refs[quantityInputField].value)
    	var newValue = oldValue + 1
    	if(newValue > 0) {
    		if(newValue != oldValue) {
        		this.setState({
    			updatedQuantity: { [quantityInputField]: newValue }
    			})
        	}
    		this.refs[`inCartupdateQuantityButton${i}`].className = "show-update-cart-button"
    	} else {
    		this.refs[quantityInputField].value = 1
        }
     
    }

    decreaseQuantityClicked(i) {
      
    	var quantityInputField = `quantityInputField${i}`
    	var oldValue = parseInt(this.refs[quantityInputField].value)
    	var newValue = oldValue - 1
    	if(newValue > 0) {
    		if(newValue != oldValue) {
        		this.setState({
    			updatedQuantity: { [quantityInputField]: newValue }
    			})
        	}
    		this.refs[`inCartupdateQuantityButton${i}`].className = "show-update-cart-button"
    	} else {
    		this.refs[quantityInputField].value = 1
        }
      
    }

    updateCartClicked(i, product) {
    	product = Object.values(product)[0]
    	var quantityInputField = `quantityInputField${i}`
    	var productQuantity = parseInt(this.refs[quantityInputField].value)
    	var divForItemToUpdate = this.refs[`productDetailDiv${i}`]
    	var updateButtonforItem = this.refs[`inCartupdateQuantityButton${i}`]
    	this.props.addToCartClicked(product, productQuantity, divForItemToUpdate, updateButtonforItem )
    }

    removeFromCartClicked(product) {
    	this.props.removeFromCartClicked(product)
    }

    checkoutButtonClicked() {
    	this.props.history.push("/checkout")
    }


	render() {
		console.log("CART RENDER:", this.props)
		var memberCart = this.props.memberCart
		var temporaryCart = this.props.temporaryCart

		return (
		<div>
			<div id={this.state.showCartPage}>
				<div id="cartPageLogoDiv">
			  		<div id="cartPageHeading" >
			    		<span><h4>SHOPPING BAG</h4></span>
			  		</div>
		
			  		<div id={this.state.cartPageAskSignIn}>
			  			Have an account? Sign in and save time.
			  		<span id="cartpageSigninButtonSpan"><button id="cartPageSignInButton">Sign In</button></span></div>
			  
			  		<div id={this.state.itemsInCartDiv}>
			  			{this.props.memberCart.length} {cartArrayItem}
			  		</div>

			  		<div id={this.state.cartEmptyOrNot} >
			  			YOUR CART IS EMPTY...
			  		</div>
			  	</div>
			  		

			  		{this.props.memberCart? this.props.memberCart.map( (product, i) => { 
			  			var productQuantity = Object.keys(product)[0]
			  			var productDetails = Object.values(product)[0]
			  			return (
			  				
			  					<div className="cart-product-flex-container" id={`productDetailDiv${i}`} ref={`productDetailDiv${i}`}>
			  						<div id="showProductImageDiv">
			  							<img src={productDetails.large_image}  />
			  						</div>
			  						<div id="showProductNameDiv">
			  							<p id={`productName${i}`}>
			  								{productDetails.name}
			  							</p>
			  						</div>
			  						<div id="showProductQuantityDiv">
			  							<p>Quantity</p>
			  						</div>
			  						{productDetails.model_number ? 
			  						<div id="showProductModelDiv">
			  							<p id={`productModel${i}`}>Model Number: { productDetails.model_number }</p>
			  						</div>
			  						: null }
			  						<div id="showProductSalePriceDiv">
			  							<p id={`productSalePrice${i}`}>
			  								${productDetails.sale_price}
			  							</p>
			  						</div> 
			  					

			  						<div id="inCartQuantityFields" ref={`quantityField${i}`} style={{top: "65%", left: "32%", display: "flex", flexWrap: "wrap", width: "220px"}}>

				  						<div id="inCartIncreaseQuantity" onClick={this.increaseQuantityClicked.bind(this, i)} style={{ background: "black", width: "35px", height: "20px", textAlign: "center"}}>
				  	  						<FontAwesome id="fontAwesomePlus" className="itemPlus" name="plus"  size="lg" style={{ lineHeight: "22.5px", color: "white" }}/>
			 							</div>
			 							<div id="inCartquantityNumber" style={{ width: "35px", height: "20px"}}>
			 								<input type="text" ref={`quantityInputField${i}`} value={ Object.keys(this.state.updatedQuantity)[0] === `quantityInputField${i}` ? this.state.updatedQuantity[`quantityInputField${i}`] : productQuantity } style={{height: "20px", width: "35px", border: "none", outline: "none", fontSize: "14px", fontWeight: "bold", textAlign: "center"}} />
			 							</div>
			 							<div id="inCartDecreaseQuantity"  onClick={this.decreaseQuantityClicked.bind(this, i)} style={{background: "red", textAlign: "center", width: "35px", height: "20px"}}>
			 								<FontAwesome className="itemPlus" name="minus"  size="lg" style={{ lineHeight: "22.5px", color: "white" }} />
			 							</div>
			 						
				  	  				</div>

				  	  				<div className={this.state.inCartupdateQuantityButton} ref={`inCartupdateQuantityButton${i}`} >
				  	  		    		<button onClick={this.updateCartClicked.bind(this, i, product)} style={{position: "absolute", top: "80%", lineHeight: "20px", marginLeft: "33.5%", height: "26px", width: "80px", background: "red", color: "black", fontWeight: "bold"}} >Update Cart</button>
				  	  				</div>

				  	  				<div className="cartRemoveItemDiv">
				  	  					<button onClick={()=> this.removeFromCartClicked(product)} >Remove</button>
				  	  				</div>

			  					</div>
			  				
			  				)

			  		 }): "NULL" }
			  		

			  	<div id={this.state.divOrderSummary} >
			  		<div id="orderSummaryH4">
			  			<h4 id="orderSummaryText" >ORDER SUMMARY</h4>
			  		</div>

			  		<div id="merchandiseDiv" >
			  			<div>Marchandise:<span>{this.props.memberOrder.subtotal}</span></div>
			  		</div>

			  		<div id="cartTaxDiv">
			  			<div>Tax:<span>{this.props.memberOrder.tax}</span></div>
			  		</div>

			  		<div id="estimatedShippingDiv">
			  			<div>Estimated Shipping:<span>{this.props.memberOrder.shipping}</span></div>	
			  		</div>

			  		<div id="cartSubtotalDiv">
			  			<div>SUB TOTAL:<span>{this.props.memberOrder.total}</span></div>
			  		</div>

			  		<div id="checkoutButtonDiv">
			  			<button onClick={this.checkoutButtonClicked.bind(this)} >PROCEED TO CHECKOUT</button>
			  		</div>

			  	</div>
			
			</div>
			<div id={this.state.showLoadingSymbol}>
			   <FontAwesome className="circle-o-notch" name="circle-o-notch" spin size="5x"
			 	style={{position: "absolute", left: "50%", top: "50%", color: "red", }}/>
			 	<h2 style={{position: "absolute", top: "60%", left: "49%", color: "blue"}}>Loading....</h2>
			</div>
		</div>

			)
	}
}