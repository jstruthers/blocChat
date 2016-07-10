import React from 'react'
import { Link } from 'react-router'

export default ({ user, icon, name, otherUsers }) => {
  return (
    <div>
      <span>{ icon }</span><h3>{ name }</h3>
    </div>
    <div>
      { otherUsers.map( (user, i) => <p key={ i }>{ otherUser.name }</p>) }
    </div>
    <ChatBalloons />
    <div>
      { user.icon }
      { user.name }
      <SomeTextCommentForm />
    </div>
  )
}
