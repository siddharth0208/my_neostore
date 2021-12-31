import React from 'react';
import {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Avatar, Appbar, Title, Card} from 'react-native-paper';
import {hp, wp} from '../Styles/Style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getUserProfile, userLogInAction} from '../Redux/Auth folder/AuthAction';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {profileImage} from '../utils/Constaint';
import {useIsFocused} from '@react-navigation/native';

export const MyAccount = ({navigation}) => {
  const authSelector = useSelector(state => state.authReducer);
  const userDataSelector = useSelector(state => state.authReducer.getUserData);
  console.log('my ac data', userDataSelector);
  var token = authSelector.authData.token;
  const userDataDispatch = useDispatch();
  const image = userDataSelector.profilePic;
  console.log('image of person', image);
  const isFocused = useIsFocused();
  useEffect(() => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/profile', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        var result = response.data.userData;
        userDataDispatch(getUserProfile(result));
        console.log('response of my account', response);
        console.log('sucess response of my account');
      })
      .catch(function (error) {
        console.log('my account error', error);
      });
  }, [isFocused]);

  return (
    <View style={{backgroundColor: '#F5F5F5', height: hp('100%')}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <Appbar.Content style={{alignItems: 'center'}} title="My Account" />
      </Appbar.Header>
      <View style={MyAccountStyl.imageView}>
        <Avatar.Image
          source={{uri: `${profileImage}${image}`}}
          resizeMode="contain"
          style={MyAccountStyl.pic}
          size={110}
        />

        <Text
          style={{
            color: 'black',
            marginTop: hp('4%'),
            marginLeft: wp('6%'),
            justifyContent: 'center',
          }}>
          <Title>
            {userDataSelector.firstName} {userDataSelector.secondName}{' '}
          </Title>
          {'\n'}
          {userDataSelector.mobile}
          {'\n'}
          {userDataSelector.email}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OrderHistory');
        }}>
        <View style={MyAccountStyl.card}>
          <FontAwesome
            name="first-order"
            color="black"
            size={30}
            style={MyAccountStyl.leftIcon}
          />
          <Text style={MyAccountStyl.text}>Order History</Text>
          <AntDesign
            name="arrowright"
            color="black"
            size={30}
            style={MyAccountStyl.rightIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <View style={MyAccountStyl.card}>
          <FontAwesome
            name="shopping-cart"
            color="black"
            size={30}
            style={MyAccountStyl.leftIcon}
          />
          <Text style={MyAccountStyl.text}>Cart</Text>
          <AntDesign
            name="arrowright"
            color="black"
            size={30}
            style={MyAccountStyl.rightIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ShippingAddress');
        }}>
        <View style={MyAccountStyl.card}>
          <Ionicons
            name="location-sharp"
            color="black"
            size={30}
            style={MyAccountStyl.leftIcon}
          />
          <Text style={MyAccountStyl.text}>Shipping Address</Text>
          <AntDesign
            name="arrowright"
            color="black"
            size={30}
            style={MyAccountStyl.rightIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditProfile');
        }}>
        <View style={MyAccountStyl.card}>
          <MaterialIcons
            name="edit"
            color="black"
            size={30}
            style={MyAccountStyl.leftIcon}
          />
          <Text style={MyAccountStyl.text}>Edit Profile</Text>
          <AntDesign
            name="arrowright"
            color="black"
            size={30}
            style={MyAccountStyl.rightIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}>
        <View style={MyAccountStyl.card}>
          <MaterialCommunityIcons
            name="lock-reset"
            color="black"
            size={30}
            style={MyAccountStyl.leftIcon}
          />
          <Text style={MyAccountStyl.text}>Reset Password</Text>
          <AntDesign
            name="arrowright"
            color="black"
            size={30}
            style={MyAccountStyl.rightIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const MyAccountStyl = StyleSheet.create({
  card: {
    marginHorizontal: wp('5%'),
    marginVertical: wp('4%'),
    width: wp('90%'),
    height: hp('10%'),
    backgroundColor: 'white',
    borderRadius: wp('5%'),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftIcon: {
    paddingTop: wp('6%'),
    paddingLeft: wp('6%'),
    alignSelf: 'flex-start',
  },
  text: {
    paddingLeft: wp('3%'),
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    width: wp('60%'),
  },
  rightIcon: {
    paddingTop: wp('6%'),
    alignItems: 'center',
  },
  image: {
    paddingHorizontal: wp('7%'),
    paddingVertical: wp('8%'),
  },
  pic: {
    /*  backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: hp('20%'),
    width: wp('25%'),
    padding: wp('2%'),
    borderRadius: wp('0%'),
    margin: hp('2%'), */
    position: 'relative',
    resizeMode: 'contain',
    marginLeft: wp('7%'),
    marginVertical: hp('3%'),
    marginBottom: hp('1.2%'),
  },
});
