/* import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {FAB, Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {OrderHistoryCard} from '../Components/OrderHistoryCard';

export const OrderHistory = ({navigation}) => {
  const [getOrder, setGetOrder] = useState([]);
  const authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  React.useEffect(() => {
    getOrderHistory();
  }, []);
  const getOrderHistory = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/getOrders', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('Order Histroy response=>', response);
        let data = response.data.ordersDetails.productsInOrder;
        setGetOrder(data);
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
        <Appbar.Content style={{alignItems: 'center'}} title="Order History" />
      </Appbar.Header>
      <FlatList
        style={{flex: 1}}
        data={getOrder}
        renderItem={({item}) => (
          <OrderHistoryCard orderPlacedOn={item.product} />
        )}
      />
    </View>
  );
};
 */
import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Appbar, Card, Divider, List} from 'react-native-paper';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getUserOrderHistory} from '../Redux/Auth folder/AuthAction';
import {wp, hp} from '../Styles/Style';
import {color} from 'react-native-reanimated';

export const OrderHistory = ({navigation}) => {
  console.log('arrive in order history');
  var authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  const userOrderHistoryDispatch = useDispatch();

  var orderHistorySelector = useSelector(
    state => state.authReducer.userOrderHistory,
  );
  console.log('response from redux=>', orderHistorySelector);
  var order = orderHistorySelector.productsInOrder;
  console.log('productsInOrder=>', order);
  var isFocused = useIsFocused();
  React.useEffect(() => {
    orderHistory();
  }, [isFocused]);

  const orderHistory = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/getOrders', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('order history response=>', response);
        let data = response.data.ordersDetails;
        userOrderHistoryDispatch(getUserOrderHistory(data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <Appbar.Content title="Order History" />
      </Appbar.Header>

      <View style={{flex: 1, marginTop: hp('2%')}}>
        <ScrollView>
          {orderHistorySelector.map(item => (
            <View>
              <Card
                style={{
                  flex: 1,
                  borderRadius: wp('7%'),
                  marginHorizontal: hp('1%'),
                  marginVertical: hp('0.8%'),
                }}>
                <View
                  style={{
                    marginLeft: wp('6%'),
                    marginTop: hp('2%'),
                    marginRight: wp('10%'),
                  }}>
                  <Divider
                    style={{
                      backgroudColor: 'black',
                      height: 3,
                      borderColor: 'black',
                      marginVertical: hp('1%'),
                    }}
                  />
                  {item.productsInOrder.map((subItem, k) => (
                    <Text
                      style={{
                        color: 'black',
                        fontSize: wp('5%'),
                        paddingLeft: wp('5%'),
                        paddingRight: wp('5%'),
                      }}>
                      {subItem.product} qty-{subItem.quantity} {subItem.price}{' '}
                      {'\n'}
                    </Text>
                  ))}
                  <Divider
                    style={{
                      backgroudColor: 'black',
                      height: 3,
                      borderColor: 'black',
                      marginVertical: hp('1%'),
                    }}
                  />
                  <Text style={{marginBottom: hp('2%'), color: 'black'}}>
                    {item.orderPlacedOn}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('OrderDetails', {
                        productHistory: item,
                        productInvoice: item.invoice,
                      });
                    }}>
                    <Text style={{color: 'black'}}>click here</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
