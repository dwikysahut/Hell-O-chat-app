// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Dimensions,
// } from 'react-native';
// import {db} from '../utils/firebaseConfig';

// const Coba = () => {
//   const [item, setItem] = useState('');
//   const [arrItem, setArrItem] = useState([]);

//   const listItem = db.database().ref('/user');

//   useEffect(() => {
//     db.database()
//       .ref('/user')
//       .on('value', snapshot => {
//         let data = snapshot.val();
//         let items = Object.values(data);
//         //   console.log(items);
//         setArrItem(items);
//       });
//   }, []);

//   const handleInput = input => {
//     setItem(input);
//   };
//   const addItem = newItem => {
//     //root firebase db live-camp
//     listItem.push({
//       id: newItem,
//     });
//     // listItem.remove().then(function(){
//     //   console.log('sucess');
//     // });
//   };
//   const handleAdd = () => {
//     addItem(item);
//     setItem('');
//   };
//   return (
//     <View style={styles.container}>
//       <KeyboardAvoidingView style={styles.content}>
//         <Text style={styles.textOne}>Add Item</Text>
//         <TextInput
//           style={styles.input}
//           onChangeText={handleInput}
//           value={item}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleAdd}>
//           <Text style={styles.textOne}>Add</Text>
//         </TouchableOpacity>
//         <Text style={styles.textOne}>List Item</Text>
//         {arrItem.length > 0 ? (
//           arrItem.map((data, index) => (
//             <Text style={styles.textTwo} key={index}>
//               {data.id}
//             </Text>
//           ))
//         ) : (
//           <Text style={styles.textOne}>Data Kosong</Text>
//         )}
//       </KeyboardAvoidingView>
//     </View>
//   );
// };
// const {height} = Dimensions.get('window');
// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 2,
//     backgroundColor: 'white',
//     borderColor: 'black',
//     fontSize: 30,
//   },
//   textOne: {
//     fontSize: 40,
//     textAlign: 'center',
//   },
//   button: {
//     borderWidth: 2,
//   },
//   container: {
//     flex: 1,
//   },
//   content: {
//     height,
//     flex: 1,
//     justifyContent: 'space-evenly',
//   },
//   textTwo: {
//     fontSize: 25,
//     textAlign: 'left',
//   },
// });

// export default Coba;
