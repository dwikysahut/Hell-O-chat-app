import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import IconMaps from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './screens/Home';
import Maps from './screens/Maps';
// import Coba from './screens/Coba';
import ChatRoom from './screens/ChatRoom';

import Splash from './screens/Splash';

import UserProfile from './screens/UserProfile';
import FriendProfile from './screens/FriendProfile';

import {AppState, StyleSheet, Text, View} from 'react-native';

import Login from './screens/Login';
import Register from './screens/Register';
// import Dimensions from './src/screens/Dimensions';
import {connect} from 'react-redux';
// import store from './src/redux/store';
import {db} from './utils/firebaseConfig';

const {Navigator, Screen} = createStackNavigator();

const Tab = createBottomTabNavigator();

class MainRouter extends Component {
  state = {
    appState: AppState.currentState,
  };
  _handleAppStateChange = async nextAppState => {
    console.log(nextAppState);
    if (this.props.dataUser.uid) {
      if (
        this.state.appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        await db
          .database()
          .ref(`Users/${this.props.dataUser.uid}`)
          .update({
            status: 'Online',
          })
          .then(() => console.log('active'));
      } else if (nextAppState === 'background') {
        db.database()
          .ref(`Users/${this.props.dataUser.uid}`)
          .update({
            status: 'Offline',
          })
          .then(() => console.log('background'));
      } else {
        db.database()
          .ref(`Users/${this.props.dataUser.uid}`)
          .update({
            status: 'Online',
          })
          .then(() => console.log('background'));
      }
      this.setState({appState: nextAppState});
    }
  };
  componentDidMount() {
    // console.log(this.props.dataUser.uid);
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  render() {
    return (
      //   <NavigationContainer>
      //     <Provider store={store}>

      // </Provider>
      // </NavigationContainer>
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
        </Navigator>
      </NavigationContainer>
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
}
const styles = StyleSheet.create({
  barstyle: {backgroundColor: 'black', height: 50},
  colorIcon: {color: 'orange'},
});

// export default connect(
//   mapStateToProps,
//   null,
// )(App);

const mapStateToProps = ({reducerUser}) => {
  return {
    dataUser: reducerUser.dataUser,
  };
};

export default connect(
  mapStateToProps,
  null,
)(MainRouter);
