import React, {Component} from 'react';
import {Button, Text, View, Item, Input} from 'native-base';
import {
  Alert,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import {db} from '../utils/firebaseConfig';
import Geolocation from '@react-native-community/geolocation';
// import {Link} from '@react-navigation/native';
// import { ImageBackground} from "react-native";
// import { StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles/Auth';
// import {loginUser} from '../utils/http';
// import {loginUserActionCreator} from '../redux/actions/UserAction.js';
// import {connect} from 'react-redux';
import * as firebase from 'firebase';

class Register extends Component {
  state = {
    email: '',
    password: '',
    fullName: '',
    password2: '',
    // role: '2',
    isEmpty: true,
    isEmptyEmail: true,
    isEmptyPassword: true,
    isSuccess: false,
    isEmailValid: true,
    isMatch: true,
    isShow: false,
    emailExist: '',
    currentLocate: {},
  };
  handlerChange = (name, e) => {
    //  console.log(e.nativeEvent.text)
    //  console.log(name)

    if (e.nativeEvent.text) {
      this.setState({isSuccess: false});
      this.setState(
        {
          [name]: e.nativeEvent.text,
          isEmpty: false,
          isEmptyEmail: false,
          isEmptyPassword: false,
        },
        () => {},
      );
      // console.log(this.state.email);
      // console.log(this.state.password);
    } else {
      this.setState({
        isEmpty: true,
        [name]: '',
      });
    }
  };
  showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Email has Already Taken ',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50,
    );
  };
  register = () => {
    if (this.state.email) {
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
      ) {
        // this.setState({ isEmailValid: false })

        Alert.alert('You have entered an invalid email address!');
        return false;
      }
    }
    if (!this.state.email || this.state.email === '') {
      Alert.alert('Caution', 'email Cannot Empty');
      this.setState({isEmptyEmail: true});
      return;
    }
    if (this.state.password.length < 4 || this.state.password.length > 16) {
      // return false
      Alert.alert('Caution', 'The password must be 5-16 characters');
      return false;
    }
    if (!this.state.password || this.state.password === '') {
      Alert.alert('password Cannot Empty');
      this.setState({isEmptyPassword: true});
      return;
    }

    if (this.state.password2 !== this.state.password) {
      Alert.alert('Caution', "password and Re-Enter Password Doesn't Match");
      this.setState({isMatch: false});
      return false;
    } else {
      this.setState({isMatch: true});
    }

    if (this.state.isEmpty === false && this.state.password.length > 4) {
      // this.setState({ isSuccess: true })
      // console.log(this.state);
      // e.preventDefault()
      // const {email, password, role} = this.state;

      // this.setState({error: '', loading: true});
      const {email, password, fullName} = this.state;
      // console.log(db);
      // try {
      db.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(data => {
          db.database()
            .ref(`Users/${data.user.uid}`)
            .set({
              uid: data.user.uid,
              email,
              fullName,
              latitude: this.state.currentLocate.latitude,
              longitude: this.state.currentLocate.longitude,
            })
            .then(data => {
              console.log(data);
              //success callback
              Alert.alert('Register Successfully');
            })
            .catch(error => {
              //error callback
              console.log('error ', error);
            });
          this.setState({
            email: '',
            password: '',
            password2: '',
            fullName: '',
          });
          this.props.navigation.navigate('Login');
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.showToast();
              break;
          }
        });
    }
  };
  componentDidMount = () => {
    this.getCurrentLocation();
  };
  getCurrentLocation() {
    Geolocation.getCurrentPosition(info => {
      this.setState({currentLocate: info.coords});
      console.log(this.state.currentLocate);
    });
  }
  render() {
    // const { isLogin } = this.state
    // let valid = 'form-control is-valid';
    // let invalid = 'form-control is-invalid';
    console.disableYellowBox = true;
    return (
      <View
        //  source={require('../../image/logo.png')}
        style={styles.container}>
        {/* <Container style={styles.container}> */}
        {/* <Text style={styles.logo}>L o g i n</Text> */}
        {/* <Image
          source={require('../../image/logo2.png')}
          style={{width: 150, height: 150}}
        /> */}
        <Text style={styles.title}>Welcome</Text>
        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Full Name"
              name="fullName"
              placeholderTextColor="white"
              onChange={e => this.handlerChange('fullName', e)}
            />
          </Item>
        </View>
        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Email"
              name="email"
              placeholderTextColor="white"
              onChange={e => this.handlerChange('email', e)}
            />
          </Item>
          {this.state.email &&
          // eslint-disable-next-line prettier/prettier
          (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) ? (
            <Text note style={styles.greenColor}>
              Looks Good !!
            </Text> // <Text style={{color: 'red'}}>Input Valid email</Text>
          ) : (
            <Text note style={styles.yellowColor}>
              Hint : Input valid Email ( ex : xxx@gmail.com)
            </Text>
          )}
        </View>
        {/* <Text style={{ padding: 10, paddingTop: 5 }}>Password</Text> */}
        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
              name="password"
              onChange={e => this.handlerChange('password', e)}
            />
          </Item>
          {this.state.password && this.state.password.length <= 4 ? (
            <Text note style={styles.redColor}>
              Password must 5-16 character
            </Text>
          ) : (
            <></>
          )}
        </View>

        {/* <Text style={{ padding: 10, paddingTop: 5 }}>Re-Enter Password</Text> */}
        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Repeat Password"
              placeholderTextColor="white"
              secureTextEntry
              name="password2"
              onChange={event => {
                if (event.nativeEvent.text) {
                  if (event.nativeEvent.text !== this.state.password) {
                    // <small style={{color:"red"}}>Doesn't match</small>
                  }
                  this.setState({
                    password2: event.nativeEvent.text,
                    isSame: false,
                    isEmpty: false,
                  });
                } else {
                  this.setState({
                    password2: '',
                    isSame: false,
                    isEmpty: true,
                  });
                }
              }}
            />
          </Item>
          {this.state.password2 &&
          this.state.password2 !== this.state.password ? (
            <Text note style={styles.redColor}>
              Password Doesn't Match
            </Text>
          ) : (
            <></>
          )}
        </View>
        {/* <Text style={{ padding: 10, paddingTop: 5 }}>Role</Text> */}
        {/* <View style={styles.inputView} >
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            // iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            name="role"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.role}
                            onValueChange={(e) => this.handlerChange('role', e)}
                        >
                            <Picker.Item label="User" value="2" />
                        </Picker>
                    </Item>
                </View> */}

        <Button style={styles.loginBtn} onPress={this.register}>
          <Text style={styles.loginText}> SIGN UP </Text>
        </Button>

        {/* </KeyboardAvoidingView> */}
        <Item>
          <Text style={styles.inputText}>Already have an account ? </Text>
          <Text
            style={styles.registerText}
            onPress={() => this.props.navigation.navigate('Login')}>
            Login
          </Text>
        </Item>
        {/* </Container> */}
      </View>
    );
  }
}

export default Register;
