import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD9P6rwc0vvm1fXzXJ9ZDGMrmUYc1CAwHg',
  authDomain: 'prog-cafe.firebaseapp.com',
  databaseURL: 'https://prog-cafe.firebaseio.com',
  projectId: 'prog-cafe',
  storageBucket: 'prog-cafe.appspot.com',
  messagingSenderId: '223876577487',
  appId: '1:223876577487:web:0ff1adce606b62761a1fba',
  measurementId: 'G-JXTDSGXWDJ',
};
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line import/prefer-default-export
export const auth = firebase.auth();
