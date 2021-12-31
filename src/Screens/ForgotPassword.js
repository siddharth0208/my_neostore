import axios from 'axios';
import React, {useState} from 'react';
import {wp, hp} from '../Styles/Style';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {TextInputComponent} from '../Components/TextInputComponent';
import {RadioButtonComponent} from '../Components/RadioButtonComponent';

export const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  var code = [];

  const handleOnChangeText = email => {
    setEmail(email);
  };

  const Forgot = () => {
    console.log('arrive on forgot');

    var emailpattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (emailpattern.test(email) === true) {
      console.log('valid');
      console.log(email);

      axios
        .post('https://nameless-savannah-21991.herokuapp.com/forgotPassword', {
          email: email,
        })
        .then(function (response) {
          console.log('response', response);
          code = response.data.code;
          console.log('code', code);
          navigation.navigate('ResetPassword');
        })
        .catch(function (error) {
          console.log('error', error);
        });
    } else {
      console.log('not valid');
      console.warn('invalid input');
    }
  };

  return (
    <ScrollView>
      <Text style={styles.text}>Fogot Password ?</Text>
      <TextInputComponent
        label="Email"
        value={email}
        onChangeText={email => {
          handleOnChangeText(email);
        }}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          Forgot();
        }}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: hp('30%'),
    color: 'black',
    fontSize: wp('8%'),

    alignSelf: 'center',
    fontWeight: 'normal',
  },
  buttonContainer: {
    marginTop: hp('2%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('80%'),
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
