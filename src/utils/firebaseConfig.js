import * as Firebase from 'firebase';
const firebaseConfig = {
  //paste your firebaseConfig Here
};

const fireApp = Firebase.initializeApp(firebaseConfig);
// export const db = fireApp.database();
export const db = fireApp;
