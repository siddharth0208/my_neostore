import React, {useState} from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {FAB, Appbar} from 'react-native-paper';
import {AddressCardComponent} from '../Components/AddressCard';
import {wp, hp} from '../Styles/Style';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getUserAddresses} from '../Redux/Auth folder/AuthAction';
import {useIsFocused} from '@react-navigation/native';

export const ShippingAddress = ({navigation}) => {
  userAddDispatch = useDispatch();
  console.log('arrive in Shipping address screen');
  const authSelector = useSelector(state => state.authReducer);
  const userAddSelector = useSelector(
    state => state.authReducer.getUserAddresses,
  );
  var token = authSelector.authData.token;
  const isFocused = useIsFocused();

  const [addresses, setaddresses] = useState([]);
  React.useEffect(() => {
    getAddress();
  }, [isFocused]);

  const getAddress = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/getCustAddress', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('Shipping Addresses Response=>', response);
        console.log(response.data.Addresses);
        let data = response.data.Addresses;
        userAddDispatch(getUserAddresses(data));

        console.log('ADDRESSDATA=>', data);
      })
      .catch(function (error) {
        console.log(error);
        errorHandling(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('MyAccount');
          }}
        />
        <Appbar.Content
          style={{alignSelf: 'center'}}
          title="Shipping Addresses"
        />
      </Appbar.Header>
      <FlatList
        style={{flex: 1}}
        data={userAddSelector}
        /*  renderItem={({item}) => {
          <Item
            address="abc"
            pincode="1234"
            city="ghj"
            state="mh"
            country="in"
          />;
        }} */
        renderItem={({item}) => (
          <AddressCardComponent
            address={item.address}
            pincode={item.pincode}
            city={item.city}
            state={item.state}
            country={item.country}
            id={item._id}
          />
        )}
      />
      <FAB
        style={ShippingAddressStyl.fab}
        large
        icon="plus"
        onPress={() => navigation.navigate('AddCustAddress')}
      />
    </View>
  );
};
const ShippingAddressStyl = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: '#1e90ff',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: hp('85%'),
    marginLeft: wp('80%'),
  },
});
