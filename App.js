import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import IconMaps from 'react-native-vector-icons/MaterialCommunityIcons';
// import AsyncStorage from '@react-native-community/async-storage';
import configureStore from './src/redux/store';
import {Provider} from 'react-redux';
// import {connect} from 'react-redux';

import Home from './src/screens/Home';
import Maps from './src/screens/Maps';
import Coba from './src/screens/Coba';
import ChatRoom from './src/screens/ChatRoom';
import MainRouter from './src/MainRouter';

import Splash from './src/screens/Splash';

import UserProfile from './src/screens/UserProfile';
import FriendProfile from './src/screens/FriendProfile';

import {StyleSheet} from 'react-native';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
// import Dimensions from './src/screens/Dimensions';

// import store from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
const {store, persistor} = configureStore();

const {Navigator, Screen} = createStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    //   <NavigationContainer>
    //     <Provider store={store}>

    // </Provider>
    // </NavigationContainer>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainRouter />
        {/* <NavigationContainer>
          <Navigator initialRouteName="Splash">
            <Screen
              name="Splash"
              component={Splash}
              options={{
                headerShown: false,
              }}
            />
            <Screen
              name="Home"
              component={HomeTabNav}
              options={{
                headerShown: false,
              }}
            />
            <>
              <Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Screen
                name="Register"
                component={Register}
                options={{
                  headerShown: false,
                }}
              />
            </>
            <Screen
              name="FriendProfile"
              component={FriendProfile}
              options={{
                headerShown: false,
              }}
            />
            <Screen
              name="ChatRoom"
              component={ChatRoom}
              options={{
                headerShown: false,
              }}
            />
            <Screen
              name="Coba"
              component={Coba}
              options={{
                headerShown: true,
              }}
            />
          </Navigator>
        </NavigationContainer> */}
      </PersistGate>
    </Provider>
  );
};

function HomeTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      // activeColor="black"
      // shifting={true}
      // barStyle={styles.barstyle}
      tabBarOptions={{
        inactiveTintColor: 'white',
        activeTintColor: 'black',
        activeBackgroundColor: 'white',
        inactiveBackgroundColor: 'black',
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Icon style={styles.colorIcon} name="home" />,
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          tabBarIcon: ({size}) => (
            <IconMaps name="google-maps" color="orange" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerShown: true,
          tabBarIcon: () => <Icon style={styles.colorIcon} name="person" />,
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  barstyle: {backgroundColor: 'black', height: 50},
  colorIcon: {color: 'orange'},
});

// export default connect(
//   mapStateToProps,
//   null,
// )(App);

export default App;
