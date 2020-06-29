import * as Firebase from 'firebase';
const firebaseConfig = {
//copy your code here
};

const fireApp = Firebase.initializeApp(firebaseConfig);
// export const db = fireApp.database();
export const db = fireApp;
