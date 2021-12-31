import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Alert, StyleSheet, View, Text, Image} from 'react-native';
import {Drawer, Card, Title, Divider} from 'react-native-paper';
import {Avatar} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/MaterialIcons';
import {userLogOutAction} from '../Redux/Auth folder/AuthAction';
import {hp, wp} from '../Styles/Style';
import {profileImage} from '../utils/Constaint';
import {withBadge, Icon} from 'react-native-elements';

export function DrawerContent({navigation, props}) {
  const userDataSelector = useSelector(state => state.authReducer.getUserData);
  const authSelector = useSelector(state => state.authReducer);
  const authDispatch = useDispatch();
  const authSignUpSelector = useSelector(state => state);
  const image = userDataSelector.profilePic;
  /* console.log('this is required');
  console.log(authSignUpSelector.authReducer.signUpData); */
  var forSignOut = {...authSelector, isLogIn: false};

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        {authSelector.authData &&
        authSelector.authData &&
        authSelector.authData.isLogIn ? (
          <View>
            {/*  <Avatar.Image
              size={110}
              style={{marginLeft: wp('7%'), marginVertical: hp('3%')}}
            /> */}
            <Avatar.Image
              source={{uri: `${profileImage}${image}`}}
              style={CardStyl.imageView}
              size={100}
            />

            <Title
              style={{
                marginBottom: hp('2%'),
                color: 'black',
                marginLeft: wp('5%'),
              }}>
              {userDataSelector.firstName} {''} {userDataSelector.secondName}
            </Title>
          </View>
        ) : (
          <Text style={{fontSize: 50, fontWeight: 'bold', color: 'maroon'}}>
            NeoStore
          </Text>
        )}
        <Divider style={{height: hp('0.1%')}} />
        <View>
          <Drawer.Section>
            <Drawer.Item
              icon={() => <FontAwesome name="home" size={30} color="#00bfff" />}
              label="Home"
              active={false}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              <Drawer.Item
                icon={() => (
                  <MaterialCommunityIcons
                    name="account"
                    size={30}
                    color="#00bfff"
                  />
                )}
                label="My Account"
                active={false}
                onPress={() => {
                  navigation.navigate('MyAccount');
                }}
              />
            ) : (
              []
            )}
            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              []
            ) : (
              <Drawer.Item
                icon={() => (
                  <MaterialCommunityIcons
                    name="login"
                    size={30}
                    color="#00bfff"
                  />
                )}
                label="signUp"
                active={false}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
              />
            )}
            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              []
            ) : (
              <Drawer.Item
                icon={() => (
                  <MaterialIcons name="login" size={30} color="#00bfff" />
                )}
                label="Login"
                active={false}
                onPress={() => {
                  navigation.navigate('Login');
                }}
              />
            )}

            <Drawer.Item
              icon={() => (
                <MaterialCommunityIcons
                  name="table-furniture"
                  size={30}
                  color="#00bfff"
                />
              )}
              label="All Products"
              active={true}
              onPress={() => {
                navigation.navigate('Allproduct');
              }}
            />

            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              <Drawer.Item
                icon={() => (
                  <FontAwesome name="shopping-cart" size={30} color="#00bfff" />
                )}
                label="Cart"
                active={false}
                onPress={() => {
                  navigation.navigate('Cart');
                }}
              />
            ) : (
              []
            )}
            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              <Drawer.Item
                icon={() => (
                  <Octicons name="list-unordered" size={30} color="#00bfff" />
                )}
                label="My Orders"
                active={false}
                onPress={() => navigation.navigate('OrderHistory')}
              />
            ) : (
              []
            )}

            <Drawer.Item
              icon={() => (
                <Ionicons name="location-sharp" size={30} color="#00bfff" />
              )}
              label="Store Locator"
              active={false}
              onPress={() => {
                navigation.navigate('StoreLocatore');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      {authSelector.authData &&
      authSelector.authData &&
      authSelector.authData.isLogIn ? (
        <Drawer.Section>
          <Drawer.Item
            icon={() => (
              <Ionicons name="exit-outline" size={30} color="#00bfff" />
            )}
            label="Sign Out"
            active={false}
            onPress={() => {
              authDispatch(userLogOutAction(forSignOut));
            }}
          />
        </Drawer.Section>
      ) : (
        []
      )}
    </View>
  );
}
const CardStyl = StyleSheet.create({
  imageView: {
    /*   backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: hp('12%'),
    width: wp('20%'),
    padding: wp('2%'),
    borderRadius: wp('25%'),
    margin: hp('2%'),
    position: 'relative'
    resizeMode: 'contain', */
    marginLeft: wp('7%'),
    marginVertical: hp('3%'),
    position: 'relative',
    marginBottom: hp('1.2%'),
  },
});
