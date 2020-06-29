import * as Firebase from 'firebase';
const firebaseConfig = {
//Copy and paste your firebaseConfig here
};

const fireApp = Firebase.initializeApp(firebaseConfig);
// export const db = fireApp.database();
export const db = fireApp;
