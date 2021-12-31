import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Title} from 'react-native-paper';

import {wp, hp} from '../Styles/Style';
import {productImage} from '../utils/Constaint';
export const PlaceOrderCard = ({...props}) => {
  return (
    <View style={{flex: 1}}>
      <Card style={PlaceOrderStyl.card}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Card.Cover
            source={{uri: `${productImage}${props.image}`}}
            style={PlaceOrderStyl.imageView}
          />
          <View>
            <Card.Content>
              <Title style={PlaceOrderStyl.title}>{props.productName}</Title>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: hp('1%'),
                }}>
                <Title style={{color: 'black', marginTop: hp('5%')}}>
                  $ {props.productPrice}{' '}
                </Title>
                <Title
                  style={{
                    color: 'black',
                    marginLeft: wp('8%'),
                    padding: hp('4.6%'),
                  }}>
                  Qty - {props.qty}{' '}
                </Title>
              </View>
            </Card.Content>
          </View>
        </View>
      </Card>
    </View>
  );
};
const PlaceOrderStyl = StyleSheet.create({
  card: {
    height: hp('26%'),
    borderRadius: wp('10%'),
    marginHorizontal: hp('1%'),
    marginVertical: hp('2%'),
  },
  imageView: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: hp('24%'),
    width: wp('25%'),
    padding: wp('2%'),
    borderRadius: wp('5%'),
    margin: hp('2%'),
    position: 'relative',
  },
  title: {
    marginTop: hp('6%'),
    color: 'black',
  },
});
