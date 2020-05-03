import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

// generator function: function*
export function* logoutSaga(action) {
  // in a generator, should prefix/prepend each step we execute with the yield keyword. means that this step should be executed and then it will wait for it to finish
  // so if it were an asynchronous action, it wouldn't continue before the step is done,
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  // put() in the end will just dispatch a new action
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`;
  if (!action.isSignup) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`
  }
  
  try {
    const response = yield axios.post(url, authData);
  
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}