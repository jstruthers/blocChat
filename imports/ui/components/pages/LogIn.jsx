import React, { Component } from 'react'
import { IndexLink } from 'react-router'

class LogIn extends Component {
  
  render() {
    console.log(AccountsTemplates);
    return (
      <span><IndexLink to="/">Go Home</IndexLink></span>
    )
  }
}

export default LogIn
