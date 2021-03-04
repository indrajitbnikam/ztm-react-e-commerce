import { takeEvery, call, put } from 'redux-saga/effects';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';
import { shopActionTypes } from './shop.types';

export function* fetchCollectionsStart() {
  yield takeEvery(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* fetchCollectionsAsync() {
  const collectionRef = firestore.collection('collections');

  try {
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }
}
