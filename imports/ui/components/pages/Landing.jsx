import React, { Component } from 'react'
import { connect } from 'react-redux';
import  { toggleModal, getCurrentUser } from '../../actions/actions';
import { browserHistory } from 'react-router'
import ReactDOM from 'react-dom';

class Landing extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(getCurrentUser());
  }
  
  componentDidMount() {
    this.props.currentUser
      ? browserHistory.push('/home')
      : browserHistory.push('/userAccounts')
  }
  
  render() {return <div></div>}
}

function mapStateToProps(state) {
  return {
    currentUser: state.ui.currentUser
  }
}

export default connect(mapStateToProps)(Landing)
