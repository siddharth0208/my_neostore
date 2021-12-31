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
import {Appbar} from 'react-native-paper';
import {RadioButton} from 'react-native-paper';
import {TextInputComponent} from '../Components/TextInputComponent';
import {RadioButtonComponent} from '../Components/RadioButtonComponent';
import {useSelector} from 'react-redux';

export const ChangePassword = ({navigation}) => {
  const authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  console.log('token for cjange', token);

  const [oldPassword, setoldPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const currentPassword = oldPassword => {
    setoldPassword(oldPassword);
  };
  const handlePassword = newpassword => {
    setNewpassword(newpassword);
  };
  const handlecPassword = cpassword => {
    setCpassword(cpassword);
  };
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  const Reset = () => {
    console.log('reset');
    if (newpassword == cpassword) {
      axios
        .post(
          'https://nameless-savannah-21991.herokuapp.com/changePassword',
          {
            currentPassword: oldPassword,
            newPassword: newpassword,
          },

          config,
        )
        .then(function (response) {
          console.log('response from Change Pass', response);
          Alert.alert('password changed successfully');
        })
        .catch(function (error) {
          console.log('error', error);
          Alert.alert('Wrong Current Password');
        });
    } else {
      Alert.alert('Both password are not same');
    }
  };

  return (
    <ScrollView>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('MyAccount');
          }}
        />
        <Appbar.Content style={{alignItems: 'center'}} title="Reset Password" />
      </Appbar.Header>
      <TextInputComponent
        label="Enter Current Password"
        value={oldPassword}
        onChangeText={oldPassword => {
          currentPassword(oldPassword);
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
