import React from 'react';
import {View, Text, Modal, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Appbar, Card, Divider, Button, Title, Avatar} from 'react-native-paper';
import {hp, wp} from '../Styles/Style';
import {useIsFocused} from '@react-navigation/native';
import {profileImage} from '../utils/Constaint';

export const ProfileView = ({route, navigation}) => {
  const {propic} = route.params;
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'black'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          style={{alignItems: 'center'}}
          title="Profile Picture"
        />
      </Appbar.Header>
      <Card.Cover
        source={{uri: `${profileImage}${propic}`}}
        resizeMode="contain"
        style={ProductDetailStyl.image}
        size={150}
      />
    </View>
  );
};
const ProductDetailStyl = StyleSheet.create({
  image: {
    alignSelf: 'center',
    marginVertical: hp('5%'),
    marginTop: hp('20%'),
    width: wp('100%'),
    height: hp('45%'),
  },
});
