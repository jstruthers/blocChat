import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = '* This field is required'
  }
  return errors
}

class CreateChatRoomForm extends Component {
  
  render() {
    const {
      handleSubmit,
      submitting,
      fields: { title }
      } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="title..." {...title}/>
          {title.visited 
            && !title.active
            && title.error
            && <span className="error">{ title.error }</span>}
        </div>
        <button type="submit" disabled={submitting || !title.value}>
          {submitting ? <i/> : <i/>} Create Chat Room
        </button>
      </form>
    )
  }
}

CreateChatRoomForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired
}

export default reduxForm({
  form: 'createChatRoomForm',
  fields: ['title'],
  validate
})(CreateChatRoomForm)
