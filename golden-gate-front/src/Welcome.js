import React, { Component } from 'react';
import "./Welcome.css"
import {Link, Route, Switch} from "react-router-dom"
import App from "./App.js"
import Register from "./Register.js"


export default class Welcome extends Component {

  constructor() {
    super()
    this.state = {
      sentenceClassName: "fly-in-text hidden",
      buttonClassName: "center",
    }
  }

  homePageButtonClicked() {

    this.props.history.push("/main")

  }

  componentDidMount() {
    // setTimeout( () => this.setState({ buttonClassName: "center"}), 7000)
    setTimeout( () => this.setState({ sentenceClassName: "fly-in-text" }), 500)
  }


  // buttonClicked() {
  //   console.log("XXX")
  //   this.setState({
  //        visibility: false
  //   }, () => console.log("setSTate", this.state.visibility))
  // }

  render() {
    
        return (
        <div className="welcomePage" >
          <ul className="neon" >
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul className={this.state.sentenceClassName} >
          <li>W</li>
          <li>E</li>
          <li>L</li>
          <li>C</li>
          <li>O</li>
          <li>M</li>
          <li>E</li>
        </ul>
        <div className={this.state.buttonClassName}>
          <a href="/main"><button className="homePageButton" onClick={this.homePageButtonClicked.bind(this)}>CONTINUE</button></a>
        </div>
        
     </div> 
    );
    
  }
}


