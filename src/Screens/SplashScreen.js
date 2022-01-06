import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {wp, hp} from '../Styles/Style';
export const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  });
  return (
    <View>
      <Text
        style={{
          fontSize: wp('15%'),
          fontWeight: 'bold',
          alignSelf: 'center',
          color: 'maroon',
          marginTop: hp('35%'),
        }}>
        NEOSTORE
      </Text>
      <MaterialIcons
        name="shopping-cart"
        size={100}
        color="maroon"
        style={{alignSelf: 'center'}}
      />
    </View>
  );
};
