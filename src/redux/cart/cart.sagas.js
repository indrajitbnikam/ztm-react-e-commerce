import { all, call, put, takeLatest } from "redux-saga/effects";
import { UserActionTypes } from "../user/user.types";
import { clearTheCart } from "./cart.actions";

function* onSignOutSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_OUT_SUCCESS,
    clearCartOnSignOut
  )
}

function* clearCartOnSignOut() {
  yield put(clearTheCart());
}

export default function* cartSagas() {
  yield all([
    call(onSignOutSuccess)
  ]);
}