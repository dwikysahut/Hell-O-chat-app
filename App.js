import 'react-native-gesture-handler';
import React from 'react';
import configureStore from './src/redux/store';
import {Provider} from 'react-redux';
import MainRouter from './src/MainRouter';
import {PersistGate} from 'redux-persist/integration/react';
const {store, persistor} = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainRouter />
      </PersistGate>
    </Provider>
  );
};
export default App;
