import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
// import registerServiceWorker from './registerServiceWorker';

// import Welcome from './Welcome.js';
// import Register from "./Register.js";
import App from "./App.js";
// import Electronics from "./Electronics.js";


ReactDOM.render(
	<BrowserRouter>
	  <App />
	</BrowserRouter>, 
	document.getElementById('root'));

