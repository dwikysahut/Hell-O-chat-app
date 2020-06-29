import React, {Component} from 'react';
import {Button, Text, View, Item, Input} from 'native-base';
import {Alert, Image, ToastAndroid, BackHandler} from 'react-native';
import {db} from '../utils/firebaseConfig';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles/Auth';
import {loginAction} from '../redux/actions/UserAction.js';
import {connect} from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    isShow: false,
  };
  storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (e) {
      // saving error
    }
  };
  getData = async name => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  componentDidMount = () => {
    console.log(this.state.email);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    this.props.navigation.goBack(null);
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
    this.onButtonPress();
  };
  showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Your email is not registered',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50,
    );
  };
  forgotPassword = () => {
    db.auth()
      .sendPasswordResetEmail(this.state.email)
      .then(user => {
        Alert.alert('Confirmation Send', 'Please Check Your Email');
        this.props.navigation.navigate('Login');
      })
      .catch(e => {
        this.showToast();
      });
  };
  render() {
    // const { isLogin } = this.state
    // let valid = 'form-control is-valid';
    // let invalid = 'form-control is-invalid';
    console.disableYellowBox = true;

    return (
      <View style={styles.container}>
        <Image
          source={require('../../image/logo2.png')}
          style={{width: 150, height: 150, marginBottom: 0}}
        />
        <Text style={styles.title}>Reset Password</Text>
        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Email"
              value={this.state.email}
              placeholderTextColor="white"
              onChange={event => {
                if (
                  event.nativeEvent.text &&
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    event.nativeEvent.text,
                  )
                ) {
                  this.setState({
                    email: event.nativeEvent.text,
                    validEmail: true,
                    isEmptyEmail: false,
                  });
                } else {
                  this.setState({
                    email: event.nativeEvent.text,
                    validEmail: false,
                  });
                }
              }}
            />
            {/* <Icon name='close-circle' /> */}
            {/* <Icon name='checkmark-circle' /> */}
          </Item>
        </View>
        <Item style={styles.hint}>
          {this.state.email &&
          // eslint-disable-next-line prettier/prettier
          (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) ? (
            <></>
          ) : (
            <Text note style={styles.yellowColor}>
              Input Your Valid Email ( ex : xxx@gmail.com)
            </Text>
          )}
        </Item>
        <Button style={styles.loginBtn} onPress={this.forgotPassword}>
          <Text style={styles.loginText}> Send to Email </Text>
        </Button>
        <Item style={styles.backToLogin}>
          <Text style={styles.inputText}>Back to </Text>
          <Text
            style={styles.registerText}
            onPress={() => this.props.navigation.navigate('Login')}>
            Login
          </Text>
        </Item>
      </View>
    );
  }
}
const mapDispatchToProps = {
  loginAction,
};
// export default Login;

export default connect(
  null,
  mapDispatchToProps,
)(Login);
