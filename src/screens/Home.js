import React, {Component} from 'react';
import UserCard from '../components/UserCard';

import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
} from 'react-native';
import {Spinner, Container, Fab, Item, Input, Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {db} from '../utils/firebaseConfig';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      startpage: 1,
      page: 1,
      limit: 6,
      orderBy: 'asc',
      sortBy: 'id',
      token: '',
      title: '',
      data: [],
      users: [],
      pagination: {},
      role: '',
      id_user: '',
      refreshing: false,
      loading: true,
      refreshToken: '',
      reload: false,
      borrowTemp: [],
      returnTemp: [],
      isNavBarHidden: false,
      loadMore: false,
      upButton: false,
      showbookSlide: true,
    };
    this.onEndReachedCalledDuringMomentum = true;
  }
  getData = async name => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        console.log(value);
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount = () => {
    db.auth().onAuthStateChanged(user => {
      if (user) {
        // const uid =
        //   this.props.route.params.uid !== undefined
        //     ? this.props.route.params.uid
        //     : this.props.dataUser.uid;
        this.getUserData();
        db.database()
          .ref(`Users/${user.uid}`)
          .update({
            status: 'Online',
          })
          .then(() => console.log('background'));
      }
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    this.props.navigation.goBack(null);
  };
  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };
  componentWillUnmount() {
    db.database()
      .ref('Users/')
      .off();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  getUserData = async () => {
    if (this.props.dataUser.uid) {
      await db
        .database()
        .ref('Users/')
        .on('value', snapshot => {
          const currentUserId = db.auth().currentUser.uid;
          console.log(currentUserId);
          // const data = snapshot.val();
          const user = Object.values(snapshot.val());
          console.log(snapshot.val());
          const friendResult = user.filter(
            friendUser =>
              friendUser.uid !== currentUserId && friendUser.uid !== undefined,
          );
          this.setState({
            users: friendResult,
          });
        });
    }
  };
  handlerSearch = async (name, e) => {
    // e.preventDefault()
    if (!e) {
      this.getUserData();
    } else {
      this.setState({[name]: e});
      const dataSearch = this.state.users.filter((data, index) =>
        data.fullName.includes(e),
      );
      this.setState(prevState => {
        return {
          users: dataSearch,
        };
      });
    }
  };
  componentDidUpdate(prevprops, prevState) {
    if (prevprops.dataUser !== this.props.dataUser) {
      this.getUserData();
    }
  }
  render() {
    console.disableYellowBox = true;

    return (
      <>
        {this.state.users.length <= 0 ? (
          <Container style={styles.spinnerStyle}>
            <Spinner color="white" />
          </Container>
        ) : (
          <KeyboardAvoidingView style={styles.container}>
            <View style={styles.container}>
              {/* <Header style={styles.bgColor} searchBar rounded> */}
              {/* <View  > */}
              <Item style={styles.bgColor}>
                <Icon name="ios-search" style={styles.whiteColor} />
                <Input
                  placeholder="Search"
                  placeholderTextColor="white"
                  style={styles.whiteColor}
                  onSubmitEditing={this.handlerChange}
                  onChangeText={e => this.handlerSearch('name', e)}
                />
              </Item>

              <FlatList
                style={styles.flatlistStyle}
                data={this.state.users}
                renderItem={({item}) => (
                  <UserCard
                    data={item}
                    key={item.id}
                    refresh={this.componentDidMount}
                    props={this.props}
                    item={item}
                  />
                )}
                initialNumToRender={10}
                keyExtractor={(item, index) => index.toString()}
                // ListHeaderComponent={this.renderHeader}

                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                  />
                }
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => {
                  // eslint-disable-next-line no-sequences
                  (this.onEndReachedCalledDuringMomentum = false),
                    this.setState({loadMore: false});
                }}
                ref={ref => {
                  this.flatListRef = ref;
                }}
                ListFooterComponent={this._renderFooter}
                onScrollEndDrag={() =>
                  this.setState({upButton: true, showbookSlide: false})
                }
                // onScroll={() => this.setState({showbookSlide: false})}
              />
              {this.state.upButton ? (
                <Fab
                  style={styles.fabGoTop}
                  position="bottomRight"
                  onPress={() => {
                    this.flatListRef.scrollToOffset({
                      animated: true,
                      offset: 0,
                      // eslint-disable-next-line no-sequences
                    }),
                      this.setState({upButton: false, showbookSlide: true});
                  }}>
                  <Icon name="ios-arrow-up" />
                </Fab>
              ) : (
                <></>
              )}
            </View>
          </KeyboardAvoidingView>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadMoreStyle: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingVertical: 20,
    // borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'black',
  },
  flatlistStyle: {backgroundColor: 'black', marginBottom: 10},
  fabGoTop: {backgroundColor: 'black', marginBottom: 60},
  bgColor: {backgroundColor: 'black'},
  whiteColor: {color: 'white'},
  item: {
    backgroundColor: 'black',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  viewFilter: {backgroundColor: 'black', height: 50},
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backButton: {
    marginLeft: 0,
    width: 100,
    position: 'absolute',
    marginTop: 5,
  },
  backIcon: {color: 'white'},
});
const mapStateToProps = ({reducerUser}) => {
  return {
    dataUser: reducerUser.dataUser,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Home);
