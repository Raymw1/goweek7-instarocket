import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Image} from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';

export default createAppContainer(
  createStackNavigator(
    {Feed, New},
    {
      initialRouteName: 'New',
      defaultNavigationOptions: {
        headerTitle: <Image source={logo} />,
        headerTintColor: '#000',
        headerTitleAlign: 'center',
        headerBackTitler: null,
      },
      mode: 'modal',
    },
  ),
);
