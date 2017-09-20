
import React from 'react'
import NavBar from './NavBar'
import FontAwesome from "react-fontawesome"
import "./Main.css";

export  default class Electronics extends React.Component {

	constructor() {
		super()
	}

    increaseQuantityClicked(i,e) {	
    	var quantityInputField = `quantityInputField${i}`
    	var oldValue = parseInt(this.refs[quantityInputField].value)
    	var newValue = oldValue + 1
    	if(newValue > 0) {
    		this.refs[quantityInputField].value = newValue
    	} else {
    		this.refs[quantityInputField].value = 1
        }
    }

    decreaseQuantityClicked(i, event) {
    	var quantityInputField = `quantityInputField${i}`
    	var oldValue = parseInt(this.refs[quantityInputField].value)
    	var newValue = oldValue - 1
    	if(newValue > 0) {
    		this.refs[quantityInputField].value = newValue
    	} else {
    		this.refs[quantityInputField].value = 1
        }
    }

    addToCartClicked(item, i) {
    	var quantityInputField = `quantityInputField${i}`
    	var productQuantity = parseInt(this.refs[quantityInputField].value)
    	var productDiv = this.refs[`item${i}`]
    	productDiv.id = "product-added-to-cart"
    	setTimeout(function() { productDiv.id = `item${i}` }, 1000)
    	this.props.addToCartClicked(item, productQuantity)
    }

	render () {
		console.log("ELECTRONICS", this.props.modifiedElectronics)
		return (
			<div id="electronicsData">
				 {this.props.electronics.map((item, i) => 
				 	<div key={i} id={`item${i}`} ref={`item${i}`} style={item.style} >
				  	  <ul>
				  		<div id="quantityFields" ref={`quantityField${i}`} style={{display: "flex", flexWrap: "wrap", width: "220px"}}>
				  				<div id="increaseQuantity" onClick={this.increaseQuantityClicked.bind(this, i)} style={{ background: "green", width: "35px", height: "20px", textAlign: "center"}}>
				  	  				<FontAwesome id={`increaseQuantity${i}`} className="itemPlus" name="plus"  size="lg" style={{ left: "2%", color: "red" }}/>
			 					</div>
			 					<div id="quantityNumber" style={{ background: "blue", width: "35px", height: "20px"}}>
			 						<input type="text" ref={`quantityInputField${i}`} defaultValue="1" style={{height: "20px", width: "35px", border: "none", outline: "none", fontSize: "14px", textAlign: "center"}} />
			 					</div>
			 					<div id="decreaseQuantity" onClick={this.decreaseQuantityClicked.bind(this, i)} style={{background: "red", textAlign: "center", width: "35px", height: "20px"}}>
			 						<FontAwesome className="itemPlus" name="minus"  size="lg" style={{ color: "white" }} />
			 					</div>
			 					<div id="appAddToCartButton" style={{ width: "100px", height: "20px"}}>
				  	  		    	<button onClick={this.addToCartClicked.bind(this, item, i)} style={{marginLeft: "5px", textAlign: "center", height: "21px", background: "black", color: "white"}} >Add To Cart</button>
				  	  			</div>
				  	  	</div>	    
				  	  	
				  	  	<li><img src={item.medium_image} id="appMyImg" onClick={(event)=> this.props.imageClicked(event) } /></li>
					  	<h4 id="appImageEnlarge">Click to Enlarge</h4>
				  	  	<li id="name" >{item.name}</li>
				  	  	<li id="brand" >{item.brand_name}</li>
				  	  	<li id="msrp" >MSRP: ${item.msrp}</li>
				  	  	<li id="salePrice" >Sale Price: ${item.sale_price}</li>
				  	  </ul> 
				  	</div>
				  	)
				  } 
				
			</div>
		)
	}

}
