import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { browserHistory } from 'react-router'
import { setCurrentUser } from '../../actions/actions'

class Header extends Component {

  logOut(event) {
    Meteor.logout();
    Accounts.onLogout(this.props.setCurrentUser)
    browserHistory.push('/userAccounts');
  }
  
  render() {
    return (
      <header id="header">
        { this.props.currentUser
            ? (<div className="user-profile-header">
                 <h3>{ this.props.currentUser.username }</h3>
                 <button type="button" onClick={ this.logOut.bind(this) } >
                   Log Out
                 </button>
               </div>)
            : ""
        }

        <img className="logo" src="/images/logo.png" alt="blocChat" />
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.ui.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: () => {
      dispatch(setCurrentUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
