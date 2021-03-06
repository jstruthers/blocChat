import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = "* Enter User Name"
  } else if (!values.password) {
    errors.password = "* Enter password"
  }
  return errors
}

class CreateNewUserForm extends Component {
  
  render() {
    
    const {
      handleSubmit,
      submitting,
      fields: { username, email, password }
      } = this.props
    
    return (
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="user name..." {...username}/>
          {username.visited 
            && !username.active
            && username.error
            && <span className="error">{ username.error }</span>}
        </div>
        <div className="input-group">
          <input type="email" placeholder="email..." {...email}/>
        </div>
        <div className="input-group">
          <input type="password" placeholder="password..." {...password}/>
          {password.visited 
            && !password.active
            && password.error
            && <span className="error">{ password.error }</span>}
        </div>
        <button type="submit" disabled={submitting || !password.value || !username.value}>
          {submitting ? <i/> : <i/>} Submit
        </button>
      </form>
    )
  }
}

CreateNewUserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired
}

export default reduxForm({
  form: 'createNewUserForm',
  fields: ['username', 'email', 'password'],
  validate
})(CreateNewUserForm);
