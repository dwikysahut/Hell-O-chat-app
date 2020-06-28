import reducerUser from './reducerUser';
import {combineReducers} from 'redux';
import {logoutUserAction} from '../actions/actionTypes';
import {REHYDRATE} from 'redux-persist/lib/constants';

const allReducers = combineReducers({
  reducerUser,
});
const rootReducer = (state, action) => {
  if (action.type === logoutUserAction) {
    delete state.reducerUser;
    // delete state.reducerAuthor;
    // delete state.reducerGenre;
    // delete state.reducerBook;
    // delete state.reducerBorrow;
  }
  if (action.type === REHYDRATE) {
    state = action.payload;
  }
  return allReducers(state, action);
};
export default rootReducer;
