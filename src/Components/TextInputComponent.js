import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {hp, wp} from '../Styles/Style';

export const TextInputComponent = ({
  label,
  value,
  onChangeText,
  isPassword = false,
  helperText,
}) => {
  var emailpattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  var fNamePattern = /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/;
  const hasErrors = () => {
    if ((value.length && label === 'Username') || label === 'Email') {
      {
        return !emailpattern.test(value);
      }
    }
    if (value.length && label && label === 'Phone Number') {
      return !value.length;
    }
    if ((value.length && label === 'First Name') || label === 'Last Name') {
      return !fNamePattern.test(value);
    }
  };
  return (
    <View style={{alignItems: 'center'}}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        style={TextInputStyl.textInput}
      />
      {helperText === 'yes' ? (
        <HelperText
          type="error"
          visible={hasErrors()}
          style={TextInputStyl.helperText}>
          Invalid {label}
        </HelperText>
      ) : (
        []
      )}
    </View>
  );
};
const TextInputStyl = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginVertical: hp('1%'),
    marginHorizontal: 5,
    width: wp('85%'),
    paddingBottom: 4,
    color: 'red',
    activeOutlineColor: 'black',
  },

  helperText: {
    marginLeft: wp('4%'),
    top: 0,
  },
});
