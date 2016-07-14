import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = "Enter User Name"
  } else if (!values.password) {
    errors.password = "Enter password"
  }
  return errors
}

class LogInForm extends Component {
  
  render() {
    
    const {
      fields: { username, email, password },
      handleSubmit,
      submitting
      } = this.props
    
    return (
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Log In</label>
          <input type="text" placeholder="username" {...username} />
          {username.touched && username.error && <div>{username.error}</div>}
          <input type="text" placeholder="password" {...password} />
          {password.touched && password.error && <div>{password.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    )
  }
}

LogInForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'logInForm',
  fields: [ 'username', 'password' ],
  validate
})(LogInForm);
