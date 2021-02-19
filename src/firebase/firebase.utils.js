import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBhQw2ojUUZ3nUyPgXRV4psMdzzRoZsuM8",
  authDomain: "crwn-db-397d6.firebaseapp.com",
  projectId: "crwn-db-397d6",
  storageBucket: "crwn-db-397d6.appspot.com",
  messagingSenderId: "867871324603",
  appId: "1:867871324603:web:65052f3b07d75c43a02c9e"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);  
};

export default firebase;