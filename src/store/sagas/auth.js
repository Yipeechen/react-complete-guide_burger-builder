import { put, delay } from 'redux-saga/effects';

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