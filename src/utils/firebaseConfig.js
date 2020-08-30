import * as Firebase from 'firebase';
const firebaseConfig = {
 //copy your firebase config here
};

const fireApp = Firebase.initializeApp(firebaseConfig);
// export const db = fireApp.database();
export const db = fireApp;
