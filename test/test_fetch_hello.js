import assert from 'assert'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { fetchHello, login, fetchPrivateHello } from '../src/actions'
import helloApp from '../src/reducers'

import nock from 'nock'
import {LocalStorage} from 'node-localstorage'

// replace localStorage for testing on Node.js
global.localStorage = new LocalStorage('./scratch')

describe('fetchHello', () => {

  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
  const store = createStoreWithMiddleware(helloApp)

  beforeEach(() => {
    nock.cleanAll()
    global.localStorage.clear()
  });

  it('fetching', (done) => {
    // fetching は再現が難しいので nock
    nock('http://localhost:3000').get('/api/hello').delay(100).reply(200, 'hello, public')
    store.dispatch(fetchHello())
    setTimeout(() => {
      const { statusMessage, errorMessage } = store.getState().messageState
      const { hello } = store.getState().helloState
      assert.equal(statusMessage, 'start fetching hello')
      assert.equal(hello, '')
      done()
    }, 10)
  });

  it('success', (done) => {
    // nock('http://localhost:3000').get('/api/hello').reply(200, 'hello, public')
    store.dispatch(fetchHello())
    setTimeout(() => {
      const { statusMessage, errorMessage } = store.getState().messageState
      const { hello } = store.getState().helloState
      assert.equal(statusMessage, 'finish fetching hello')
      assert.equal(hello, 'hello, public')
      done()
    }, 50)
  });

  it('failure', (done) => {
    // failure は再現が難しいので nock
    nock('http://localhost:3000').get('/api/hello').reply(404)
    store.dispatch(fetchHello())
    setTimeout(() => {
      const { statusMessage, errorMessage } = store.getState().messageState
      const { hello } = store.getState().helloState
      assert.equal(errorMessage, 'fail fetching hello')
      done()
    }, 10)
  });
});

describe('login', () => {

  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
  const store = createStoreWithMiddleware(helloApp)

  beforeEach(() => {
    nock.cleanAll()
    global.localStorage.clear()
  });

  it('success', (done) => {
    nock('http://localhost:3000').post('/api/sessions').reply(201, {id_token: 'dummy-token'})
    store.dispatch(login())
    setTimeout(() => {
      const { statusMessage, errorMessage } = store.getState().messageState
      const { userName, isAuthenticated } = store.getState().userState
      assert.equal(statusMessage, 'finish login')
      assert.ok(isAuthenticated)
      const token = localStorage.getItem('id_token')
      assert.ok(token)
      done()
    }, 10)
  })
});

describe('fetchPrivateHello', () => {

  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
  const store = createStoreWithMiddleware(helloApp)

  beforeEach(() => {
    nock.cleanAll()
    global.localStorage.clear()
  });

  it('fetching', (done) => {
    // fetching は再現が難しいので nock
    nock('http://localhost:3000').get('/api/private/hello').delay(100).reply(200, 'hello, public')
    store.dispatch(fetchPrivateHello())
    setTimeout(() => {
      const { statusMessage, errorMessage } = store.getState().messageState
      const { privateHello } = store.getState().privateHelloState
      assert.equal(statusMessage, 'start fetching private hello')
      assert.equal(privateHello, '')
      done()
    }, 10)
  });

  it('failure because of no token', (done) => {
    // nock('http://localhost:3000').get('/api/private/hello').reply(401)
    store.dispatch(fetchPrivateHello())
    setTimeout(() => {
      const { statusMessage, errorMessage } = store.getState().messageState
      assert.equal(errorMessage, 'fail fetching private hello')
      done()
    }, 10)
  });

  it('success', (done) => {
    nock('http://localhost:3000').post('/api/sessions').reply(201, {id_token: 'dummy-token'})
    store.dispatch(login())

    setTimeout(() => {
      nock('http://localhost:3000').get('/api/private/hello').reply(200, 'hello, private')
      store.dispatch(fetchPrivateHello())
      setTimeout(() => {
        const { statusMessage, errorMessage } = store.getState().messageState
        const { privateHello } = store.getState().privateHelloState
        assert.equal(statusMessage, 'finish fetching private hello')
        assert.equal(privateHello, 'hello, private')
        done()
      }, 10)
    }, 10)
  });
});
