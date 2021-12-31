import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Avatar, Appbar, FAB} from 'react-native-paper';
import {cos} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {TextInputComponent} from '../Components/TextInputComponent';
import {wp, hp} from '../Styles/Style';
import {profileImage} from '../utils/Constaint';
import ImagePicker from 'react-native-image-crop-picker';
import {errorHandling} from '../utils/ErrorHandling';

export const EditProfile = ({navigation}) => {
  const [newImage, setnewImage] = useState({});
  console.log('arrive in edit profile screen');
  const authSelector = useSelector(state => state.authReducer);
  const userDataSelector = useSelector(state => state.authReducer.getUserData);
  const Email = authSelector.authData.userEmail;
  const token = authSelector.authData.token;
  const mobNumber = userDataSelector.mobile;
  var phone = mobNumber.toString();
  var contact;
  const [editProfile, setEditProfile] = useState({
    email: Email,
    firstName: userDataSelector.firstName,
    lastName: userDataSelector.secondName,
    gender: userDataSelector.gender,
    phoneNumber: phone,
  });

  const onChangeEmail = email => {
    setEditProfile({...editProfile, email});
  };
  const onChangeFirstName = firstName => {
    setEditProfile({...editProfile, firstName});
  };
  const onChangeLastName = lastName => {
    setEditProfile({...editProfile, lastName});
  };
  const onChangePhoneNumber = phoneNumber => {
    setEditProfile({...editProfile, phoneNumber});
  };
  contact = Number(editProfile.phoneNumber);
  const selectImage = () => {
    console.log('aarive in image picker');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setnewImage(image);
      setNewPicture();
    });
  };
  const setNewPicture = () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log(' arrive in set new pic');
    const imageData = new FormData();
    imageData.append('profile-pic', {
      uri: newImage.path,
      type: newImage.mime,
      name: 'image.jpg',
      filename: '5quhhz.jpg',
    });
    axios
      .post(
        'https://nameless-savannah-21991.herokuapp.com/updateProfilePic',
        imageData,
        config,
      )
      .then(function (response) {
        console.log('set new pic response=>', response);
        Alert.alert('Profile Picture Updated!');
        navigation.navigate('MyAccount');
      })
      .catch(function (error) {
        console.log('error of set new image', error);
      });
  };
  const onUpdateProfile = () => {
    console.log(token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        'https://nameless-savannah-21991.herokuapp.com/updateprofile',
        {
          profileDetails: {
            firstName: editProfile.firstName,
            secondName: editProfile.lastName,
            gender: editProfile.gender,
            mobile: editProfile.phoneNumber,
          },
        },
        config,
      )
      .then(function (response) {
        console.log('update profile response=>', response);
        Alert.alert('profile updated!');
        navigation.navigate('MyAccount');
      })
      .catch(function (error) {
        console.log('Edit Profile Error', error);
        Alert.alert('Something went Wronge!');
      });
  };
  return (
    <ScrollView style={{backgroundColor: '#F5F5F5'}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('MyAccount');
          }}
        />
        <Appbar.Content style={{alignSelf: 'center'}} title="Edit Profile" />
      </Appbar.Header>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProfileView', {
            propic: userDataSelector.profilePic,
          })
        }>
        <Avatar.Image
          source={{uri: `${profileImage}${userDataSelector.profilePic}`}}
          resizeMode="contain"
          style={EditProfileStyl.image}
          size={150}
        />
      </TouchableOpacity>

      <TextInputComponent
        label="First Name"
        value={editProfile.firstName}
        onChangeText={value => {
          onChangeFirstName(value);
        }}
      />
      <TextInputComponent
        label="Last Name"
        value={editProfile.lastName}
        onChangeText={value => {
          onChangeLastName(value);
        }}
      />
      <TextInputComponent
        label="Email"
        value={editProfile.email}
        onChangeText={value => {
          onChangeEmail(value);
        }}
      />
      <TextInputComponent
        label="Phone Number"
        value={editProfile.phoneNumber}
        onChangeText={value => {
          onChangePhoneNumber(value);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          onUpdateProfile();
        }}
        style={EditProfileStyl.submitBtn}>
        <Text style={EditProfileStyl.submitBtnTxt}>Submit</Text>
      </TouchableOpacity>
      <FAB
        onPress={() => {
          selectImage();
        }}
        style={EditProfileStyl.fab}
        small
        icon="plus"
      />
    </ScrollView>
  );
};
const EditProfileStyl = StyleSheet.create({
  submitBtn: {
    width: wp('85%'),
    height: hp('7%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: '#1e90ff',
    marginVertical: hp('2%'),
    alignSelf: 'center',
    borderRadius: wp('9%'),
  },
  submitBtnTxt: {
    fontSize: wp('6%'),
    padding: wp('0.8%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    marginVertical: hp('5%'),
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#1e90ff',
    justifyContent: 'flex-end',

    marginLeft: wp('61%'),
    size: 10,
    marginTop: hp('23%'),
  },
});
