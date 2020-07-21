import * as Firebase from 'firebase';
//paste your firebase config here
const fireApp = Firebase.initializeApp(firebaseConfig);
// export const db = fireApp.database();
export const db = fireApp;
