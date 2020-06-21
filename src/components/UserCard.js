import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

import {Card, CardItem, Text, Button, Left, Body} from 'native-base';
// import {REACT_APP_API} from 'react-native-dotenv';
function UserCard({data, refresh, navigation, props, item}) {
  // const URL_BASE = 'http://10.0.2.2:8080';
  //   const URL_BASE = REACT_APP_API;
  return (
    <Card style={styles.container}>
      <CardItem style={styles.whiteBackground}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('FriendProfile', {
              item,
            });
          }}
          style={styles.whiteBackground}>
          <Left>
            <CardItem cardBody style={styles.cardItem}>
              <Image
                source={
                  data.image
                    ? {uri: data.image}
                    : require('../../image/photoprofile.png')
                }
                style={styles.image}
              />
            </CardItem>
          </Left>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ChatRoom', {
              item,
            });
          }}
          style={styles.whiteBackground}>
          <Body style={styles.body}>
            <Text style={styles.text}>{data.fullName}</Text>
            <Button disabled style={styles.buttonGenre}>
              <Text style={styles.textGenre}>{data.email}</Text>
            </Button>
            <Body />

            {/* <Text note style={styles.textDate}>
              {new Date(data.date_added).toDateString()}
            </Text> */}

            {/* <Button  iconLeft transparent  light style={{marginLeft:45}}>
               <Icon name='cart' style={{color:"black"}}/>
                {data.status==="Unavailable"?
              <Text style={{color:"red"}}>{data.status}</Text>:
               <Text  style={{color:"black"}}>{data.status}</Text>

                }
                </Button> */}
          </Body>
        </TouchableOpacity>
      </CardItem>
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    marginBottom: 10,
    borderBottomWidth: 0,
  },
  whiteBackground: {backgroundColor: 'black'},

  image: {height: 70, width: 70, borderRadius: 100, top: 0, left: 0},
  cardItem: {backgroundColor: 'black', width: 100},
  textGenre: {fontSize: 10, alignItems: 'flex-end'},
  body: {paddingLeft: 0},
  text: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  textDate: {textAlign: 'right', fontStyle: 'italic'},
  item: {
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonGenre: {
    backgroundColor: 'black',
    borderRadius: 25,
    height: 30,
    marginLeft: '30%',
    paddingRight: 10,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  title: {
    fontSize: 32,
  },
});
export default UserCard;
