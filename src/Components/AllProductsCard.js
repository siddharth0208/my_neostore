import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {wp, hp} from '../Styles/Style';
import {useNavigation} from '@react-navigation/native';
import {RatingComponent} from './RatingComponent';
import {productImage} from '../utils/Constaint';

export const AllProductCard = ({...props}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Card style={CardStyl.card}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductDetails', {
                id: props.id,
              });
            }}>
            <Card.Cover
              source={{uri: `${productImage}${props.image}`}}
              resizeMode="contain"
              style={CardStyl.imageView}
            />
          </TouchableOpacity>
          <View>
            <Card.Content>
              <Title style={CardStyl.title}>{props.name}</Title>
              <Text>{props.description}</Text>
              <Title>{props.price}</Title>
            </Card.Content>
            <Rating
              style={CardStyl.rate}
              type="star"
              ratingCount={5}
              imageSize={20}
              startingValue={props.rating}
              onFinishRating={props.rating}
              readonly={true}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

const CardStyl = StyleSheet.create({
  card: {
    height: hp('25%'),
    borderRadius: wp('8%'),
    marginHorizontal: hp('1%'),
    marginVertical: hp('1%'),
  },
  /*  image: {
    justifyContent: 'flex-start',
    padding: wp('0.5%'),
    backgroundColor: 'lightgreen',
  }, */
  imageView: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: hp('20%'),
    width: wp('25%'),
    padding: wp('2%'),
    borderRadius: wp('5%'),
    margin: hp('2%'),
    position: 'relative',
  },
  title: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    marginTop: hp('4%'),
    marginBottom: hp('2%'),
  },

  infoView: {
    display: 'flex',
    flexDirection: 'row',
  },
  rate: {
    marginTop: hp('2%'),
    alignSelf: 'flex-start',
    marginLeft: wp('3%'),
  },
});
