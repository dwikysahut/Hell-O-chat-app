import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'black',

    alignItems: 'center',

    justifyContent: 'center',
    //  marginLeft:100
  },
  title: {
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    // position: 'absolute',
    // top: '20%',
    marginBottom: 30,
    color: 'white',
  },
  logo: {
    fontWeight: 'bold',

    fontSize: 40,

    color: 'honeydew',

    marginBottom: 40,
    fontStyle: 'italic',

    // marginTop:100,
  },
  inputView: {
    width: '80%',

    backgroundColor: 'rgba(52, 52, 52, 0.7)',

    borderRadius: 25,

    height: 50,

    marginTop: 20,
    // paddingBottom:20,
    // marginTop:60,
    justifyContent: 'center',

    padding: 20,
  },
  inputText: {
    height: 50,

    color: 'white',
  },
  backToLogin: {
    marginTop: 40,
    borderColor: 'transparent',
  },

  loginBtn: {
    width: '80%',

    backgroundColor: 'white',

    borderRadius: 25,

    height: 50,

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 20,

    marginBottom: 10,
  },
  loginText: {
    color: 'black',
    fontWeight: 'bold',
  },
  registerText: {
    height: 50,
    color: 'orange',
    fontWeight: 'bold',
  },
  forgotText: {
    height: 50,
    color: 'gold',
    fontWeight: 'bold',
  },
  yellowColor: {color: 'yellow', fontSize: 10},
  redColor: {color: 'red'},
  greenColor: {color: 'green'},
  hint: {marginLeft: 0, borderColor: 'black'},
});
export default styles;
