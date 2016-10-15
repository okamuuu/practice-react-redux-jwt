import { combineReducers } from 'redux'
import {
  SET_STATUS_MESSAGE, SET_ERROR_MESSAGE, CLEAR_MESSAGE,
  SET_HELLO, SET_PRIVATE_HELLO, SET_USER
} from './actions'

// XXX: status, error message をいろんな場所で同時に使用すると混在する
function messageState(state = {
    statusMessage: "",
    errorMessage: ""
  }, action) {
  switch (action.type) {
    case SET_STATUS_MESSAGE:
      return Object.assign({}, state, {
        statusMessage: action.payload
      })
    case SET_ERROR_MESSAGE:
      return Object.assign({}, state, {
        errorMessage: action.payload
      })
    case CLEAR_MESSAGE:
      return Object.assign({}, state, {
        statusMessage: "",
        errorMessage: ""
      })
    default:
      return state
  }
}

function helloState(state = {
    hello: '',
  }, action) {
  switch (action.type) {
    case SET_HELLO:
      return Object.assign({}, state, {
        hello: action.payload
      })
    default:
      return state
  }
}

function privateHelloState(state = {
    privateHello: '',
  }, action) {
  switch (action.type) {
    case SET_PRIVATE_HELLO:
      return Object.assign({}, state, {
        privateHello: action.payload
      })
    default:
      return state
  }
}

function userState(state = {
    userName: '',
    isAuthenticated: ''
  }, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        userName: action.payload.userName,
        isAuthenticated: action.payload.isAuthenticated,
      })
    default:
      return state
  }
}

const helloApp = combineReducers({
  messageState,
  userState,
  helloState,
  privateHelloState,
})

export default helloApp
