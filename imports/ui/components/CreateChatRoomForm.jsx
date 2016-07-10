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

class CreateChatRoomForm extends Component {
  render() {
    const {
      fields: { text },
      handleSubmit,
      submitting
      } = this.props

    return (<form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>New Chat Room Name: </label>
          <input type="text" placeholder="name..." {...text}/>
          {text.touched && text.error && <div>{text.error}</div>}
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
  fields,
  validate
})(CreateChatRoomForm)
