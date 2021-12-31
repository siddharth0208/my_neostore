import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {Appbar, Button, Card} from 'react-native-paper';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {CartCardComponent} from '../Components/CartCard';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import {hp, wp} from '../Styles/Style';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getUserCart} from '../Redux/Auth folder/AuthAction';

export const Cart = ({navigation}) => {
  const [cartLength, setCartLength] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [cartData, setCartData] = useState([]);
  const [cartId, setCartId] = useState('');
  const authSelector = useSelector(state => state.authReducer);
  const userCartSelector = useSelector(state => state.authReducer.getUserCart);
  const userCartDispatch = useDispatch();
  var token = authSelector.authData.token;
  console.log('cart token', token);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    getCart();
  }, [isFocused]);
  const getCart = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/getCart', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('Cart response', response);
        let cartResponse = response.data.cart;
        let length = response.data.cart.productDetails.length;
        var data = {
          ...cartResponse,
          length,
        };
        setCartData(data);
        userCartDispatch(getUserCart(data));
        console.log('cartdata', cartData);
        console.log('cartdataname', cartData.productName);
        let id = response.data.cart._id;
        setCartId(id);
        let price = response.data.cart.totalPrice;
        setTotalPrice(price);
        let len = response.data.cart.productDetails.length;
        setCartLength(len);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content style={{alignItems: 'center'}} title="Cart" />
      </Appbar.Header>
      {cartLength != 0 ? (
        <FlatList
          style={{flex: 1}}
          data={userCartSelector.productDetails}
          renderItem={({item}) => (
            <CartCardComponent
              productName={item.productName}
              productPrice={item.productPrice}
              qty={item.orderQuantity}
              image={item.productImage}
            />
          )}
        />
      ) : (
        <Card>
          <Card.Cover
            source={{
              uri: 'https://www.kindpng.com/picc/m/174-1749396_empty-cart-your-cart-is-empty-hd-png.png',
            }}
            style={ProductDetailStyl.emptyCartImg}></Card.Cover>
        </Card>
      )}

      {cartLength != 0 ? (
        <View style={ProductDetailStyl.botom}>
          <Button
            mode="outlined"
            color="#fada5e"
            style={ProductDetailStyl.button}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              ${userCartSelector.totalPrice}
            </Text>
          </Button>
          <Button
            mode="contained"
            color="#ff9999"
            style={ProductDetailStyl.button}
            onPress={() => {
              if (totalPrice != 0) {
                navigation.navigate('PlaceOrder', {
                  objId: cartId,
                });
              } else {
                Alert.alert('Cart is Empty');
              }
            }}>
            <Text style={{color: 'white'}}>Order Now</Text>
          </Button>
        </View>
      ) : (
        []
      )}
    </View>
  );
};

const ProductDetailStyl = StyleSheet.create({
  button: {
    width: wp('49.5%'),
    padding: wp('1%'),
  },
  botom: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: hp('94%'),
    position: 'absolute',

    justifyContent: 'space-between',
  },
  emptyCartImg: {
    width: wp('100%'),
    height: hp('60%'),
    justifyContent: 'center',
  },
});
