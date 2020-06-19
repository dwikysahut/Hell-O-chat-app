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
  TouchableOpacity,
  TextInput,
  Alert,
  BackHandler,
} from 'react-native';
import {
  Item,
  Input,
  // FooterTab,
  Button,
  Icon,
  Text,
  Header,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Iconsend from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {db} from '../utils/firebaseConfig';
import {database} from 'firebase';

class ChatRoom extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      users: [],
      refreshing: false,
      loading: true,
      refreshToken: '',
      reload: false,
      loadMore: false,
      upButton: false,
      showbookSlide: true,
      messageList: [],
      message: [],
      currentUserId: '',
      textMessage: '',
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

  componentDidMount() {
    this.loadMessage();
    console.log(this.props.route.params.item.uid);
    // eslint-disable-next-line react/no-did-mount-set-state
    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ],
    // });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    // eslint-disable-next-line no-undef
    this.props.navigation.goBack(null);
  };
  handleBackButton = () => {
    this.onButtonPress();
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  loadMessage() {
    db.auth().onAuthStateChanged(user => {
      //   console.log(this.props.route.params.item.uid);
      this.setState({
        currentUserId: user.uid,
        receiverUserId: this.props.route.params.item.uid,
      });
      db.database()
        .ref('messages/')
        .child(`/${user.uid}/`)
        .child(`/${this.state.receiverUserId}/`)
        .on('child_added', value => {
          this.setState(prevState => {
            return {
              messageList: [...prevState.messageList, value.val()],
            };
          });
        });
    });
  }
  getUserData = async () => {
    await db
      .database()
      .ref('Users/')
      .on('value', snapshot => {
        const currentUserId = db.auth().currentUser.uid;
        // const data = snapshot.val();
        const user = Object.values(snapshot.val());
        const friendResult = user.filter(
          friendUser => friendUser.uid !== currentUserId,
        );
        console.log(currentUserId);
        this.setState({
          users: friendResult,
        });
      });
  };
  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      try {
        ('messages/');
        //   console.log('aaaaa');
        let messageId = (await db
          .database()
          .ref('messages/')
          .child(`/${this.state.currentUserId}/`)
          .child(`/${this.state.receiverUserId}/`)
          .push()).key;
        let messageUpdate = {};
        let message = {
          message: this.state.textMessage,
          createdAt: database.ServerValue.TIMESTAMP,
          from: this.state.currentUserId,
          to: this.state.receiverUserId,
        };
        // set database user yang login
        messageUpdate[
          'messages/' +
            this.state.currentUserId +
            '/' +
            this.state.receiverUserId +
            '/' +
            messageId
        ] = message;
        // set ke database lawan chat
        messageUpdate[
          'messages/' +
            this.state.receiverUserId +
            '/' +
            this.state.currentUserId +
            '/' +
            messageId
        ] = message;
        db.database()
          .ref()
          .update(messageUpdate);
        this.setState({textMessage: ''});
        this.setState(previousState => ({
          // messageList: GiftedChat.append(previousState.messageList, messageText),
        }));
        console.log(this.state.messageList);
      } catch (error) {
        console.log({error});
        Alert.alert('Pesan Gagal Terkirim');
      }
    }
  };
  // onSend(messages = []) {
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }));
  //   console.log(this.state.messages);
  // }
  // renderBubble(props) {
  //   return (
  //     <Bubble
  //       {...props}
  //       wrapperStyle={{
  //         right: {
  //           backgroundColor: '#2ED3C6',
  //         },
  //       }}
  //     />
  //   );
  // }
  // renderInputToolbar(props) {
  //   //Add the extra styles via containerStyle
  //   return (
  //     <InputToolbar
  //       {...props}
  //       containerStyle={{
  //         borderTopWidth: 0,
  //         backgroundColor: 'white',
  //         borderRadius: 20,
  //       }}
  //     />
  //   );
  // }
  // renderSend(props) {
  //   return <Send {...props} textStyle={{color: 'orange'}} label={'Send'} />;
  // }
  render() {
    //   console.log(this.props.route.params)

    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor: 'black'}}>
          <Button
            transparent
            iconLeft
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack(null)}>
            <Icon style={styles.backIcon} name="ios-arrow-back" />
          </Button>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(
                'FriendProfile',
                this.props.route.params,
              );
            }}>
            <Text style={{fontSize: 18, color: 'white', marginTop: 15}}>
              {this.props.route.params.item.fullName}
            </Text>
            <Text note style={{fontSize: 10, color: 'white', marginTop: 0}}>
              Tap to see profile
            </Text>
          </TouchableOpacity>
        </Header>
        <FlatList
          ref={ref => (this.flatList = ref)}
          onContentSizeChange={() =>
            this.flatList.scrollToEnd({animated: true})
          }
          onLayout={() => this.flatList.scrollToEnd({animated: true})}
          style={styles.list}
          data={this.state.messageList}
          keyExtractor={item => item.id}
          renderItem={msg => {
            // console.log(item);
            const item = msg.item;
            let itemStyle =
              item.from !== this.state.currentUserId
                ? styles.itemMessageIn
                : styles.itemMessageOut;
            let timeStyle =
              item.from !== this.state.currentUserId
                ? styles.timeMessageIn
                : styles.timeMessageOutBottom;
            return (
              <View style={[styles.item, itemStyle]}>
                <View style={[styles.chatTemplateMessage]}>
                  {/* {item.from === this.state.currentUserId ? (
                    <Text style={styles.timeMessageOut}>
                      {new Date(item.createdAt)
                        .toLocaleTimeString()
                        .substr(0, 5)}
                    </Text>
                  ) : (
                    <></>
                  )} */}

                  <Text
                    style={
                      item.from === this.state.currentUserId
                        ? // eslint-disable-next-line react-native/no-inline-styles
                          {
                            alignSelf: 'flex-start',
                            marginTop: 0,
                            paddingBottom: 10,
                          }
                        : {alignSelf: 'flex-start'}
                    }>
                    {item.message}
                  </Text>
                  {item.from === this.state.currentUserId ? (
                    <Text style={timeStyle}>
                      {new Date().getDate() ===
                      new Date(item.createdAt).getDate()
                        ? 'Today ' +
                          '    ' +
                          new Date(item.createdAt)
                            .toLocaleTimeString()
                            .substr(0, 5)
                        : new Date(item.createdAt).toDateString() +
                          '    ' +
                          new Date(item.createdAt)
                            .toLocaleTimeString()
                            .substr(0, 5)}
                    </Text>
                  ) : (
                    <Text style={timeStyle}>
                      {new Date().getDate() ===
                      new Date(item.createdAt).getDate()
                        ? 'Today '
                        : new Date(item.createdAt).toDateString()}
                    </Text>
                  )}
                </View>
                {item.from === this.state.currentUserId ? (
                  <></>
                ) : (
                  <Text style={timeStyle}>
                    {new Date(item.createdAt).toLocaleTimeString().substr(0, 5)}
                  </Text>
                )}
              </View>
            );
          }}
        />
        <View style={styles.footer}>
          <View style={styles.inputText}>
            <TextInput
              value={this.state.textMessage}
              style={styles.textMessage}
              placeholder="Write message here..."
              onChangeText={text => this.setState({textMessage: text})}
              multiline={true}
            />
          </View>

          <TouchableOpacity style={styles.btnSend} onPress={this.sendMessage}>
            <Iconsend name="md-send" color="orange" size={23} />
          </TouchableOpacity>
        </View>
        {/* <GiftedChat
          messages={this.state.messageList}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          renderSend={this.renderSend}
          onSend={messages => this.sendMessage(messages)}
          user={{
            _id: this.state.currentUserId,
          }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backButton: {
    left: 0,
    width: 50,
    position: 'absolute',
    marginTop: 5,
  },
  timeMessageOut: {
    alignSelf: 'flex-start',
    fontSize: 11,
    marginTop: 0,
    color: '#c9c9c9',
  },
  timeMessageOutBottom: {
    alignSelf: 'flex-end',
    fontSize: 11,
    marginTop: 0,
    color: '#c9c9c9',
  },
  timeMessageIn: {
    alignSelf: 'flex-start',
    fontSize: 11,
    marginTop: 4,
    // marginLeft:100,
    color: 'white',
  },
  dateMessageIn: {
    fontSize: 9,
    alignSelf: 'flex-start',
    marginTop: 0,
    color: 'white',
    marginLeft: 20,
  },
  dateMessageOut: {
    fontSize: 9,
    alignSelf: 'flex-start',
    marginTop: 0,
    color: '#c9c9c9',
  },
  btnSend: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'black',
    // paddingHorizontal: 10,
    padding: 5,
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputText: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  textMessage: {
    height: 50,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    paddingRight: 15,
  },
  chatTemplateMessage: {
    maxWidth: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemMessageIn: {
    alignSelf: 'flex-start',
    paddingLeft: 0,
    paddingRight: 10,
    backgroundColor: 'orange',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 20,
  },
  itemMessageOut: {
    alignSelf: 'flex-end',
    paddingLeft: 10,
    paddingRight: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 0,
    fontSize: 2,
    color: '#000',
  },
  item: {
    marginVertical: 8,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 3,
  },
});

export default ChatRoom;
