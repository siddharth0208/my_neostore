import React from 'react';
import {View, Text} from 'react-native';
import {Card, Divider, Button} from 'react-native-paper';
import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {wp, hp} from '../Styles/Style';
import {useNavigation} from '@react-navigation/native';

export const AddressCardComponent = props => {
  const navigation = useNavigation();
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
            {props.address} {props.city}
          </Text>
          <Text style={{color: 'black'}}>
            {props.state} {'-'}
            {props.pincode} {props.country}{' '}
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
                  addressId: props.id,
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
        </Card.Content>
      </Card>
    </View>
  );
};

address: 'ward no 4';
city: 'katni';
country: 'india';
pincode: 483770;
state: 'india';
