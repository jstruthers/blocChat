import React from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { getCurrentUser } from '../actions/actions'
import { Meteor } from 'meteor/meteor'

const Header = ({ currentUser, dispatch }) => {
  
  function logOut(event) {
    Meteor.logout();
    dispatch(getCurrentUser());
  }
  
  return (
    <header id="header">
      <h1><IndexLink to="/" activeClassName="active">blocChat</IndexLink></h1>
      <button type="button"><Link to="/LogIn">Log In</Link></button>
      { currentUser
        ? (<div>
             <h3>{ currentUser.username }</h3>
             <button type="button" onClick={ logOut }>Log Out</button>
           </div>
          )
        : <h3>Please Sign In</h3>
      }
    </header>
  )
}

export default connect()(Header);
