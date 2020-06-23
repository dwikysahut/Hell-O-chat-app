import {
  getUserAction,
  logoutUserAction,
  loginUserAction,
  // registerUserAction,
  // deleteUserAction,
  // refreshTokenAction,
  // putUserAction,
} from './actionTypes';
import {db} from '../../utils/firebaseConfig';
import {ToastAndroid} from 'react-native';

// export const getUserActionCreator = token => {
//   return {
//     type: getUserAction,
//     payload: allUser(token),
//   };
// };
import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (e) {
    // saving error
  }
};
// export const loginUserActionCreator = body => {
//   return {
//     type: loginUserAction,
//     payload: loginAction(body),
//   };
// };
export const getDataUserAction = uid => async dispatch => {
  db.database()
    .ref(`Users/${uid}`)
    .once('value')
    .then(data => {
      dispatch({
        type: getUserAction,
        payload: data.val(),
      });
    });
};
export const loginAction = (email, password) => async dispatch => {
  try {
    db.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        db.auth().onAuthStateChanged(Users => {
          if (Users) {
            db.database()
              .ref(`Users/${Users.uid}`)
              .once('value')
              .then(data => {
                // console.log(data.val());
                db.database()
                  .ref(`Users/${Users.uid}`)
                  .update({
                    status: 'Online',
                  })
                  .then(() => {
                    dispatch({
                      type: loginUserAction,
                      payload: data.val(),
                    });
                  })
                  .catch(error => console.log(error));
              });
            Users ? storeData('uid', Users.uid) : AsyncStorage.clear();
          }
        });
      })
      .catch(() => {
        //  Alert.alert('Invalid Email Or Password');
        ToastAndroid.showWithGravityAndOffset(
          'Incorrect username or Password',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50,
        );
      });
  } catch (error) {
    console.log(error);
  }
};
export const logoutAction = () => async dispatch => {
  dispatch({
    type: logoutUserAction,
  });
};
// export const registerUserActionCreator = body => {
//   return {
//     type: registerUserAction,
//     payload: registerUser(body),
//   };
// };

// export const deleteUserActionCreator = (token, id) => {
//   return {
//     type: deleteUserAction,
//     payload: deleteUser(token, id),
//   };
// };
// export const putUserActionCreator = (token, id, body) => {
//   return {
//     type: putUserAction,
//     payload: editUser(token, id, body),
//   };
// };
// export const logoutUserActionCreator = token => {
//   return {
//     type: logoutUserAction,
//     payload: deleteToken(token),
//   };
// };

// export const refreshTokenActionCreator = body => {
//   return {
//     type: refreshTokenAction,
//     payload: refreshToken(body),
//   };
// };
