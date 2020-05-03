import { takeEvery } from 'redux-saga/effects';
//  allow us to listen to certain actions and do something when they occur

import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from './auth';
import {
  initIngredientsSaga,
} from './burgerBuilder';
import {
  purchaserBurgerSaga,
  fetchOrdersSaga,
} from './order';

export function* watchAuth() { // generator
  // takeEvery() takes a second argument, this second argument is the generator, the saga we then want to execute when this action occurs and that would be the logout saga.
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga); // listener
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga); // listener
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga); // listener
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga); // listener
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga); // listener
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaserBurgerSaga); // listener
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga); // listener
}
