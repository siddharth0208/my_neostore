import axios from 'axios';
import {hp, wp} from '../Styles/Style';
import React, {useState} from 'react';
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

export const ResetPassword = () => {
  const [code, setCode] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const handleCode = code => {
    setCode(code);
  };
  const handlePassword = newpassword => {
    setNewpassword(newpassword);
  };
  const handlecPassword = cpassword => {
    setCpassword(cpassword);
  };

  const Reset = () => {
    console.log('reset');
    if (newpassword == cpassword) {
      axios
        .post('https://nameless-savannah-21991.herokuapp.com/recoverPassword', {
          verificationCode: code,
          password: newpassword,
        })
        .then(function (response) {
          console.log('response', response);
          Alert.alert('password changed successfully');
        })
        .catch(function (error) {
          console.log('error', error);
          Alert.alert('Invalid code ');
        });
    } else {
      Alert.alert('Both password are not same');
    }
  };

  return (
    <ScrollView>
      <Text style={styles.text}>Reset Password</Text>
      <TextInputComponent
        label="Enter code"
        value={code}
        onChangeText={code => {
          handleCode(code);
        }}
      />
      <TextInputComponent
        label="Enter New Password"
        value={newpassword}
        onChangeText={newpassword => {
          handlePassword(newpassword);
        }}
      />
      <TextInputComponent
        label="Confirm New Password"
        value={cpassword}
        onChangeText={cpassword => {
          handlecPassword(cpassword);
        }}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          Reset();
        }}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: hp('20%'),
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
