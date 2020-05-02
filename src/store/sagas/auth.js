import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

// generator function: function*
function* logout(action) {
  // in a generator, should prefix/prepend each step we execute with the yield keyword. means that this step should be executed and then it will wait for it to finish
  // so if it were an asynchronous action, it wouldn't continue before the step is done,
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  // put() in the end will just dispatch a new action
  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}