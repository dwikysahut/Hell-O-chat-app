import * as Firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyBWtQzMAET67Fmef0DTM33f44bDO0z102c',
  authDomain: 'hell-o-chat-app.firebaseapp.com',
  databaseURL: 'https://hell-o-chat-app.firebaseio.com',
  projectId: 'hell-o-chat-app',
  storageBucket: 'hell-o-chat-app.appspot.com',
  messagingSenderId: '965675952937',
  appId: '1:965675952937:web:9a5efc810908580d602538',
  measurementId: 'G-5XTBSS79QK',
};

const fireApp = Firebase.initializeApp(firebaseConfig);
// export const db = fireApp.database();
export const db = fireApp;
