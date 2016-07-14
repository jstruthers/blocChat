import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { connect } from 'react-redux'
import { toggleModal, getCurrentUser } from '../../actions/actions'
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
      logInForm: false
    }
  }
  
  toggleForm(form) {
    let obj = {},
        other = Object.keys(this.state).filter(formKey => formKey !== form)[0];
    obj[other] = false;
    obj[form] = !this.state[form];
    this.setState(obj);
  }
  
  render() {
    
    const { serverError, newUserForm, logInForm, logInHandler, createUserHandler } = this.props;

    return (
      <div className="user-accounts">
        <Modal hasButton={false}>
          
          <button type="button"
                  className="modal-btn"
                  onClick={ this.toggleForm.bind(this, "logInForm") }>
            Log In
          </button>
          
          { this.state.logInForm
              ? <LogInForm onSubmit={logInHandler.bind(null, logInForm)} />
              : ""}

         <button type="button"
                  className="modal-btn"
                  onClick={ this.toggleForm.bind(this, "newUserForm") }>
            Create New User
          </button>
          
          { this.state.newUserForm
              ? <CreateNewUserForm onSubmit={createUserHandler.bind(null, newUserForm)} />
              : ""}

        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    serverError: state.serverError,
    newUserForm: state.form.createNewUserForm,
    logInForm: state.form.logInForm
  }
}

function mapDispatchToProps(dispatch){
  return {
    createUserHandler: (form) => {
      Accounts.createUser({
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
        },
        (error) => {if (error) {console.log(error)}}
      );
      dispatch(getCurrentUser());
      dispatch(toggleModal(false));
      browserHistory.push('/home');
    },
    logInHandler: (form) => {
      Meteor.loginWithPassword(
        form.username.value,
        form.password.value,
        (error) => {if (error) {console.log(error)}}
      );
      dispatch(getCurrentUser());
      dispatch(toggleModal(false));
      browserHistory.push('/home');
    },
    getCurrentUser: () => {
      dispatch(getCurrentUser())
    },
    toggleModal: (opt) => {
      dispatch(toggleModal(opt))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccounts);
