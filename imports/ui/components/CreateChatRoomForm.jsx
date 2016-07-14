import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'This field is required'
  }
  return errors
}

class CreateChatRoomForm extends Component {
  
  render() {
    const {
      fields: { title },
      handleSubmit,
      submitting
      } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>New Chat Room Name: </label>
          <input type="text" placeholder="name..." {...title}/>
          {title.touched && title.error && <div>{title.error}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Create Chat Room
          </button>
        </div>
      </form>
    )
  }
}

CreateChatRoomForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'createChatRoomForm',
  fields: [ 'title' ],
  validate
})(CreateChatRoomForm)
