import {tsExpressionWithTypeArguments} from '@babel/types';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
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
import {hp, wp} from '../Styles/Style';

import {RadioButtonComponent} from '../Components/RadioButtonComponent';
import {errorHandling} from '../utils/ErrorHandling';

export const SignUp = ({navigation}) => {
  const [text, settext] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [check, setCheck] = useState('second');
  const [gender, setgender] = useState('male');
  const [reload, setreload] = useState(true);
  const [profileImage, setprofileImage] = useState({});
  useEffect(() => {
    setreload(!reload);
  }, []);

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setprofileImage(image);
    });
    /* this.setState({chhoseFile: 'chhoose'}); */
  };

  const {firstName, lastName, email, phoneNumber, password, confirmPassword} =
    text;

  const handleOnChangeText = (value, fieldName) => {
    settext({...text, [fieldName]: value});
  };

  const onRegister = () => {
    console.log('arrive on register');

    var emailpattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var fNamePattern = /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/;
    var lNamePattern = /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/;
    if (
      emailpattern.test(text.email) === true &&
      fNamePattern.test(text.firstName) &&
      lNamePattern.test(text.lastName) &&
      text.phoneNumber != '' &&
      text.password != '' &&
      text.confirmPassword != '' &&
      text.password == text.confirmPassword
    ) {
      console.log('valid');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8;',
        },
      };
      const imageData = new FormData();
      imageData.append('firstName', text.firstName);
      imageData.append('secondName', text.lastName);

      imageData.append('profile-pic', {
        uri: profileImage.path,
        type: profileImage.mime,
        name: 'image.jpg',
        filename: '5quhhz.jpg',
      });

      imageData.append('contactNo', text.phoneNumber);
      imageData.append('email', text.email);
      imageData.append('password', text.password);
      imageData.append('gender', gender);

      axios
        .post(
          'https://nameless-savannah-21991.herokuapp.com/register',
          imageData,
          config,
        )
        .then(function (response) {
          console.log('response of Register', response);
          console.log('success');
          navigation.navigate('Login');
          Alert.alert('registred');
        })
        .catch(function (error) {
          console.log('error', error);
          errorHandling(error);
        });
    } else {
      console.log('not valid');
      console.warn('invalid input');
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Text style={styles.text}>NeoStore</Text>
      <TextInputComponent
        label="First Name"
        value={firstName}
        onChangeText={value => {
          handleOnChangeText(value, 'firstName');
        }}
      />

      <TextInputComponent
        label="Last Name"
        value={lastName}
        onChangeText={value => {
          handleOnChangeText(value, 'lastName');
        }}
      />

      <TextInputComponent
        label="Email"
        value={email}
        onChangeText={value => {
          handleOnChangeText(value, 'email');
        }}
      />

      <TextInputComponent
        label="Phone number"
        value={phoneNumber}
        onChangeText={value => {
          handleOnChangeText(value, 'phoneNumber');
        }}
      />

      <TextInputComponent
        label="Password"
        value={password}
        onChangeText={value => {
          handleOnChangeText(value, 'password');
        }}
      />

      <TextInputComponent
        label=" Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={value => {
          handleOnChangeText(value, 'confirmPassword');
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: wp('15%'),
          marginTop: hp('1.5%'),
        }}>
        <Text
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: 'black',
            marginTop: hp('0.7'),
          }}>
          Select Gender
        </Text>
        <RadioButton
          value="male"
          status={gender === 'male' ? 'checked' : 'unchecked'}
          onPress={() => setgender('male')}
          style={{display: 'flex', flexDirection: 'column'}}
        />
        <Text
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: 'black',
            marginTop: hp('0.7%'),
          }}>
          Male
        </Text>
        <RadioButton
          value="female"
          status={gender === 'female' ? 'checked' : 'unchecked'}
          onPress={() => setgender('female')}
          style={{display: 'flex', flexDirection: 'column'}}
        />
        <Text
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: 'black',
            marginTop: hp('0.7%'),
          }}>
          Female
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: 'grey',
          width: wp('22%'),
          alignSelf: 'center',
          marginTop: hp('1.5%'),
        }}
        onPress={() => {
          selectImage();
        }}>
        <Text style={{color: 'black', textAlign: 'center'}}>Choose File</Text>
      </TouchableOpacity>

      {/*  <RadioButton
        value="first"
        status={check === 'first' ? 'checked' : 'unchecked'}
        onPress={() =>
          check === 'second' ? setCheck('first') : setCheck('second')
        }
      />
      <Text style={{color: 'black'}}>agree terms and conditions</Text> */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          onRegister();
        }}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: hp('1%'),
    color: 'darkred',
    fontSize: wp('13%'),

    alignSelf: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: hp('2%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('83%'),
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
