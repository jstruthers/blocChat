import React from 'react'
import { Link } from 'react-router'

export default () => {
  return (
    <header id="header">
      <h1>blocChat</h1>
      <button type="button"><Link to="/LogIn">Log In</Link></button>
    </header>
  )
}
