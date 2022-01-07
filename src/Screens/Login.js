import axios from 'axios';
import {wp, hp} from '../Styles/Style';
import React, {useState} from 'react';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {userLogInAction} from '../Redux/Auth folder/AuthAction';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {TextInputComponent} from '../Components/TextInputComponent';
import {RadioButtonComponent} from '../Components/RadioButtonComponent';
import {NavigationContainer} from '@react-navigation/native';
import {ForgotPassword} from './ForgotPassword';
import {color} from 'react-native-reanimated';
import {SplashScreen} from './OrderConfirm';
import {errorHandling} from '../utils/ErrorHandling';

export const Login = ({navigation}) => {
  const authSelector = useSelector(state => state);
  console.log('arrive on Login Screen');
  const authDispatch = useDispatch();
  const [text, settext] = useState({
    email: '',
    password: '',
  });

  const {email, password} = text;

  const handleOnChangeText = (value, fieldName) => {
    settext({...text, [fieldName]: value});
  };

  const onLogin = () => {
    console.log('arrive on Login fucnction');

    var emailpattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (emailpattern.test(text.email) === true) {
      console.log('valid');

      axios
        .post('https://nameless-savannah-21991.herokuapp.com/login', {
          email: text.email,
          password: text.password,
        })
        .then(function (response) {
          console.log('Login response', response);
          console.log('success');
          var result = response.data;
          const {message, userId, token} = result;
          result = {...result, isLogIn: true, userEmail: text.email};

          authDispatch(userLogInAction(result));
          console.log('dispatch success');
        })
        .catch(function (error) {
          errorHandling(error);
        });
    } else {
      console.warn('invalid input');
    }
  };

  return (
    <ScrollView>
      <Text style={styles.text}>NeoStore</Text>
      <TextInputComponent
        label="Username"
        value={email}
        onChangeText={value => {
          handleOnChangeText(value, 'email');
        }}
        helperText="yes"
      />

      <TextInputComponent
        label="Password"
        value={password}
        onChangeText={value => {
          handleOnChangeText(value, 'password');
        }}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          onLogin();
        }}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ForgotPassword);
        }}>
        <Text
          style={{
            fontSize: wp('4%'),
            color: 'black',
            alignSelf: 'center',
            marginTop: hp('1.5%'),
            marginLeft: 20,
            position: 'relative',
          }}>
          Forgot Password ?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text
          style={{
            fontSize: wp('4%'),
            color: 'black',
            alignSelf: 'center',
            marginTop: hp('2%'),
            marginLeft: 20,
          }}>
          Don't have an account ? Sign Up
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: hp('6%'),
    color: 'darkred',
    fontSize: wp('12%'),

    alignSelf: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: hp('2%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('70%'),
    backgroundColor: 'dodgerblue',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: wp('4%'),
    color: '#dddddd',
    textAlign: 'center',
    fontFamily: 'Spartan-Bold',
  },
});
