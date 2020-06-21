import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {db} from '../utils/firebaseConfig';
import {connect} from 'react-redux';

class Maps extends Component {
  state = {
    userList: [],
    marker: '',
    arrMarker: [
      {latitude: -7.804129066590957, longitude: 108.33803169429302},
      {latitude: -6.804129066590957, longitude: 107.33803169429302},
    ],
  };
  componentDidMount = () => {
    db.database()
      .ref('Users/')
      .on('value', snapshot => {
        // const currentUserId = db.auth().currentUser.uid;
        const allUser = Object.values(snapshot.val());
        this.setState({
          userList: allUser,
        });
      });
  };
  render() {
    // const [marker, setMarker] = useState(null);
    const userMarker = this.state.userList.map(data => (
      // console.log(data);
      // if (data.latitude && data.longitude){
      // console.log(data.longitude);
      <Marker
        coordinate={{latitude: data.latitude, longitude: data.longitude}}
        // pinColor={'purple'} // any color
        title={data.uid === this.props.dataUser.uid ? 'Me' : data.fullName}
        description={'Hi.. I am Here'}>
        <Image
          source={
            data.image
              ? {uri: data.image}
              : require('../../image/photoprofile.png')
          }
          style={{width: 50, height: 50, borderRadius: 300}}
        />
      </Marker>
    ));

    // console.log(marker);
    return (
      <View style={styles.view}>
        <MapView
          showsUserLocation={true}
          zoomControlEnabled={true}
          style={styles.map}
          initialRegion={{
            latitude: this.props.dataUser.latitude
              ? this.props.dataUser.latitude
              : -7.983908,
            longitude: this.props.dataUser.longitude
              ? this.props.dataUser.longitude
              : 112.621391,
            latitudeDelta: 0.1922,
            longitudeDelta: 0.1421,
          }}>
          {userMarker}
          {/* <Marker
            coordinate={{latitude: -7.983908, longitude: 112.621391}}
            pinColor={'purple'} // any color
            title={'sdsad'}
            description={'Iam Here'}
          /> */}
        </MapView>
      </View>
    );
  }
}

// const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  view: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = ({reducerUser}) => {
  return {
    dataUser: reducerUser.dataUser,
  };
};

export default connect(mapStateToProps)(Maps);
