import { all, call, put, takeLatest } from "redux-saga/effects"
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils"
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from "./user.actions";
import { UserActionTypes } from "./user.types"

function* onGoogleSignInStart() {
  yield takeLatest(
    UserActionTypes.GOOGLE_SIGN_IN_START,
    googleSignInAsync
  )
}

function* googleSignInAsync() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onEmailAndPasswordSignInStart() {
  yield takeLatest(
    UserActionTypes.EMAIL_SIGN_IN_START,
    emailAndPasswordSignInAsync
  )
}

function* emailAndPasswordSignInAsync({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapShot = yield userRef.get();
    const currentUser = {
      id: userSnapShot.id,
      ...userSnapShot.data()
    }
    yield put(signInSuccess(currentUser));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onCheckUserSession() {
  yield takeLatest(
    UserActionTypes.CHECK_USER_SESSION,
    isUserAuthenticated
  )
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onSignOutStart() {
  yield takeLatest(
    UserActionTypes.SIGN_OUT_START,
    signOutUser
  );
}

function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

function* onSignUpStart() {
  yield takeLatest(
    UserActionTypes.SIGN_UP_START,
    signUpTheUser
  );
}

function* signUpTheUser({ payload: { email, password, additionalData }}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData }));
  } catch (error) {
    yield put(signUpFailure(error.message))
  }
}

function* onSignUpSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_UP_SUCCESS,
    signInAfterSignUp
  )
}

function* signInAfterSignUp({payload: { user, additionalData }}) {
  yield getSnapshotFromUserAuth(user, additionalData)
}

export default function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailAndPasswordSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}