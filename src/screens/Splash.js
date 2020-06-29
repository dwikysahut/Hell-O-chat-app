import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Container} from 'native-base';
import {db} from '../utils/firebaseConfig';
import {connect} from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 1,
      token: '',
      login: false,
    };
    // setTimeout(()=>{
    //   this.props.navigation.navigate("Login")
    // },10000);
  }
  getStoreData = async name => {
    const value = await AsyncStorage.getItem(`${name}`);
    // console.log(value)
    this.setState({name: value});
    return value;
  };
  componentDidMount = async () => {
    Geolocation.getCurrentPosition(info => {
      console.log(this.state.currentLocate);
    });
    db.auth().onAuthStateChanged(user => {
      if (user) {
        setTimeout(() => {
          this.props.navigation.navigate('Home');
        }, 2500);
      } else {
        setTimeout(() => {
          this.props.navigation.navigate('Login');
        }, 2500);
      }
    });
    // if (this.props.dataUser) {
    //   if (
    //     this.props.dataUser.uid === '' ||
    //     this.props.dataUser.uid === null ||
    //     this.props.dataUser.uid === undefined
    //   ) {
    //     //   await this.getData();
    //     this.setState({login: false});
    //     setTimeout(() => {
    //       this.props.navigation.navigate('Login');
    //     }, 2500);
    //   } else {
    //     setTimeout(async () => {
    //       // await this.getData();
    //       this.setState({login: true});
    //       // if (this.props.isFulfilled === true) {
    //       this.props.navigation.navigate('Home');
    //       // }
    //     }, 5000);
    //   }
    // } else {
    //   this.setState({login: false});
    //   setTimeout(() => {
    //     this.props.navigation.navigate('Login');
    //   }, 2500);
    // }
  };
  render() {
    return (
      <Container style={styles.container}>
        <Image source={require('../../image/logo2.png')} style={styles.image} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {height: 200, width: 200},
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const mapStateToProps = ({reducerUser}) => {
  return {
    dataUser: reducerUser.dataUser,
    isLogin: reducerUser.isLogin
  };
};

export default connect(
  mapStateToProps,
  null,
)(Home);
