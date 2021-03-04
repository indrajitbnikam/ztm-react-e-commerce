import { UserActionTypes } from "./user.types";

export const setCurrentUser = user => ({
  type: UserActionTypes.SetCurrentUser,
  payload: user
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
})

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = errorMessage => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: errorMessage
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = errorMessage => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: errorMessage
});

export const signUpStart = userData => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userData
});

export const signUpSuccess = userData => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: userData
});

export const signUpFailure = errorMessage => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: errorMessage
});
