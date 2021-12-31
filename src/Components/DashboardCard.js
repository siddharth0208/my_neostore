import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import {wp, hp} from '../Styles/Style';
import {productImage} from '../utils/Constaint';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
export const DashboardCard = ({...props}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Card style={CardStyl.card}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductDetails', {
                id: props.id,
                image: props.image,
              });
            }}>
            {/* <Card.Cover
              source={{uri: `${productImage}${props.image}`}}
              resizeMode="contain"
              style={CardStyl.imageView}
            /> */}
            <Image
              source={{uri: `${productImage}${props.image}`}}
              style={CardStyl.imageView}
            />
          </TouchableOpacity>
          <View>
            <Card.Content>
              <Title style={CardStyl.title}>{props.title}</Title>

              <Title style={{marginTop: hp('3%')}}>{props.price}</Title>
            </Card.Content>
            <View style={CardStyl.rate}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={20}
                startingValue={props.rating}
                onFinishRating={props.rating}
                readonly={true}
              />
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const CardStyl = StyleSheet.create({
  card: {
    height: hp('24%'),
    borderRadius: wp('10%'),
    marginHorizontal: hp('1%'),
    marginVertical: hp('2%'),
  },

  imageView: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: hp('20%'),
    width: wp('25%'),
    padding: wp('2%'),
    borderRadius: wp('0%'),
    margin: hp('2%'),
    position: 'relative',
    resizeMode: 'contain',
  },
  title: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    marginTop: hp('4%'),
  },
  paragraph: {
    marginVertical: hp('1%'),
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
