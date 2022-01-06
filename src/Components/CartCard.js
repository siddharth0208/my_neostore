import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {wp, hp} from '../Styles/Style';
import {productImage} from '../utils/Constaint';
export const CartCardComponent = ({...props}) => {
  const [qty, setQty] = useState(1);

  const addProduct = () => {
    setQty(qty + 1);
  };
  const removeProduct = () => {
    setQty(qty - 1);
  };
  return (
    <View style={{flex: 1}}>
      <Card style={CartCardStyl.card}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Card.Cover
            source={{uri: `${productImage}${props.image}`}}
            resizeMode="contain"
            style={CartCardStyl.imageView}
          />
          <View>
            <Card.Content>
              <Title style={CartCardStyl.title}>{props.productName}</Title>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginVertical: hp('2%'),
                  marginRight: wp('30%'),
                }}>
                <AntDesign
                  name="pluscircle"
                  size={20}
                  color="black"
                  onPress={() => {
                    addProduct();
                  }}
                />
                <Title>{props.qty}</Title>
                <AntDesign
                  name="minuscircle"
                  size={20}
                  color="black"
                  onPress={() => {
                    removeProduct();
                  }}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: hp('3%'),
                }}>
                <Title>${props.productPrice}</Title>
                <TouchableOpacity onPress={() => {}}>
                  <MaterialIcons
                    style={{paddingHorizontal: 100}}
                    name="delete"
                    size={35}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </Card.Content>
          </View>
        </View>
      </Card>
    </View>
  );
};
const CartCardStyl = StyleSheet.create({
  card: {
    height: hp('28%'),
    borderRadius: wp('10%'),
    marginHorizontal: hp('1%'),
    marginVertical: hp('2%'),
  },
  imageView: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: hp('25%'),
    width: wp('25%'),
    padding: wp('2%'),
    borderRadius: wp('5%'),
    margin: hp('2%'),
    position: 'relative',
  },
  title: {
    marginTop: hp('3%'),
    color: 'black',
  },
});
