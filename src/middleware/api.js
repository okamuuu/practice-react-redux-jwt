import fetch from 'isomorphic-fetch';
import { handleAction } from 'redux-actions';

const BASE_URL = 'http://localhost:3000/api/'

function callApi(endpoint, authenticated) {

  let token = localStorage.getItem('id_token') || null
  let config = {}

  if (authenticated) {
    if (!token) {
      throw "No token saved!"
    }
    config = { headers: {'Authorization': `Bearer ${token}` }}
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text().then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text)
      }

      return text
    })
    .catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated } = callAPI

  const [ requestType, successType, errorType ] = types

  next({
    authenticated,
    type: requestType
  })

  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}

