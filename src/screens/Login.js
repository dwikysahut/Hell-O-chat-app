import React, {Component} from 'react';
import {Button, Text, View, Item, Input} from 'native-base';
import {Alert, Image, ToastAndroid} from 'react-native';
import {db} from '../utils/firebaseConfig';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles/Auth';
import {loginAction} from '../redux/actions/UserAction.js';
import {connect} from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    password: '',
    token: '',
    role: '',
    isLogin: false,
    validEmail: false,
    validPassword: false,
    isEmptyEmail: true,
    isEmptyPassword: true,
    isMatch: false,
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
  };
  showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Incorrect username or Password',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50,
    );
  };

  login = async () => {
    const {email, password} = this.state;
    // db.auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     db.auth().onAuthStateChanged(Users => {
    //       db.database()
    //         .ref(`users/${Users.uid}`)
    //         .once('value')
    //         .then(data => {
    //           console.log(data.val());
    //         });
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     Alert.alert('Wrong Email Or Password');
    //   });
    if (this.state.email === '') {
      Alert.alert('Caution', 'email Cannot Empty!!');
      this.setState({isEmptyEmail: true});
      return;
    }
    if (!this.state.validEmail) {
      Alert.alert('Email Not Valid');
      this.setState({isEmptyPassword: true});
      return;
    }
    if (this.state.password === '') {
      Alert.alert('password Cannot Empty');
      this.setState({isEmptyPassword: true});
      return;
    }
    if (this.state.validPassword === false) {
      Alert.alert('password must 5-16 characters');
    } else {
      if (this.props.isRejected === false) {
        // Alert.alert('berhasil')
        this.setState({isMatch: true});
        // this.props.navigation.navigate('Books')
      }
    }

    this.setState({isShow: true});
    if (this.state.validEmail && this.state.validPassword) {
      await this.props.loginAction(email, password);
      // console.log(this.getData('uid'));

      db.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({email: '', password: ''});
          this.props.navigation.navigate('Home', {uid: user.uid});
        }
      });
    }
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
        <Text style={styles.title}>Hell-O</Text>
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
              Hint : Input valid Email ( ex : xxx@gmail.com)
            </Text>
          )}
        </Item>

        <View style={styles.inputView}>
          <Item>
            <Input
              style={styles.inputText}
              placeholder="Password"
              value={this.state.password}
              placeholderTextColor="white"
              secureTextEntry
              onChange={event => {
                if (
                  event.nativeEvent.text &&
                  event.nativeEvent.text.length > 4
                ) {
                  this.setState({
                    password: event.nativeEvent.text,
                    validPassword: true,
                    isEmptyPassword: false,
                  });
                }
                if (
                  event.nativeEvent.text &&
                  event.nativeEvent.text.length <= 4
                ) {
                  this.setState({
                    password: event.nativeEvent.text,
                    isEmptyPassword: false,
                    validPassword: false,
                  });
                }
                if (!event.nativeEvent.text) {
                  this.setState({
                    password: '',
                    isEmptyPassword: true,
                    validPassword: false,
                  });
                }
              }}
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
        <Button style={styles.loginBtn} onPress={this.login}>
          <Text style={styles.loginText}> LOGIN </Text>
        </Button>
        <Item>
          <Text style={styles.inputText}>Don't have an account yet? </Text>
          <Text
            style={styles.registerText}
            onPress={() => this.props.navigation.navigate('Register')}>
            Register
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
