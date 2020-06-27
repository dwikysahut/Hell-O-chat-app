// import React, {useState, useEffect} from 'react';
// import {Button, Text, View, Item, Input} from 'native-base';
// import {
//   Alert,
//   // ImageBackground,
//   Image,
//   // KeyboardAvoidingView,
//   ToastAndroid,
// } from 'react-native';
// import {db} from '../utils/firebaseConfig';
// // import {Link} from '@react-navigation/native';
// // import { ImageBackground} from "react-native";
// // import { StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import styles from '../styles/Auth';
// // import {loginUser} from '../utils/http';
// import {loginAction} from '../redux/actions/UserAction.js';
// import {connect} from 'react-redux';

// const Login = ({navigation, loginAction}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [token, setToken] = useState('');
//   const [role, setRole] = useState('');
//   const [isLogin, setIsLogin] = useState(false);
//   const [validEmail, setValidEmail] = useState(false);
//   const [validPassword, setValidPassword] = useState(false);
//   const [isEmptyEmail, setIsEmptyEmail] = useState(true);
//   const [isEmptyPassword, setisEmptyPassword] = useState(true);
//   const [isMatch, setisMatch] = useState(false);
//   const [isShow, setisShow] = useState(false);

//   const storeData = async (name, value) => {
//     try {
//       await AsyncStorage.setItem(name, value);
//     } catch (e) {
//       // saving error
//     }
//   };
//   const getData = async name => {
//     try {
//       const value = await AsyncStorage.getItem(name);
//       if (value !== null) {
//         console.log(value);
//       }
//     } catch (e) {
//       // error reading value
//     }
//   };
//   const showToast = () => {
//     ToastAndroid.showWithGravityAndOffset(
//       'Incorrect username or Password',
//       ToastAndroid.LONG,
//       ToastAndroid.TOP,
//       25,
//       50,
//     );
//   };

//   const login = async () => {
//     // const {email, password} = this.state;
//     // db.auth()
//     //   .signInWithEmailAndPassword(email, password)
//     //   .then(() => {
//     //     db.auth().onAuthStateChanged(Users => {
//     //       db.database()
//     //         .ref(`users/${Users.uid}`)
//     //         .once('value')
//     //         .then(data => {
//     //           console.log(data.val());
//     //         });
//     //     });
//     //   })
//     //   .catch(error => {
//     //     console.log(error);
//     //     Alert.alert('Wrong Email Or Password');
//     //   });
//     if (email === '') {
//       Alert.alert('Caution', 'email Cannot Empty!!');
//       setIsEmptyEmail(true);
//       return;
//     }
//     if (!validEmail) {
//       Alert.alert('Email Not Valid');
//       setValidEmail(true);
//       return;
//     }
//     if (password === '') {
//       Alert.alert('password Cannot Empty');
//       setisEmptyPassword(true);
//       return;
//     }
//     if (validPassword === false) {
//       Alert.alert('password must 5-16 characters');
//     } else {
//       setisMatch(true);
//       // this.props.navigation.navigate('Books')
//     }

//     setisShow(true);
//     if (validEmail && validPassword) {
//       await loginAction(email, password);
//       // console.log(this.getData('uid'));

//       db.auth().onAuthStateChanged(user => {
//         if (user) {
//           setEmail('');
//           setPassword('');

//           navigation.navigate('Home');
//         }
//       });
//     }
//   };

//   console.disableYellowBox = true;

//   return (
//     <View
//       //  source={require('../../image/logo.png')}
//       style={styles.container}>
//       {/* <Container style={styles.container}> */}
//       {/* <Text style={styles.logo}>L o g i n</Text> */}
//       <Image
//         source={require('../../image/logo2.png')}
//         style={{width: 150, height: 150, marginBottom: 0}}
//       />
//       <Text style={styles.title}>Hell-O</Text>
//       <View style={styles.inputView}>
//         <Item>
//           <Input
//             style={styles.inputText}
//             placeholder="Email"
//             value={email}
//             placeholderTextColor="white"
//             onChange={event => {
//               if (
//                 event.nativeEvent.text &&
//                 /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
//                   event.nativeEvent.text,
//                 )
//               ) {
//                 setEmail(event.nativeEvent.text);
//                 setValidEmail(true);
//                 setIsEmptyEmail(false);
//               } else {
//                 setEmail(event.nativeEvent.text);
//                 setValidEmail(false);
//               }
//             }}
//           />
//           {/* <Icon name='close-circle' /> */}
//           {/* <Icon name='checkmark-circle' /> */}
//         </Item>
//         {email &&
//         // eslint-disable-next-line prettier/prettier
//           (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ? (
//           <Text note style={styles.greenColor}>
//             Looks Good !!
//           </Text> // <Text style={{color: 'red'}}>Input Valid email</Text>
//         ) : (
//           <Text note style={styles.yellowColor}>
//             Input valid Email ( ex : xxx@gmail.com)
//           </Text>
//         )}
//       </View>

//       {/* <Text style={{ padding: 10, paddingTop: 5 }}>Password</Text> */}
//       {/* <KeyboardAvoidingView> */}
//       <View style={styles.inputView}>
//         <Item>
//           <Input
//             style={styles.inputText}
//             placeholder="Password"
//             value={password}
//             placeholderTextColor="white"
//             secureTextEntry
//             onChange={event => {
//               if (event.nativeEvent.text && event.nativeEvent.text.length > 4) {
//                 setPassword(event.nativeEvent.text);
//                 setValidPassword(true);
//                 setisEmptyPassword(false);
//               }
//               if (
//                 event.nativeEvent.text &&
//                 event.nativeEvent.text.length <= 4
//               ) {
//                 setPassword(event.nativeEvent.text);
//                 setValidPassword(false);
//                 setisEmptyPassword(false);
//               }
//               if (!event.nativeEvent.text) {
//                 setPassword('');
//                 setValidPassword(true);
//                 setisEmptyPassword(false);
//               }
//             }}
//           />
//         </Item>
//         {password && password.length <= 4 ? (
//           <Text note style={styles.redColor}>
//             Password must 5-16 character
//           </Text>
//         ) : (
//           <></>
//         )}
//       </View>
//       {/* <Button onPress={() => navigation.navigate('Home')} dark>
//             <Text style={styles.textProfile}>Go To Home</Text>
//           </Button> */}
//       {/* <KeyboardAvoidingView> */}
//       <Button style={styles.loginBtn} onPress={login}>
//         <Text style={styles.loginText}> LOGIN </Text>
//       </Button>
//       {/* </KeyboardAvoidingView> */}
//       <Item>
//         <Text style={styles.inputText}>Don't have an account yet? </Text>
//         <Text
//           style={styles.registerText}
//           onPress={() => navigation.navigate('Register')}>
//           Register
//         </Text>
//       </Item>
//       {/* </Container> */}
//     </View>
//   );
// };
// const mapDispatchToProps = {
//   loginAction,
// };
// // export default Login;

// export default connect(
//   null,
//   mapDispatchToProps,
// )(Login);
