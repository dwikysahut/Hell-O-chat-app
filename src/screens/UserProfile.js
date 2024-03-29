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
  Form,
  Textarea,
  Spinner,
} from 'native-base';
import Pencil from 'react-native-vector-icons/Feather';
import EmailIcon from 'react-native-vector-icons/Fontisto';
// import LockIcon from 'react-native-vector-icons/AntDesign';
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
import {color} from 'react-native-reanimated';
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
      isLoadingLogout: false,
      fullName: this.props.dataUser.fullName
        ? this.props.dataUser.fullName
        : '',
      bio: this.props.dataUser.bio ? this.props.dataUser.bio : '',
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
            this.setState({isLoadingLogout: true});
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
                  this.setState({isLoadingLogout: false});
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
    if (this.state.fullName !== '') {
      this.setState({isLoading: true});
      db.database()
        .ref('Users/' + this.props.dataUser.uid)
        .update({
          fullName: this.state.fullName,
          bio: this.state.bio,
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
              <Text note style={styles.inputEdit}>
                {this.state.fullName.length}/16 characters
              </Text>
            ) : (
              <></>
            )}

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
          <Form>
            <Textarea
              disabled={this.state.isEdit ? false : true}
              rowSpan={4}
              maxLength={32}
              bordered
              placeholder="Textarea"
              defaultValue={
                this.props.dataUser.bio
                  ? this.props.dataUser.bio
                  : 'hello nice to meet you'
              }
              style={{
                color: this.state.isEdit ? 'black' : 'white',
                backgroundColor: this.state.isEdit ? 'white' : 'black',
              }}
              onChangeText={e => {
                this.setState({bio: e});
              }}
              // color="white"
            />
          </Form>
          {this.state.isEdit ? (
            <Text note style={{color: 'white'}}>
              {this.state.bio.length}/32 characters
            </Text>
          ) : (
            <></>
          )}
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
                  <Text style={styles.white}>Change Profile</Text>
                </Button>
              </Left>
            ) : (
              <Left>
                <Button
                  style={
                    this.state.isLoading ? styles.buttonUser : styles.buttonUser
                  }
                  onPress={this.handleEditNameUser}>
                  {this.state.isLoading ? (
                    <View>
                      <Spinner style={{marginLeft: '50%'}} color="white" />
                    </View>
                  ) : (
                    <Text style={{marginLeft: '30%'}}> Save </Text>
                  )}
                </Button>
              </Left>
            )}

            <Right>
              {this.state.isLoadingLogout ? (
                <View>
                  <Spinner color="white" />
                </View>
              ) : (
                <Button style={styles.buttonLogout} onPress={this.logout}>
                  <Thumbnail small source={require('../../image/logout.png')} />
                  <Text style={styles.black}>Logout</Text>
                </Button>
              )}
            </Right>
          </CardItem>
        </Card>
        <UploadImage show={this.state.show} handleHide={this.handleHide} />
        <View />
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
  inputEdit: {
    color: 'white',
    position: 'absolute',
    left: 240,
    top: 40,
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
  editOkOrange: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 40,
    backgroundColor: 'orange',
  },
  editOkBlack: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 40,
    backgroundColor: 'black',
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
  buttonUser: {
    backgroundColor: '#ff8c00',
    borderRadius: 5,
    width: 180,
    textAlign: 'center',
  },
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
