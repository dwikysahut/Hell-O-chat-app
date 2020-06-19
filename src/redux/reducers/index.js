import reducerAuthor from './reducerAuthor';
import reducerGenre from './reducerGenre';
import reducerUser from './reducerUser';
import reducerBorrow from './reducerBorrow';
import reducerBook from './reducerBooks';
import {combineReducers} from 'redux';
import {logoutUserAction} from '../actions/actionTypes';
import {REHYDRATE} from 'redux-persist/lib/constants';

const allReducers = combineReducers({
  reducerUser,
  reducerAuthor,
  reducerBook,
  reducerBorrow,
  reducerGenre,
});
const rootReducer = (state, action) => {
  if (action.type === logoutUserAction) {
    delete state.reducerUser;
    delete state.reducerAuthor;
    delete state.reducerGenre;
    delete state.reducerBook;
    delete state.reducerBorrow;
  }
  if (action.type === REHYDRATE) {
    state = action.payload;
  }
  return allReducers(state, action);
};
export default rootReducer;
