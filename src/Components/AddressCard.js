import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Divider, Button} from 'react-native-paper';
import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {wp, hp} from '../Styles/Style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {defaultUserAddress} from '../Redux/Auth folder/AuthAction';

export const AddressCardComponent = ({
  address,
  pincode,
  city,
  state,
  country,
  addressId,
}) => {
  const navigation = useNavigation();
  const addressDispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <Card
        style={{
          borderRadius: wp('5%'),
          marginVertical: hp('1.5%'),
          marginHorizontal: hp('1%'),
        }}>
        <Card.Content>
          <Text style={{color: 'black'}}>
            {' '}
            {address} {city}
          </Text>
          <Text style={{color: 'black'}}>
            {state} {'-'}
            {pincode} {country}{' '}
          </Text>
          <Divider
            style={{
              backgroudColor: 'black',
              height: 3,
              borderColor: 'black',
              marginVertical: hp('3%'),
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              icon="delete"
              mode="outlined"
              onPress={() => {
                navigation.navigate('EditAddress', {
                  addressId: addressId,
                  address: address,
                  city: city,
                  pincode: pincode,
                  state: state,
                  country: country,
                });
              }}
              style={{
                backgroundColor: 'white',
                width: wp('40%'),
              }}>
              Edit
            </Button>
            <Button
              icon="delete"
              mode="outlined"
              onPress={() => {}}
              style={{
                backgroundColor: 'white',
                width: wp('40%'),
              }}>
              Delete
            </Button>
          </View>
          <TouchableOpacity
            onPress={() => {
              var result = {
                address: address,
                pincode: pincode,
                city: city,
                state: state,
                country: country,
              };
              addressDispatch(defaultUserAddress(result));
              navigation.navigate('PlaceOrder');
            }}>
            <Text
              style={{
                alignSelf: 'center',
                paddingTop: wp('2%'),
                color: 'lightgreen',
                fontSize: wp('4%'),
              }}>
              Set as Default
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
};
