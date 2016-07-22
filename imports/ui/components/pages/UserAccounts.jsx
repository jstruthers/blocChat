import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { connect } from 'react-redux'
import { toggleModal, displayError, clearForm, setCurrentUser } from '../../actions/actions'
import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'

import CreateNewUserForm from '../forms/CreateNewUserForm';
import LogInForm from '../forms/LogInForm'
import Modal from '../helpers/Modal'

class UserAccounts extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      newUserForm: false,
      logInForm: true,
      logInError: null,
      newUserError: null
    }
  }
  
  goToHome(dispatch, clearForm, toggleModal, setCurrentUser) {
    console.log('redirect')
    dispatch(toggleModal(false));
    let fields = {}
    fields.username = null;
    fields.password = null;
    dispatch(clearForm(fields));
    dispatch(setCurrentUser())
    browserHistory.push('/');
  }
  
  goToUserAccounts(dispatch, setCurrentUser) {
    dispatch(setCurrentUser())
  }
  
  toggleForm(form) {
    let obj = {},
        other = Object.keys(this.state).filter(formKey => formKey !== form)[0],
        error = other.slice(0, -4);
    obj[other] = false;
    console.log(error);
    obj[error + 'Error'] = null;
    obj[form] = !this.state[form];
    this.setState(obj);
  }
  
  render() {
    const { newUserForm, logInForm, logInHandler, createUserHandler } = this.props;

    return (
      <div className="user-accounts">
        <Modal hasButton={false}>
         
          <div className="row"
               style={{ justifyContent: "center", marginBottom: "10px" }}>
            <button type="button"
                    className="modal-btn"
                    onClick={ this.toggleForm.bind(this, "logInForm") }>
              Log In
            </button>

            { this.state.logInError
                ? <span className="error">{ this.state.logInError }</span>
                : ""}
          </div>
          
          { this.state.logInForm
              ? (<div className="form-group">
                   <LogInForm onSubmit={logInHandler.bind(null, logInForm, this)} />
                 </div>)
              : ""}
        
        <div className="row"
             style={{ justifyContent: "center", margin: "10px 0px" }}>
          <button type="button"
                  className="modal-btn"
                  onClick={ this.toggleForm.bind(this, "newUserForm") }>
            Create New User
          </button>

          { this.state.newUserError
              ? <span className="error">{ this.state.newUserError }</span>
              : ""}
        </div>

        { this.state.newUserForm
            ? (<div className="form-group">
               <CreateNewUserForm onSubmit={createUserHandler.bind(null, newUserForm, this)} />
               </div>)
            : ""}

        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    newUserForm: state.form.createNewUserForm,
    logInForm: state.form.logInForm
  }
}

function mapDispatchToProps(dispatch){
  return {
    createUserHandler: (form, userAccounts) => {
      Accounts.createUser({
        username: form.username.value,
        email: form.email ? form.email.value : "",
        password: form.password.value
        },
        (error) => {
          if (error) {
            userAccounts.setState({newUserError: `* ${error.reason}`});
          } else {
            userAccounts.goToHome(userAccounts)
          }
        }
      );
    },
    logInHandler: (form, userAccounts) => {
      Meteor.loginWithPassword(
        form.username.value,
        form.password.value,
        (error) => {
          if (error) {
            userAccounts.setState({logInError: `* ${error.reason}`});
          } else {
            Meteor.logoutOtherClients(
              userAccounts.goToUserAccounts.bind(null, dispatch, setCurrentUser)
            )
            userAccounts.goToHome(dispatch, clearForm, toggleModal, setCurrentUser)
          }
        }
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccounts);
