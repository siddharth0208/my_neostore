import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {wp, hp} from '../Styles/Style';
import {TextInputComponent} from '../Components/TextInputComponent';
import {errorHandling} from '../utils/ErrorHandling';

export const EditAddress = ({route, navigation}) => {
  console.log('arrive in edit address screen');
  const [adres, setAdres] = useState({
    address: '',
    city: '',
    pinCode: '',
    state: '',
    country: '',
  });
  const {addressId} = route.params;
  console.log('Id of Address', addressId);
  const authSelector = useSelector(state => state.authReducer);
  const token = authSelector.authData.token;

  const onAddressChange = address => {
    setAdres({...adres, address});
  };
  const onCityChange = city => {
    setAdres({...adres, city});
  };
  const onPinCodeChange = pinCode => {
    setAdres({...adres, pinCode});
  };
  const onStateChange = state => {
    setAdres({...adres, state});
  };
  const onCountryChange = country => {
    setAdres({...adres, country});
  };

  const onAdddressSubmit = () => {
    console.log('aarive in Api');
    if (
      adres.address.length != '' &&
      adres.city != '' &&
      adres.pinCode != '' &&
      adres.state != '' &&
      adres.country != ''
    ) {
      console.log('token=>', token);
      const config = {
        headers: {Authorization: `Bearer ${token}`},
      };

      axios
        .post(
          'https://nameless-savannah-21991.herokuapp.com/updateAddress',

          {
            addressId: addressId,
            updatedAddress: {
              address: adres.address,
              pincode: adres.pinCode,
              city: adres.city,
              state: adres.country,
              country: adres.country,
            },
          },
          config,
        )
        .then(function (response) {
          console.log('Edit adderess response ', response);
          Alert.alert('address updated!');
          navigation.navigate('ShippingAddress');
        })
        .catch(function (error) {
          console.log(error);
          errorHandling(error);
        });
    } else {
      console.warn('no');
    }
  };
  return (
    <View>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('ShippingAddress');
          }}
        />
        <Appbar.Content style={{alignSelf: 'center'}} title="Edit Address" />
      </Appbar.Header>
      <TextInputComponent
        label="Address"
        value={adres.address}
        onChangeText={value => {
          onAddressChange(value);
        }}
      />
      <TextInputComponent
        label="City"
        value={adres.city}
        onChangeText={value => {
          onCityChange(value);
        }}
      />
      <TextInputComponent
        label="Pincode"
        value={adres.pinCode}
        onChangeText={value => {
          onPinCodeChange(value);
        }}
      />
      <TextInputComponent
        label="State"
        value={adres.state}
        onChangeText={value => {
          onStateChange(value);
        }}
      />
      <TextInputComponent
        label="Country"
        value={adres.country}
        onChangeText={value => {
          onCountryChange(value);
        }}
      />

      <TouchableOpacity
        style={AddressStyl.submitpBtn}
        onPress={() => {
          onAdddressSubmit();
        }}>
        <Text style={AddressStyl.submitBtnTxt}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const AddressStyl = StyleSheet.create({
  submitpBtn: {
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
});
