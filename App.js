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

class App extends Component {
  render() {
    return (
      //   <NavigationContainer>
      //     <Provider store={store}>

      // </Provider>
      // </NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Navigator initialRouteName="Splash">
              <Screen
                name="Splash"
                component={Splash}
                options={{
                  headerShown: false,
                }}
              />
              {/* {this.props.isLogin ? ( */}
              <Screen
                name="Home"
                component={this.HomeTabNav}
                options={{
                  headerShown: false,
                }}
              />
              {/* ) : ( */}
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
              {/* )} */}
              <Screen
                name="Coba"
                component={Coba}
                options={{
                  headerShown: true,
                }}
              />
              {/* <Screen name="Dimensions" component={Dimensions} /> */}
            </Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
  HomeTabNav() {
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

  // function ProfileScreen() {
  //   return (
  //   <Navigator initialRouteName="Profile">
  //   <Screen name="User" component={User} />
  //   <Screen name="Books" component={Books} options={{
  //     headerShown: false,
  //   }} />

  //   <Screen
  //     name="Profile"
  //     component={Profile}
  //     options={{
  //       headerShown: true, headerLeft: null
  //     }}
  //   />
  //   {/* <Screen name="Dimensions" component={Dimensions} /> */}
  // </Navigator>
  //   )
  // }
  // function BorrowScreen() {
  //   return (
  //   <Navigator tabBarOptions={{
  //     style: {
  //       backgroundColor: 'white',//color you want to change
  //     }}
  //   } initialRouteName="Borrow">
  //   <Screen name="Home" component={Home} />
  //   <Screen name="Login" component={Login} options={{
  //     headerShown: false,

  //   }} />
  //   <Screen name="Register" component={Register} options={{
  //     headerShown: false,

  //   }} />
  //   <Screen name="ManageAuthor" component={ManageAuthor} />

  //   <Screen name="ManageGenre" component={ManageGenre} />
  //   <Screen name="Author" component={Author} options={{
  //     headerShown: true,

  //   }} />
  //   <Screen name="Genre" component={Genre} options={{
  //     headerShown: true,

  //   }} />
  //   <Screen name="User" component={User} />
  //   <Screen name="Books" component={Books} options={{
  //     headerShown: false,

  //   }} />
  //   <Screen name="Borrow" component={Borrow} />
  //   <Screen name="Detail" component={Detail}options={{
  //     headerShown: false,

  //   }} />
  //   <Screen
  //     name="Profile"
  //     component={Profile}
  //     options={{
  //       headerShown: true, headerLeft: null
  //     }}
  //   />
  //   {/* <Screen name="Dimensions" component={Dimensions} /> */}
  // </Navigator>
  //   )
  // }
  // function HomeScreen() {
  //   return (
  //     <Navigator initialRouteName="AllBooks">
  //     <Screen name="Home" component={Books} />
  //     <Screen name="AllBooks" component={AllBooks} options={{
  //       headerShown: false,

  //     }} />
  //     {/* <Screen name="Register" component={Register} options={{
  //       headerShown: false,

  //     }} />
  //     <Screen name="ManageAuthor" component={ManageAuthor} />

  //     <Screen name="ManageGenre" component={ManageGenre} />
  //     <Screen name="Author" component={Author} options={{
  //       headerShown: true,

  //     }} />
  //     <Screen name="Genre" component={Genre} options={{
  //       headerShown: true,

  //     }} />
  //     <Screen name="User" component={User} />
  //     <Screen name="Books" component={Books} options={{
  //       headerShown: false,

  //     }} />
  //     <Screen name="Borrow" component={Borrow} />
  //     <Screen name="Detail" component={Detail}options={{
  //       headerShown: false,

  //     }} />
  //     <Screen
  //       name="Profile"
  //       component={Profile}
  //       options={{
  //         headerShown: true, headerLeft: null
  //       }} */}
  //     />
  //     {/* <Screen name="Dimensions" component={Dimensions} /> */}
  //   </Navigator>
  //   );
  // }
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
