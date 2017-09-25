import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
// import registerServiceWorker from './registerServiceWorker';
import App from "./App.js";



ReactDOM.render(
	<BrowserRouter>
	  <App />
	</BrowserRouter>, 
	document.getElementById('root'));

