import React from 'react';
import {View, Text, StyleProp} from 'react-native';
import {TextInput} from 'react-native-paper';
import {hp, wp} from '../Styles/Style';

export const TextInputComponent = ({
  label,
  value,
  onChangeText,
  isPassword = false,
}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        style={{
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          marginVertical: hp('1%'),
          marginHorizontal: 5,
          width: wp('85%'),
          paddingBottom: 4,
          color: 'red',
          activeOutlineColor: 'black',
        }}
      />
    </View>
  );
};
