import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import {Searchbar, Appbar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {wp, hp} from '../Styles/Style';
import {withBadge, Icon} from 'react-native-elements';

import {useIsFocused} from '@react-navigation/native';
import {DashboardCard} from '../Components/DashboardCard';
import {errorHandling} from '../utils/ErrorHandling';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getUserProfile} from '../Redux/Auth folder/AuthAction';
import {getUserCart} from '../Redux/Auth folder/AuthAction';

export const Dashboard = ({navigation}) => {
  const userCartSelector = useSelector(state => state.authReducer.getUserCart);
  const userCartDispatch = useDispatch();
  const userDataSelector = useSelector(state => state.authReducer.getUserData);
  const userDataDispatch = useDispatch();
  const [dash, setDash] = useState([]);
  const authSelector = useSelector(state => state.authReducer);
  var token = authSelector.authData.token;
  console.log('token of dashboard', token);
  const cartLength = userCartSelector.length;
  const BadgedIcon = withBadge(cartLength)(Icon);
  const [searchQuery, setSearchQuery] = React.useState('');
  const isFocused = useIsFocused();
  const onChangeSearch = searchQuery => {
    setSearchQuery(searchQuery);
    const newData = dash.filter(item => {
      return item.name.search(searchQuery);
    });
    setDash(newData);
  };

  const getDashboard = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/getDashboard', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('Dashboard response', response);
        let data = response.data.topRatedProducts;
        setDash(data);
      })
      .catch(function (error) {
        errorHandling(error);
      });
  };

  React.useEffect(() => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/profile', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        var result = response.data.userData;
        userDataDispatch(getUserProfile(result));
        console.log('profile Response', result);
      })
      .catch(function (error) {
        console.log('my account error', error);
      });
  }, []);

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

        userCartDispatch(getUserCart(data));
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  React.useEffect(() => {
    getDashboard();
  }, [isFocused]);
  return (
    <View style={{backgroundColor: 'lightgray', height: hp('100%')}}>
      <View>
        <Appbar.Header style={DashboardStyl.header}>
          <Appbar.Action
            icon="menu"
            size={35}
            color="#1e90ff"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <Appbar.Content title="NEOSTORE" style={{alignItems: 'center'}} />
          {/*  <Appbar.Action
            icon="cart"
            color="#1e90ff"
            size={35}
            onPress={() => {
              navigation.navigate('Cart');
            }}
          /> */}
          <View style={{marginRight: 20}}>
            <BadgedIcon
              type="ionicon"
              name="cart"
              size={35}
              color="#1e90ff"
              onPress={() => {
                navigation.navigate('Cart');
              }}
            />
          </View>
        </Appbar.Header>
      </View>
      <View>
        <Searchbar
          placeholder="Search For Products"
          value={searchQuery}
          onChangeText={searchQuery => {
            onChangeSearch(searchQuery);
          }}
          style={DashboardStyl.searchBar}
        />
      </View>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 20,
          marginLeft: 20,
        }}>
        Top Products for you
      </Text>

      <FlatList
        style={{flex: 1}}
        data={dash}
        renderItem={({item}) => (
          <DashboardCard
            title={item.name}
            rating={item.rating}
            price={item.price}
            id={item.id}
            image={item.image}
          />
        )}
      />
    </View>
  );
};

const DashboardStyl = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    backgroundColor: '#F5F5F5',
  },
  menuicon: {
    justifyContent: 'space-around',
    marginLeft: wp('3%'),
  },
  neostoreTxt: {
    fontSize: wp('7%'),
    fontWeight: '700',
    color: 'black',
    width: wp('72%'),
    alignSelf: 'center',
    textAlign: 'center',
  },
  cartIcon: {
    justifyContent: 'flex-end',
    marginRight: wp('3%'),
  },
  searchBar: {
    borderRadius: wp('4%'),
    margin: hp('1%'),
  },
});
