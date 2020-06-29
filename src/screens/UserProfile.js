import React, {Component} from 'react';
import {
  Container,
  Thumbnail,
  Button,
  Text,
  // Icon,
  Card,
  CardItem,
  Left,
  Right,
  Item,
  View,
  Input,
  // Form,
  Spinner,
} from 'native-base';
import Pencil from 'react-native-vector-icons/Feather';
import EmailIcon from 'react-native-vector-icons/Fontisto';
import LockIcon from 'react-native-vector-icons/AntDesign';
import {
  Image,
  Alert,
  // ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import UploadImage from '../components/UploadImage';

import {db} from '../utils/firebaseConfig';
import {connect} from 'react-redux';
import {logoutAction, getDataUserAction} from '../redux/actions/UserAction.js';

import AsyncStorage from '@react-native-community/async-storage';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      role: '',
      token: '',
      id: '',
      uid: '',
      users: {},
      show: false,
      isEdit: false,
      isLoading: false,
      fullName: this.props.dataUser.fullName
        ? this.props.dataUser.fullName
        : '',
    };
  }
  getStoreData = async name => {
    try {
      const value = await AsyncStorage.getItem(`${name}`);

      if (name === 'uid') {
        this.setState({email: value});
      }
      return value;
    } catch (e) {
      // error reading value
    }
  };
  logout = async () => {
    Alert.alert(
      'Confirmation',
      'Are You Sure To Logout ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            db.database()
              .ref(`Users/${this.props.dataUser.uid}`)
              .update({
                status: 'Offline',
              })
              .then(() => {
                this.props.logoutAction();
              })
              .catch(error => console.log(error));

            await AsyncStorage.clear().then(response => {
              db.auth()
                .signOut()
                .then(() => {
                  console.log('logout');
                  this.props.navigation.navigate('Login');
                })
                .catch(function(error) {
                  // An error happened.
                  console.log(error);
                });
              // Alert.alert('Thank You..');
              // this.props.navigation.navigate('Login');
            });
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  componentDidMount = async () => {
    await this.getStoreData('uid');
    // this.getUserData();
  };
  handleEditNameUser = () => {
    this.setState({isLoading: true});
    if (this.state.fullName !== '') {
      db.database()
        .ref('Users/' + this.props.dataUser.uid)
        .update({
          fullName: this.state.fullName,
        })
        .then(() => {
          this.props.getDataUserAction(this.props.dataUser.uid);
          this.setState({isEdit: false, isLoading: false});
          // this.props.navigation.navigate('UserProfile');
        });
    } else {
      this.showToast();
    }
  };
  showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Display Name Cannot Empty',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50,
    );
  };
  handleHide = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    return (
      <Container style={styles.container}>
        <Card transparent style={styles.card}>
          <Text style={styles.title}>Profile</Text>

          <CardItem transparent style={styles.cardItem1}>
            <Input
              disabled={this.state.isEdit ? false : true}
              defaultValue={this.props.dataUser.fullName}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: 20,
                padding: 0,
                color: 'goldenrod',
                textAlign: 'center',
                position: 'absolute',
                top: 0,
                left: 140,
                width: '60%',
                height: 40,
                backgroundColor: this.state.isEdit ? 'white' : 'black',
              }}
              maxLength={16}
              onChangeText={e => {
                this.setState({fullName: e});
              }}
            />
            {this.state.isEdit ? (
              <Text
                note
                style={{
                  color: 'white',
                  position: 'absolute',
                  left: 240,
                  top: 40,
                }}>
                {this.state.fullName.length}/16 characters
              </Text>
            ) : (
              <></>
            )}

            {this.state.isEdit ? (
              <Button
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: 40,
                  backgroundColor: this.state.isLoading ? 'black' : 'orange',
                }}
                onPress={this.handleEditNameUser}>
                {this.state.isLoading ? (
                  <View>
                    <Spinner color="white" />
                  </View>
                ) : (
                  <Text> Ok </Text>
                )}
              </Button>
            ) : (
              <></>
            )}
            {/* <Text style={styles.textCardTitle}>
              {this.props.dataUser.fullName}
            </Text> */}

            {/* <Thumbnail
                source={require('../../image/nasa.png')}
                style={styles.thumbnail}
              /> */}

            {/* <Left style={{top:0,left:0,position:"absolute"}}> */}
            <TouchableOpacity
              onPress={() => {
                this.setState({show: true});
                console.log('ditekan');
              }}>
              <Image
                style={styles.image}
                source={
                  this.props.dataUser.image
                    ? {
                        uri: this.props.dataUser.image,
                      }
                    : require('../../image/photoprofile.png')
                }
              />
            </TouchableOpacity>
            <Pencil
              style={{position: 'absolute', left: 100, top: 90}}
              size={20}
              name="edit"
              color="white"
            />
            {/* </Left> */}
            <Right>
              <Item style={styles.item}>
                <EmailIcon
                  name="email"
                  color="white"
                  size={30}
                  style={{marginTop: 21}}
                />
                <Text style={styles.textEmail}>
                  {' '}
                  {this.props.dataUser.email}{' '}
                </Text>
              </Item>
            </Right>
          </CardItem>
          {/* <Text style={styles.textEmail}> {this.props.dataUser.status} </Text> */}
          <CardItem transparent style={styles.cardItem2}>
            {!this.state.isEdit ? (
              <Left>
                <Button
                  style={styles.buttonUser}
                  onPress={() =>
                    this.setState({
                      isEdit: !this.state.isEdit,
                    })
                  }>
                  <Pencil
                    style={{marginLeft: 10}}
                    size={20}
                    name="edit"
                    color="white"
                  />
                  <Text style={styles.white}>Change Name</Text>
                </Button>
              </Left>
            ) : (
              <></>
            )}

            <Right>
              <Button style={styles.buttonLogout} onPress={this.logout}>
                <Thumbnail small source={require('../../image/logout.png')} />
                <Text style={styles.black}>Logout</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
        <UploadImage show={this.state.show} handleHide={this.handleHide} />
        <View>
          {/* <Footer >
         {this.props.route.params.role==1?
           <FooterMenu role="1"  type="profile"  props={this.props}/>
             :
             <FooterMenu role="2" type="profile"  props={this.props}/>

         }
      </Footer> */}
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},

  view: {height: '150%'},
  card: {backgroundColor: 'black'},
  imageBackground: {
    height: 270,
    width: null,
    flex: 1,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 30,
    padding: 20,
    color: 'white',
    textAlign: 'center',
  },
  cardItem1: {
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  cardItem2: {
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  textCardTitle: {
    fontSize: 20,
    padding: 10,
    color: 'goldenrod',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 130,
  },
  thumbnail: {borderRadius: 60, position: 'absolute', right: 0, top: 0},
  image: {height: 100, width: 100, borderRadius: 100, top: 0, left: 0},
  item: {marginLeft: 60},
  textEmail: {
    marginTop: 30,
    color: 'white',
    marginLeft: '10%',
    width: '100%',
    fontSize: 13,
  },
  textRole: {
    fontSize: 30,
    padding: 10,
    fontStyle: 'italic',
    color: 'black',
    marginLeft: '20%',
  },
  changePasswordStyle: {
    marginLeft: 25,
    marginTop: 20,
    borderColor: 'transparent',
  },
  buttonUser: {backgroundColor: '#ff8c00', borderRadius: 5},
  iconUser: {color: 'white', marginLeft: 10},
  white: {color: 'white'},
  black: {color: 'black'},
  buttonLogout: {backgroundColor: 'white', borderRadius: 5},
});

const mapStateToProps = ({reducerUser}) => {
  return {
    dataUser: reducerUser.dataUser,
  };
};
const mapDispatchToProps = {
  logoutAction,
  getDataUserAction,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);

// export default Login;
