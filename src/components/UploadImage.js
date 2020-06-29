import React, {Component} from 'react';
// import React, {Component, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  // KeyboardAvoidingView,
  //   Platform,
} from 'react-native';
// import Pencil from 'react-native-vector-icons/FontAwesome';
import ImageIcon from 'react-native-vector-icons/Entypo';
import {Item, Form, Button, Spinner} from 'native-base';

import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {db} from '../utils/firebaseConfig';
import {getDataUserAction} from '../redux/actions/UserAction';

class UploadImage extends Component {
  state = {
    image: this.props.dataUser.image ? this.props.dataUser.image : '',
    checkErrorImage: false,
    isDone: false,
    data: {},
    author: [],
    genre: [],
    show: false,
    isImage: true,
    isFill: true,
    photo: '',
    active: false,
    isLoading: false,
    displayName: this.props.dataUser.fullName,
  };

  handlerChange = (name, e) => {
    // e.preventDefault()
    if (name === 'title' || name === 'description') {
      if (!e) {
        this.setState({isFill: false});
      }
    }
    if (e) {
      this.setState({isFill: true});
    }
    this.setState({[name]: e});
  };
  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  };
  updateFirebaseUser = url => {
    const uidUser = this.props.dataUser.uid;
    console.log(uidUser);
    db.database()
      .ref('Users/' + uidUser)
      .child('image')
      .set(url)
      .then(() => {
        this.props.getDataUserAction(uidUser);
      });
  };

  handleHide = () => {
    this.setState({
      show: false,
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  openUpload = async () => {
    const options = {
      noData: true,
      skipBackup: true,
      path: 'images',
    };
    ImagePicker.showImagePicker(options, response => {
      // if (!response.uri) {
      //     await    this.setState({ image: this.state.image }, () => { })
      // }

      if (response.fileSize / 1024 / 1024 > 2) {
        this.setState({isImage: false});
        this.setState({image: this.state.image});
        Alert.alert("Image can't more than 2 mb,Image will not saved");
        this.handleHide();
        return false;
      }
      if (response.uri) {
        let source = {
          name: 'image.jpg',
          size: response.fileSize,
          type: 'image/jpeg',
          uri: response.uri,
        };
        // this.setState({photo: response});
        console.log('asssss = ', response);
        //  const source = { uri: 'data:image/jpeg;base64,' + response.data};

        this.setState({
          image: source,
          checkErrorImage: false,
          isImage: true,
        });
      }
    });
  };
  handlerSubmit = async e => {
    this.setState({isLoading: true});
    // const {image} = this.state;
    const fileImage = await this.uriToBlob(this.state.image.uri);
    db.storage()
      .ref(`image/${this.props.dataUser.uid}.jpg`)
      .put(fileImage)
      .then(async () => {
        //mendapatkan image download url
        const imageUrl = await db
          .storage()
          .ref(`image/${this.props.dataUser.uid}.jpg`)
          .getDownloadURL();

        const uidUser = this.props.dataUser.uid;
        console.log(uidUser);
        //update ke fireabse Users dengan uid yang sesuai
        db.database()
          .ref('Users/' + uidUser)
          .child('image')
          .set(imageUrl)
          .then(() => {
            this.props.getDataUserAction(uidUser);
            this.setState({isLoading: false});
          });
        // this.updateFirebaseUser(imageUrl);
        this.props.handleHide();
      });

    // console.log(this.props)
    //   console.log({error});
  };

  componentDidMount = async () => {};

  render() {
    const {image} = this.state;

    //   const [modalVisible, setModalVisible] = useState(false);
    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.show}
          onRequestClose={() => {
            this.setState({show: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textTitle}>Change Image</Text>

              <Form>
                <Item stackedLabel>
                  {/* {/* <View> */}
                  {image.uri ? (
                    // <Text>{image}</Text>
                    <Image source={{uri: image.uri}} style={styles.image} />
                  ) : (
                    <Text>No Image Choosen</Text>
                  )}
                </Item>

                <Button
                  bordered
                  style={styles.buttonImage}
                  onPress={this.openUpload}>
                  <Text>Choose</Text>
                  <ImageIcon size={25} name="folder-images" color="black" />
                </Button>
              </Form>
              {this.state.isLoading ? (
                <View>
                  <Spinner color="black" />
                </View>
              ) : (
                <TouchableHighlight
                  style={styles.touchableStyle}
                  onPress={e => this.handlerSubmit(e)}>
                  <Text style={styles.textChange}>Change</Text>
                </TouchableHighlight>
              )}
              <TouchableHighlight
                style={{marginTop: 20}}
                onPress={e => this.props.handleHide()}>
                <Text style={styles.textChange}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}
const styles = StyleSheet.create({
  content: {width: 300},
  titleEdit: {fontSize: 40},
  labelImage: {marginBottom: 10},
  image: {width: 100, height: 100},
  buttonImage: {
    marginLeft: 20,
    width: 95,
    height: 20,
    backgroundColor: 'white',
  },
  buttonUser: {backgroundColor: 'navy', borderRadius: 5, marginLeft: 50},
  pickerWidth: {width: 120},
  editButton: {
    backgroundColor: 'deeppink',
    padding: 10,
    elevation: 2,
    marginTop: 10,
    // marginLeft: '70%',
    // backgroundColor: '#2196F3',
  },
  editTextButton: {
    elevation: 2,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
  },
  cancelButton: {
    padding: 10,
    elevation: 2,
    marginLeft: '70%',
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 35,
    right: 35,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  touchableStyle: {
    backgroundColor: 'orange',
    padding: 10,
    elevation: 2,
    marginTop: 20,
    // marginLeft: '70%',
    // backgroundColor: '#2196F3',
  },
  textTitle: {
    marginBottom: 20,
    fontSize: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: 'grey',

    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textChange: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const mapStateToProps = ({reducerUser}) => {
  return {
    dataUser: reducerUser.dataUser,
  };
};
const mapDispatchToProps = {
  getDataUserAction,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadImage);
