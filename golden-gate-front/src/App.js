import React from "react";
import NavBar from "./NavBar";
import Main from "./Main.js";
// import Welcome from './Welcome.js';
// import Register from "./Register.js";
// import Electronics from "./Electronics.js";
// import "./csshake/dist/csshake-little.css"

export default class App extends React.Component {

	constructor(props) {
		super()
		
	}	

	render () {
		console.log("APP:")
		return (
			<div>
			  <Main />
			</div>

			); 
	}
}