import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchHello, login, fetchPrivateHello } from '../actions'
import Hello from '../components/Hello'

class App extends Component {
  render() {
    const { dispatch, helloState, privateHelloState, userState, messageState } = this.props
    return (
      <div className='container'>
        <button onClick={() => dispatch(login())} className="btn btn-primary">
          Login
        </button>
        <div>
          {messageState.statusMessage &&
            <p style={{color: "green"}}>{messageState.statusMessage}</p>
          }
          {messageState.errorMessage &&
            <p style={{color: "red"}}>{messageState.errorMessage}</p>
          }
        </div>
        <Hello
          onHelloClick={() => dispatch(fetchHello())}
          onPrivateHelloClick={() => dispatch(fetchPrivateHello())}
          isAuthenticated={userState.isAuthenticated}
          hello={helloState.hello}
          privateHello={privateHelloState.privateHello}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {

  const { helloState, privateHelloState, messageState, userState } = state

  // XXX: props にそのまま state を渡す
  return {
    helloState: helloState,
    privateHelloState: privateHelloState,
    messageState: messageState,
    userState: userState
  }
}

export default connect(mapStateToProps)(App)
