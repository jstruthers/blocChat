import React from 'react'
import { Link, browserHistory } from 'react-router'
import { getCurrentUser } from '../actions/actions'
import { Meteor } from 'meteor/meteor'

export default ({ dispatch, currentUser }) => {

  function logOut(event) {
    Meteor.logout();
    browserHistory.push('/userAccounts');
  }

  return (
    <header id="header">
      { currentUser
          ? (<div className="user-profile-header">
               <h3>{ currentUser.username }</h3>
               <button type="button" onClick={ logOut } >
                 Log Out
               </button>
             </div>)
          : ""
      }

      <Link to="/home" activeClassName="active">
        <img className="logo" src="/images/logo.png" alt="blocChat" />
      </Link>
    </header>
  )
}
