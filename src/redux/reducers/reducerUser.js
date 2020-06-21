/* eslint-disable no-shadow */
/* eslint-disable radix */
// berupa function nantinya menerima parameter prevState dan action , nantinya mereturn state baru
import {
  getUserAction,
  pending,
  rejected,
  fulfilled,
  loginUserAction,
  // registerUserAction,
  deleteUserAction,
  logoutUserAction,
  // refreshTokenAction,
  putUserAction,
} from '../actions/actionTypes';
// import AsyncStorage from '@react-native-community/async-storage';

const initialValue = {
  data: [],

  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  errorToken: '',
  error: '',
  errorDelete: '',
  role: '',
  id: '',
  email: '',
  refreshtoken: '',
  token: '',
  dataLogin: {},
  id_user: '',
  isLogin: false,
  dataUser: {},
}; // biar tidak undefined

const dataUser = (prevState = initialValue, action) => {
  switch (action.type) {
    case getUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.message,
      };
    case getUserAction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        dataUser: action.payload,
      };
    case getUserAction:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        dataUser: action.payload,
      };
    case deleteUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case deleteUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorDelete: action.error,
      };
    case deleteUserAction + fulfilled:
      const deleteData = prevState.data.filter(
        // eslint-disable-next-line eqeqeq
        dataUser => dataUser.id != parseInt(action.payload.data.data.id),
      );
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: deleteData,
      };
    case putUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case putUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data,
      };
    case putUserAction + fulfilled:
      const newData = prevState.data.map(dataUser => {
        // eslint-disable-next-line eqeqeq
        if (dataUser.id == action.payload.data.data.id) {
          return action.payload.data.data;
        }
        return dataUser;
      });

      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: newData,
      };

    case loginUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
        error: '',
      };
    case loginUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.message,
        token: action.payload,
      };
    case loginUserAction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        dataUser: action.payload,
        isLogin: true,
      };
    case loginUserAction:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        dataUser: action.payload,
        isLogin: true,
      };
    case logoutUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case logoutUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        errorToken: action.payload.response.data.data.message,
      };
    case logoutUserAction:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        // dataUser: action.payload,
        isLogin: false,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default dataUser;
