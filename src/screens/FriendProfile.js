import React, {Component} from 'react';
import {
  Container,
  Button,
  Text,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Item,
  View,
  Header,
  Form,
  Textarea,
} from 'native-base';
import {Image, StyleSheet, BackHandler} from 'react-native';
import EmailIcon from 'react-native-vector-icons/Fontisto';
import {db} from '../utils/firebaseConfig';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      role: '',
      token: '',
      id: '',
      uid: '',
      users: {},
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
  componentDidMount = async () => {
    await this.getStoreData('uid');
    this.getUserData();
    console.log(this.props.route.params);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    this.props.navigation.goBack(null);
  };
  handleBackButton = () => {
    this.onButtonPress();
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  //   componentDidUpdate = prevState => {
  //     if (prevState.uid !== this.state.uid) {
  //       this.getUserData();
  //     }
  //   };

  getUserData = async () => {
    await db
      .database()
      .ref('Users/')
      .on('value', snapshot => {
        const currentUser = db.auth().currentUser.uid;
        // const data = snapshot.val();
        const user = Object.values(snapshot.val());
        const friendResult = user.filter(
          friendUser => friendUser.uid === currentUser,
        );
        this.setState({
          users: friendResult[0],
        });
      });
  };

  render() {
    var user = db.auth().currentUser;
    console.log(user);
    // this.getUserData();
    return (
      <ScrollView>
        <Container style={styles.container}>
          <Header style={{backgroundColor: 'black'}}>
            <Button
              transparent
              iconLeft
              style={styles.backButton}
              onPress={() => this.props.navigation.goBack(null)}>
              <Icon style={styles.backIcon} name="ios-arrow-back" />
            </Button>
            <Text style={styles.title}>Profile</Text>
          </Header>
          <Card transparent style={styles.card}>
            <CardItem transparent style={styles.cardItem1}>
              <Text style={styles.textCardTitle}>
                {this.props.route.params.item.fullName}
              </Text>
              <Image
                style={styles.image}
                source={
                  this.props.route.params.item.image
                    ? {
                        uri: this.props.route.params.item.image,
                      }
                    : require('../../image/photoprofile.png')
                }
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
                    {this.props.route.params.item.email}
                  </Text>
                </Item>
              </Right>
            </CardItem>

            <CardItem transparent style={styles.cardItem2}>
              <Left />
            </CardItem>
            <Form>
              {/* <Text style={{
                  color: 'white',
                  backgroundColor: 'black',
                  marginLeft:30,
                  fontSize:14
                }}>Bio</Text> */}
              <Textarea
                disabled={true}
                rowSpan={2}
                bordered
                placeholder="Textarea"
                defaultValue={this.props.route.params.item.bio}
                style={{
                  color: 'white',
                  backgroundColor: 'black',
                }}
                // color="white"
              />
            </Form>
          </Card>

          <View style={styles.viewMaps}>
            <MapView
              showsUserLocation={true}
              zoomControlEnabled={true}
              style={styles.map}
              initialRegion={{
                latitude: this.props.route.params.item.latitude
                  ? this.props.route.params.item.latitude
                  : -7.983908,
                longitude: this.props.route.params.item.longitude
                  ? this.props.route.params.item.longitude
                  : 112.621391,
                latitudeDelta: 0.1922,
                longitudeDelta: 0.1421,
              }}>
              <Marker
                coordinate={{
                  latitude: this.props.route.params.item.latitude,
                  longitude: this.props.route.params.item.longitude,
                }}
                // pinColor={'purple'} // any color
                title={this.props.route.params.item.fullName}
                description={
                  this.props.route.params.item.fullName + ' is here'
                }>
                <Image
                  source={
                    this.props.route.params.item.image
                      ? {uri: this.props.route.params.item.image}
                      : require('../../image/photoprofile.png')
                  }
                  style={{width: 50, height: 50, borderRadius: 300}}
                />
              </Marker>
            </MapView>
          </View>
        </Container>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},

  // view: {height: '150%'},
  card: {backgroundColor: 'black'},
  imageBackground: {
    height: 270,
    width: null,
    flex: 1,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    padding: 10,
    color: 'white',
    // textAlign: 'left',
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
  textEmail: {marginTop: 30, color: 'white', marginLeft: '10%', width: '100%'},
  textRole: {
    fontSize: 30,
    padding: 10,
    fontStyle: 'italic',
    color: 'black',
    marginLeft: '20%',
  },
  backButton: {
    left: 0,
    width: 50,
    position: 'absolute',
    marginTop: 5,
  },
  view: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewMaps: {
    ...StyleSheet.absoluteFillObject,
    height: '60%',
    flex: 1,
    marginTop: '65%',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  buttonUser: {backgroundColor: 'navy', borderRadius: 5},
  iconUser: {color: 'white', marginLeft: 10},
  white: {color: 'white'},
  black: {color: 'black'},
  buttonLogout: {backgroundColor: 'white', borderRadius: 5},
});

export default FriendProfile;

// export default Login;
