//biar tidak  typo

export const addCounter = 'ADD_COUNTER';
export const subCounter = 'SUB_COUNTER';

//genre
export const getGenreAction = 'GET_GENRE';
export const putGenreAction = 'PUT_GENRE';
export const postGenreAction = 'POST_GENRE';
export const deleteGenreAction = 'DELETE_GENRE';
export const getGenreByIdAction = 'GET_GENRE_BY_ID';

//author
export const getAuthorAction = 'GET_AUTHOR';
export const putAuthorAction = 'PUT_AUTHOR';
export const postAuthorAction = 'POST_AUTHOR';
export const deleteAuthorAction = 'DELETE_AUTHOR';
export const getAuthorByIdAction = 'GET_AUTHOR_BY_ID';

//borrow
export const getAllBorrowAction = 'GET_ALL_BORROW';
export const getUserBorrowAction = 'GET_USER_BORROW';
export const addBorrowAction = 'POST_BORROW';
export const returnBookAction = 'PUT_RETURN_BOOK';

//user and login register
export const loginUserAction = 'POST_LOGIN';
export const registerUserAction = 'POST_REGISTER';
export const getUserAction = 'GET_USER';
export const putUserAction = 'PUT_USER';

export const deleteUserAction = 'DELETE_USER';
export const logoutUserAction = 'DELETE_LOGOUT';
export const refreshTokenAction = 'POST_REFRESH_TOKEN';

// book
export const getAllBooksAction = 'GET_ALL_BOOKS';
export const getDetailBookAction = 'GET_DETAIL_BOOK';
export const getBookByIdAction = 'GET_BOOK_BY_ID';
export const postBookAction = 'POST_BOOK';
export const editBookAction = 'EDIT_BOOK';
export const deleteBookAction = 'DELETE_BOOK';

export const pending = '_PENDING';
export const rejected = '_REJECTED';
export const fulfilled = '_FULFILLED';
