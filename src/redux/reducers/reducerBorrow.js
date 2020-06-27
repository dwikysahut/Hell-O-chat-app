// // berupa function nantinya menerima parameter prevState dan action , nantinya mereturn state baru
// import {
//   getAllBorrowAction,
//   pending,
//   rejected,
//   fulfilled,
//   getUserBorrowAction,
//   returnBookAction,
//   addBorrowAction,
// } from '../actions/actionTypes';
// // import { getAuthorActionByIdCreator } from "../actions/AuthorAction";

// const initialValue = {
//   data: [],
//   name: '',
//   isLoading: false,
//   isRejected: false,
//   isFulfilled: false,
//   errorToken: '',
//   borrow: [],
//   return: [],
// }; // biar tidak undefined

// const dataBorrow = (prevState = initialValue, action) => {
//   switch (action.type) {
//     case getAllBorrowAction + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isRejected: false,
//         isFulfilled: false,
//       };
//     case getAllBorrowAction + rejected:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: true,
//         isFulfilled: false,
//         error: action.payload.message,
//       };
//     case getAllBorrowAction + fulfilled:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: false,
//         isFulfilled: true,
//         data: action.payload.data.data,
//       };

//     case getUserBorrowAction + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isRejected: false,
//         isFulfilled: false,
//       };
//     case getUserBorrowAction + rejected:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: true,
//         isFulfilled: false,
//         error: action.payload.message,
//       };
//     case getUserBorrowAction + fulfilled:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: false,
//         isFulfilled: true,
//         data: action.payload.data.data,
//       };

//     case addBorrowAction + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isRejected: false,
//         isFulfilled: false,
//       };
//     case addBorrowAction + rejected:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: true,
//         isFulfilled: false,
//         errorToken: action.payload.response.data.data.message,
//       };
//     case addBorrowAction + fulfilled:
//       prevState.data.push(action.payload.data.data.data);

//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: false,
//         isFulfilled: true,
//         data: prevState.data,
//         borrow: action.payload.data.data.data,
//       };

//     case returnBookAction + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isRejected: false,
//         isFulfilled: false,
//       };
//     case returnBookAction + rejected:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: true,
//         isFulfilled: false,
//         // errorToken: action.payload.response.data.data.message
//       };
//     case returnBookAction + fulfilled:
//       const newData = prevState.data.map(dataBorrow => {
//         // eslint-disable-next-line eqeqeq
//         if (dataBorrow.id == action.payload.data.data.id) {
//           return action.payload.data.data;
//         }
//         return dataBorrow;
//       });

//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: false,
//         isFulfilled: true,
//         data: newData,
//         return: newData,
//       };

//     default:
//       return {
//         ...prevState,
//       };
//   }
// };

// export default dataBorrow;
