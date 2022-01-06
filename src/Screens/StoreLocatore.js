import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Appbar} from 'react-native-paper';

export const StoreLocatore = ({navigation}) => {
  return (
    <View>
      <Appbar.Header style={storeLocatorStyl.appbarstyl}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <Appbar.Content title="Store Locator" />
      </Appbar.Header>
      <MapView
        initialRegion={{
          latitude: 19.07609,
          longitude: 72.877426,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{height: '100%', width: '100%'}}>
        <Marker
          coordinate={{
            latitude: 19.076874,
            longitude: 72.877426,
          }}
          icon={<Ionicons name="location-sharp" size={25} color="red" />}
        />
      </MapView>
    </View>
  );
};

const storeLocatorStyl = StyleSheet.create({
  appbarstyl: {
    backgroundColor: 'white',
  },
});
