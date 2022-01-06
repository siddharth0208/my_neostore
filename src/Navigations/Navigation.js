import React from 'react';

import {SignUp} from '../Screens/SignUp';
import {Login} from '../Screens/Login';
import {Dashboard} from '../Screens/Dashboard';
import {ForgotPassword} from '../Screens/ForgotPassword';
import {ResetPassword} from '../Screens/ResetPassword';
import {DrawerContent} from './DrawerContent';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {MyAccount} from '../Screens/MyAccount';
import {Cart} from '../Screens/Cart';
import {ShippingAddress} from '../Screens/ShippingAddress';
import {EditProfile} from '../Screens/EditProfile';
import {ChangePassword} from '../Screens/ChangePassword';
import {AddCustAddress} from '../Screens/AddCustAddress';
import {AllProducts} from '../Screens/Allproducts';
import {Alert} from 'react-native';
import {OrderHistory} from '../Screens/OrderHistory';
import {ProductDetails} from '../Screens/ProductDetails';
import {PlaceOrder} from '../Screens/PlaceOrder';
import {OrderConfirm} from '../Screens/OrderConfirm';
import {EditAddress} from '../Screens/EditAddress';
import {OrderDetails} from '../Screens/OrderDetails';
import {ProfileView} from '../Screens/ProfileView';
import {StoreLocatore} from '../Screens/StoreLocatore';
import {SplashScreen} from '../Screens/SplashScreen';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const StackScreen = createStackNavigator();

const HomeStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="DrawerContent" component={DrawerContent} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen name="Login" component={Login} />
      {/*  NAVIGATION INSIDE MY ACCOUNT */}
      <Drawer.Screen name="MyAccount" component={MyAccount} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="ShippingAddress" component={ShippingAddress} />
      <Drawer.Screen name="AddCustAddress" component={AddCustAddress} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Allproduct" component={AllProducts} />
      <Drawer.Screen name="OrderHistory" component={OrderHistory} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="PlaceOrder" component={PlaceOrder} />
      <Drawer.Screen name="OrderConfirm" component={OrderConfirm} />
      <Drawer.Screen name="EditAddress" component={EditAddress} />
      <Drawer.Screen name="OrderDetails" component={OrderDetails} />
      <Drawer.Screen name="ProfileView" component={ProfileView} />
      <Drawer.Screen name="StoreLocatore" component={StoreLocatore} />
      <Drawer.Screen name="SplashScreen" component={SplashScreen} />
    </Drawer.Navigator>
  );
};
const AuthStack = () => {
  return (
    <StackScreen.Navigator screenOptions={{headerShown: false}}>
      {/*  <StackScreen.Screen
         name="Dashboard"
         component={Dashboard}
         drawerContent={props => <DrawerContent {...props} />}
       />
       <StackScreen.Screen name="DrawerContent" component={DrawerContent} /> */}
      <StackScreen.Screen name="SplashScreen" component={SplashScreen} />
      <StackScreen.Screen name="Login" component={Login} />
      <StackScreen.Screen name="ForgotPassword" component={ForgotPassword} />
      <StackScreen.Screen name="ResetPassword" component={ResetPassword} />
      <StackScreen.Screen name="SignUp" component={SignUp} />
    </StackScreen.Navigator>
  );
};
export const MainNavigation = () => {
  const authReducer = useSelector(state => state.authReducer);
  console.log(authReducer.authData);
  return (
    <NavigationContainer>
      {authReducer.authData &&
      authReducer.authData &&
      authReducer.authData.isLogIn ? (
        <HomeStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
