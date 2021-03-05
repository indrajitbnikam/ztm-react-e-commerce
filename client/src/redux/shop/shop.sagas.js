import { all, call, put, takeLatest } from 'redux-saga/effects';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';
import { shopActionTypes } from './shop.types';

export function* fetchCollectionsStart() {
  // Using takeEvery because there might multiple such actions dispatched
  // in a very short time
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }
}

export default function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ]);
}
