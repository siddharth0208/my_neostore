import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {Appbar, Button, Divider, Title} from 'react-native-paper';
import {wp, hp} from '../Styles/Style';
import {PlaceOrderCard} from '../Components/PlaceOrderCard';

export const PlaceOrder = ({route, navigation}) => {
  const [Data, setData] = React.useState([]);
  const [checkOut, setCheckOut] = React.useState([]);
  const [getId, setGetId] = React.useState('');
  const userCartSelector = useSelector(state => state.authReducer.getUserCart);
  const defaultAddressSelector = useSelector(
    state => state.authReducer.defaultAddress,
  );

  const objId = userCartSelector._id;
  const [placeOrder, setPlaceOrder] = React.useState([]);
  const authSelector = useSelector(state => state.authReducer);
  var token = authSelector.authData.token;
  console.log('Place order token', token);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    getOrders();
  }, [isFocused]);
  /*  const getAddresses = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/proceedToBuy', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('Proceed to buy response', response);
        let data = response.data.Addresses[0];
        setPlaceOrder(data);
      })
      .catch(function (error) {
        console.log('Proceed to buy', error);
      });
  }; */
  const getOrders = () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `https://nameless-savannah-21991.herokuapp.com/proceedToCheckout/${objId}`,
        {
          address: {
            address: defaultAddressSelector.address,
            pincode: defaultAddressSelector.pincode,
            city: defaultAddressSelector.city,
            state: defaultAddressSelector.state,
            country: defaultAddressSelector.country,
          },
        },
        config,
      )
      .then(function (response) {
        console.log('Proceed to Checkout response =>', response);
        var newData = response.data.data.productDetails;
        console.log('newdata', newData);
        setCheckOut(newData);
        let id = response.data.data._id;
        setGetId(id);
        let temp = response.data.data;
        setData(temp);
      })
      .catch(function (error) {
        console.log('Proceed to checkout', error);
      });
  };
  const FinalOrder = () => {
    console.log('id check=>', getId);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `https://nameless-savannah-21991.herokuapp.com/placeOrder/${getId}`,
        {
          id: getId,
        },
        config,
      )
      .then(function (response) {
        console.log('final order response response =>', response);
      })
      .catch(function (e) {
        console.log(e);
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
        <Appbar.Content style={{alignItems: 'center'}} title="Place order" />
      </Appbar.Header>
      <ScrollView>
        <View style={{marginLeft: wp('5%')}}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            {Data.userName}
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            {defaultAddressSelector.address} ,
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            {defaultAddressSelector.city}-{defaultAddressSelector.pincode},
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            {defaultAddressSelector.state} ,
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            {defaultAddressSelector.country}{' '}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('ShippingAddress');
          }}>
          <Text style={styles.buttonText}>Change or Add Address</Text>
        </TouchableOpacity>
        <FlatList
          style={{flex: 1}}
          data={checkOut}
          renderItem={({item}) => (
            <PlaceOrderCard
              productName={item.productName}
              productPrice={item.productPrice}
              qty={item.orderQuantity}
              image={item.productImage}
            />
          )}
        />
        <View style={{marginBottom: wp('15%')}}>
          <Text style={styles.txt}>Price Details</Text>
          <Divider style={styles.div} />

          {checkOut.map((product, index) => (
            <Title
              style={{
                paddingHorizontal: wp('4%'),
              }}>
              {product.productName}
              {''}
              {product.productPrice}
            </Title>
          ))}
          <Divider style={styles.div} />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txt}>Total Amount</Text>
            <Text style={styles.tprice}>${Data.totalPrice}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.botom}>
        <Button mode="outlined" color="#fada5e" style={styles.button}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            ${Data.totalPrice}
          </Text>
        </Button>
        <Button
          mode="contained"
          color="#ff9999"
          style={styles.button}
          onPress={() => {
            FinalOrder();
            navigation.navigate('OrderConfirm');
          }}>
          <Text style={{color: 'white'}}>CONFIRM ORDER</Text>
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: hp('4%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('85%'),
    backgroundColor: 'dodgerblue',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: wp('4%'),
    color: '#dddddd',
    textAlign: 'center',
    fontFamily: 'Spartan-Bold',
  },
  button: {
    width: wp('49.5%'),
    padding: wp('1%'),
  },
  botom: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: hp('0.3%'),

    justifyContent: 'space-between',
  },
  txt: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: wp('8%'),
    fontSize: hp('2.2%'),
  },
  div: {
    height: hp('0.2%'),
  },
  tprice: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
    marginLeft: wp('38%'),
  },
});
