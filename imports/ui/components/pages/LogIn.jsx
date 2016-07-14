import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { connect } from 'react-redux'
import { toggleModal, getCurrentUser } from '../../actions/actions'
import { Meteor } from 'meteor/meteor'

import CreateNewUserForm from '../CreateNewUserForm';
import LogInForm from '../LogInForm'
import Modal from '../helpers/Modal'

class LogIn extends Component {
  
  render() {
    
    const { currentUser, serverError, newUserForm, logInForm, logInHandler, createUserHandler } = this.props;
    
    return (
      <div className="login">
        { currentUser ?
            <p>{currentUser.username}</p>
          : (<div>
               <LogInForm onSubmit={logInHandler.bind(null, logInForm)} />
               <Modal buttonText="Or Create and Account">
                 <CreateNewUserForm onSubmit={createUserHandler.bind(null, newUserForm)} />
               </Modal>
             </div>)
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    serverError: state.serverError,
    currentUser: state.ui.currentUser,
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
    },
    logInHandler: (form) => {
      Meteor.loginWithPassword(
        form.username.value,
        form.password.value,
        (error) => {if (error) {console.log(error)}}
      );
      dispatch(getCurrentUser());
    },
    toggleModal: (option) => {
      dispatch(toggleModal(option))
    },
    getCurrentUser: () => {
      dispatch(getCurrentUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
