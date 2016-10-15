export const SET_STATUS_MESSAGE = 'SET_STATUS_MESSAGE'
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export const SET_HELLO = 'SET_HELLO'
export const SET_PRIVATE_HELLO = 'SET_PRIVATE_HELLO'

export const SET_USER = 'SET_USER'

import axios from 'axios';
const BASE_URL = 'http://localhost:3000'

export function fetchHello() {
  // cording rule: https://github.com/acdlite/redux-actions
  return (dispatch) => {
    dispatch({type: CLEAR_MESSAGE})
    dispatch({type: SET_STATUS_MESSAGE, payload: 'start fetching hello'})
    return axios.get(`${BASE_URL}/api/hello`).then((response) => {
      dispatch({type: SET_HELLO, payload: response.data })
      dispatch({type: SET_STATUS_MESSAGE, payload: 'finish fetching hello'})
    }).catch((err) => {
      console.error(err.message)
      dispatch({type: CLEAR_MESSAGE})
      dispatch({type: SET_ERROR_MESSAGE, payload: 'fail fetching hello'})
    })
  };
}

export function fetchPrivateHello() {

  let token = localStorage.getItem('id_token') || null
  let config = {};
  if (token) {
    config = { headers: {'Authorization': `Bearer ${token}` }}
  }

  return (dispatch) => {

    dispatch({type: CLEAR_MESSAGE})
    dispatch({type: SET_STATUS_MESSAGE, payload: 'start fetching private hello'})
    return axios.get(`${BASE_URL}/api/private/hello`, config).then((response) => {
      dispatch({type: SET_PRIVATE_HELLO, payload: response.data })
      dispatch({type: SET_STATUS_MESSAGE, payload: 'finish fetching private hello'})
    }).catch((err) => {
      console.error(err.message)
      dispatch({type: CLEAR_MESSAGE})
      dispatch({type: SET_ERROR_MESSAGE, payload: 'fail fetching private hello'})
    })
  };
}

export function login() {
  return (dispatch) => {
    dispatch({type: CLEAR_MESSAGE})
    dispatch({type: SET_STATUS_MESSAGE, payload: 'start login'})
    return axios.post(`${BASE_URL}/api/sessions`).then((response) => {
      localStorage.setItem('id_token', response.data.id_token)
      // hard-cording
      dispatch({type: SET_USER, payload: { userName: 'Tarou', isAuthenticated: true }})
      dispatch({type: SET_STATUS_MESSAGE, payload: 'finish login'})
    }).catch((err) => {
      console.error(err.message)
      dispatch({type: CLEAR_MESSAGE})
      dispatch({type: SET_ERROR_MESSAGE, payload: 'fail login'})
    })
  };
}


