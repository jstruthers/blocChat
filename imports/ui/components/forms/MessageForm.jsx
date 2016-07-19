import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

class MessageForm extends Component {
  
  render() {
    const {
      handleSubmit,
      submitting,
      fields: { message }
      } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="type here..." {...message}/>
        </div>
        <button type="submit" disabled={submitting || !message.value}>
          {submitting ? <i/> : <i/>} Post
        </button>
      </form>
    )
  }
}

MessageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired
}

export default reduxForm({
  form: 'messageForm',
  fields: ['message']
})(MessageForm);
