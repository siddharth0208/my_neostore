import React from 'react';
import {View, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

export const RadioButtonComponent = (value, text) => {
  const [checked, setChecked] = React.useState('1');
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <Text style={{display: 'flex', flexDirection: 'row', color: 'black'}}>
        Select Gender
      </Text>
      <RadioButton
        value={value}
        status={checked === '1' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('1')}
        style={{display: 'flex', flexDirection: 'column'}}
      />

      <Text style={{display: 'flex', flexDirection: 'column', color: 'black'}}>
        Male
      </Text>
      <RadioButton
        value="0"
        status={checked === '0' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('0')}
        style={{display: 'flex', flexDirection: 'row'}}
      />
      <Text style={{display: 'flex', flexDirection: 'row', color: 'black'}}>
        Female
      </Text>
    </View>
  );
};
