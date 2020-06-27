// /* eslint-disable no-shadow */
// /* eslint-disable radix */
// // berupa function nantinya menerima parameter prevState dan action , nantinya mereturn state baru
// import {
//   getAuthorAction,
//   pending,
//   rejected,
//   fulfilled,
//   postAuthorAction,
//   putAuthorAction,
//   deleteAuthorAction,
//   getAuthorByIdAction,
// } from '../actions/actionTypes';

// const initialValue = {
//   data: [],
//   name: '',
//   isLoading: false,
//   isRejected: false,
//   isFulfilled: false,
//   errorToken: '',
//   selectedData: {},
//   errorDelete: '',
// }; // biar tidak undefined

// const dataAuthor = (prevState = initialValue, action) => {
//   switch (action.type) {
//     case getAuthorAction + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isRejected: false,
//         isFulfilled: false,
//       };
//     case getAuthorAction + rejected:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: true,
//         isFulfilled: false,
//         error: action.payload.message,
//       };
//     case getAuthorAction + fulfilled:
//       // const dataById = prevState.data.map(dataAuthor => {
//       //     if(this.data){
//       //     if (dataAuthor.id === action.payload.data.data.id) {
//       //         return action.payload.data.data;
//       //     }
//       // }
//       //     return dataAuthor;
//       // }

//       // )

//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: false,
//         isFulfilled: true,
//         data: action.payload.data.data,
//       };

//     case postAuthorAction + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isRejected: false,
//         isFulfilled: false,
//       };
//     case postAuthorAction + rejected:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: true,
//         isFulfilled: false,
//         errorToken: action.payload.response.data.data.message,
//       };
//     case postAuthorAction + fulfilled:
//       prevState.data.push(action.payload.data.data);
//       const timestamp = new Date().getTime();
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: false,
//         isFulfilled: true,
//         data: prevState.data,
//         timestamp,
//       };

//     case putAuthorAction + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isRejected: false,
//         isFulfilled: false,
//       };
//     case putAuthorAction + rejected:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: true,
//         isFulfilled: false,
//         errorToken: action.payload.response.data.data.message,
//       };
//     case putAuthorAction + fulfilled:
//       const newData = prevState.data.map(dataAuthor => {
//         // eslint-disable-next-line eqeqeq
//         if (dataAuthor.id == action.payload.data.data.id) {
//           return action.payload.data.data;
//         }
//         return dataAuthor;
//       });

//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: false,
//         isFulfilled: true,
//         data: newData,
//       };

//     case deleteAuthorAction + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isRejected: false,
//         isFulfilled: false,
//       };
//     case deleteAuthorAction + rejected:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: true,
//         isFulfilled: false,
//         errorDelete: action.error,
//       };
//     case deleteAuthorAction + fulfilled:
//       const deleteData = prevState.data.filter(
//         // eslint-disable-next-line eqeqeq
//         dataAuthor => dataAuthor.id != parseInt(action.payload.data.data.id),
//       );
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: false,
//         isFulfilled: true,
//         data: deleteData,
//       };

//     case getAuthorByIdAction + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isRejected: false,
//         isFulfilled: false,
//       };
//     case getAuthorByIdAction + rejected:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: true,
//         isFulfilled: false,
//         errorToken: action.payload.response.data.data.message,
//       };
//     case getAuthorByIdAction + fulfilled:
//       return {
//         ...prevState,
//         isLoading: false,
//         isRejected: false,
//         isFulfilled: true,
//         selectedData: action.payload.data.data,
//       };
//     default:
//       return {
//         ...prevState,
//       };
//   }
// };

// export default dataAuthor;
