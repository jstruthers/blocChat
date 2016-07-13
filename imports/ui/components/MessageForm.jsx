import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const fields = [ 'text' ];

const validate = values => {
  const errors = {}
  if (!values.text) {
    errors.text = 'This field is required'
  }
  return errors
}

class MessageForm extends Component {
  
  render() {
    const {
      fields: { text },
      handleSubmit,
      submitting
      } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="type here..." {...text}/>
          {text.touched && text.error && <div>{text.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Post
          </button>
        </div>
      </form>
    )
  }
}

MessageForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'messageForm',
  fields,
  validate
})(MessageForm);
