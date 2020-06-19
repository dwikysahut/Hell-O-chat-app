import React, {Component} from 'react';
// import FooterMenu from '../components/FooterMenu';
// import { getAllBooks } from '../utils/http'
import UserCard from '../components/UserCard';

import {
  // SafeAreaView,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  // TouchableNativeFeedbackBase,
  // InteractionManager,
  KeyboardAvoidingView,
  ImageBackground,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Spinner,
  Container,
  // Left,
  // Body,
  // Title,
  // Right,
  // Segment,
  // Picker,
  Fab,
  // Header,
  Item,
  // Content,
  // Footer,
  Input,
  // FooterTab,
  Button,
  Icon,
  Text,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

// import Filter from '../components/Filter';

// import {Form} from 'react-redux'
import {connect} from 'react-redux';

// import '../styles/Home.css'
// const qs = require('querystring')
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
    this.getUserData();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    // eslint-disable-next-line no-undef
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
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  getUserData = async () => {
    await db
      .database()
      .ref('Users/')
      .on('value', snapshot => {
        const currentUser = db.auth().currentUser.uid;
        console.log(currentUser);
        // const data = snapshot.val();
        const user = Object.values(snapshot.val());
        const friendResult = user.filter(
          friendUser => friendUser.uid !== currentUser,
        );
        this.setState({
          users: friendResult,
        });
      });
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
    //INI DI UNCOMMENT KLO MAU FETCH ULANG SEHABIS BORROW ATAU RETURN
    // if(prevprops.borrowTemp.length!= this.props.borrowTemp.length){
    //   this.getData()
    //   // this.componentDidMount()
    // }
    if (prevprops.dataUser !== this.props.dataUser) {
      this.getUserData();
    }
  }
  //   handleScroll = () => {
  //     this.setState({isNavBarHidden: true});
  //   };

  //   _listViewOffset = 0;
  //   getToken = async () => {
  //     const value = await AsyncStorage.getItem('token');

  //     // console.log(value);
  //     await this.setState({token: value});
  //   };
  //   getRole = async () => {
  //     const value = await AsyncStorage.getItem('role');
  //     if (value !== null) {
  //       // console.log(value);
  //       await this.setState({role: value});
  //     }
  //   };
  //   getIdUser = async () => {
  //     const value = await AsyncStorage.getItem('id_user');
  //     if (value !== null) {
  //       // console.log(value);
  //       await this.setState({role: value});
  //     }
  //   };
  //   getStoreData = async name => {
  //     const value = await AsyncStorage.getItem(`${name}`);
  //     // console.log(value)
  //     this.setState({name: value});
  //     return value;
  //   };
  //   refreshToken = async () => {
  //     const {refreshToken} = this.state;
  //     await this.props.refreshTokenAction({refreshToken});
  //     this.props.navigation.navigate('Home');
  //   };

  //   handlerChange = async (name, e) => {
  //     // if(this.state.title=""){
  //     //   this.getData()
  //     // }
  //     // e.preventDefault()
  //     this.setState({[name]: e}, () => {
  //       this.getBooks();
  //     });
  //   };
  //   handlerPage = async e => {
  //     this.setState({page: e.target.id}, () => {
  //       this.getBooks();
  //     });
  //   };
  //   handlerNextPage = e => {
  //     let currentPage = this.state.page;
  //     currentPage++;
  //     if (currentPage > this.props.pagination.totalPage) {
  //       currentPage = this.props.pagination.totalPage;
  //       this.props.pagination.next_page = this.props.pagination.totalPage;
  //       return false;
  //     }
  //     if (this.props.pagination.totalPage === 1) {
  //       currentPage = this.props.pagination.totalPage;
  //     } else {
  //       this.setState({page: this.props.pagination.next_page}, () => {
  //         this.getBooks();
  //       });
  //     }
  //   };
  //   handlerLastPage = () => {
  //     this.setState({page: this.props.pagination.totalPage}, () => {
  //       this.getBooks();
  //     });
  //   };
  //   handlerStartPage = () => {
  //     this.setState({page: 1}, () => {
  //       this.getBooks();
  //     });
  //   };
  //   handlerPrevPage = async e => {
  //     let currentPage = this.state.page;
  //     currentPage--;
  //     if (currentPage < 1) {
  //       currentPage = this.props.pagination.startpage;
  //     } else {
  //       this.setState(
  //         {[e.target.name]: e.target.value, page: currentPage},
  //         () => {
  //           this.getBooks();
  //         },
  //       );
  //     }
  //   };

  //   getBooks = async () => {
  //     await this.getToken();
  //     console.log('sss ' + this.state.token);
  //     const {page, limit, orderBy, sortBy, title} = this.state;
  //     const pageQuery = {
  //       page: page,
  //       limit: limit,
  //       orderBy: orderBy,
  //       sortBy: sortBy,
  //       title: title,
  //     };

  //     // console.log(this.props.isFulfilled)
  //     await this.props.getAllBooksAction(this.state.token, pageQuery);
  //     this.setState({loading: false});
  //     this.setState({refreshing: false});
  //     //  await this.setState({data: [...this.state.data,...this.props.data]})
  //   };
  //   getDataGenre = async () => {
  //     await this.props.getGenreAction(
  //       this.props.token ? this.props.token : this.state.token,
  //     );
  //   };
  //   getDataBorrowUser = async () => {
  //     // eslint-disable-next-line eqeqeq
  //     if ((this.props.role ? this.props.role : this.state.role) == 1) {
  //       await this.props.getAllBorrowAction(
  //         this.props.token ? this.props.token : this.state.token,
  //       );
  //     } else {
  //       await this.props.getUserBorrowAction(
  //         this.props.token ? this.props.token : this.state.token,
  //       );
  //     }
  //     this.setState({refreshing: false});
  //   };
  //   getDataAuthor = async () => {
  //     await this.props.getAuthorAction(
  //       this.props.token ? this.props.token : this.state.token,
  //     );
  //   };
  //   getDataUser = async () => {
  //     await this.props.getUserAction(
  //       this.props.token ? this.props.token : this.state.token,
  //     );
  //   };

  //   componentDidMount = async () => {
  //     if (this.state.borrowTemp !== this.props.borrowTemp) {
  //       this.setState({borrowTemp: this.props.borrowTemp});
  //       await this.getBooks();
  //     }
  //     if (
  //       (await this.getStoreData('token')) === '' ||
  //       (await this.getStoreData('token')) === null
  //     ) {
  //       Alert.alert('please login');
  //       this.props.navigation.navigate('Login');
  //     }
  //     console.disableYellowBox = true;
  //     // this.setState({ isUpdate: false },
  //     //   () => { this.getData() }
  //     // )
  //     if (this.props.data.length <= 0) {
  //       await this.getBooks();
  //     }
  //     // await this.getData()

  //     await this.getToken();
  //     await this.getIdUser();

  //     await this.getRole();
  //     await this.getStoreData('refreshToken');

  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  //     // eslint-disable-next-line eqeqeq
  //     if ((this.props.role ? this.props.role : this.state.role) == '1') {
  //       if (this.props.dataAuthor.length <= 0) {
  //         this.getDataAuthor();
  //       }

  //       this.getDataUser();

  //       if (this.props.dataGenre.length <= 0) {
  //         this.getDataGenre();
  //       }
  //     }

  //     this.getDataBorrowUser();
  //   };
  //   componentDidUpdate(prevprops, prevState) {
  //     //INI DI UNCOMMENT KLO MAU FETCH ULANG SEHABIS BORROW ATAU RETURN
  //     // if(prevprops.borrowTemp.length!= this.props.borrowTemp.length){
  //     //   this.getData()
  //     //   // this.componentDidMount()
  //     // }
  //     if (prevprops.role !== this.props.role) {
  //       this.getDataBorrowUser();
  //     }

  //     if (prevprops.returnTemp.length !== this.props.returnTemp.length) {
  //       this.getBooks();
  //       // this.componentDidMount()
  //     }
  //   }
  //   goToTop = () => {
  //     this.scroll.scrollTo({x: 0, y: 0, animated: true});
  //   };
  //   // renderHeader = () => {
  //   //   return (
  //   //     // <Header style={{backgroundColor:'darklategrey'}} searchBar rounded>
  //   //     <>
  //   //       <Filter
  //   //         // eslint-disable-next-line no-undef
  //   //         style={navbarStyle}
  //   //         orderBy={this.state.orderBy}
  //   //         sortBy={this.state.sortBy}
  //   //         handleOrder={e => this.handlerChange('orderBy', e)}
  //   //         handleSort={e => this.handlerChange('sortBy', e)}
  //   //       />
  //   //     </>
  //   //   );
  //   // };
  //   handleRefresh = () => {
  //     this.setState({refreshing: true, page: 1, limit: 6}, () => {
  //       this.getBooks();
  //     });
  //   };
  //   handleRefreshBorrow = () => {
  //     this.setState({refreshing: true}, () => {
  //       this.getDataBorrowUser();
  //       this.getBooks();
  //     });
  //   };
  //   handleLoadMore = () => {
  //     if (!this.onEndReachedCalledDuringMomentum) {
  //       this.setState(
  //         {page: 1, limit: this.state.limit + 3, loadMore: true},
  //         () => {
  //           this.getBooks();
  //         },
  //       );

  //       this.onEndReachedCalledDuringMomentum = true;
  //     }
  //     // console.warn('handleload')
  //   };

  //   onButtonPress = () => {
  //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  //     // then navigate
  //     // eslint-disable-next-line no-undef
  //     navigate('NewScreen');
  //   };

  //   handleBackButton = () => {
  //     Alert.alert(
  //       'Exit App',
  //       'Exiting the application?',
  //       [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'OK',
  //           onPress: () => BackHandler.exitApp(),
  //         },
  //       ],
  //       {
  //         cancelable: false,
  //       },
  //     );
  //     return true;
  //   };
  //   componentWillUnmount() {
  //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  //   }
  render() {
    // const navbarStyle = this.state.isNavBarHidden ? {height: 0} : {};
    console.disableYellowBox = true;
    // this.componentDidMount()
    // if(this.props.isRejected===true){
    //   this.refreshToken()
    // }

    return (
      <>
        {/* {this.props.data.length <= 0 && this.props.isLoading === true ? ( */}
        {/* <Container style={styles.spinnerStyle}>
          <Spinner color="darkcyan" />
        </Container> */}
        {/* ) : ( */}
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
                onChangeText={e => this.handlerSearch('title', e)}
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
          {/* {this.state.loadMore ? (
                // <View style={styles.spinnerStyle}  >
                <Spinner color="darkcyan" />
              ) : (
                <></>
              )} */}
        </KeyboardAvoidingView>
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
    backgroundColor: 'white',
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
