/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {createStore} from 'redux';
import {applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {MainNavigation} from './src/Navigations/Navigation';
import rootReducer from './src/Redux/RootReducer';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </View>
  );
};

export default App;
