import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import RecieverDetails  from '../screens/recieverDetails';

export const AppStackNavigator = createStackNavigator({
  HomeScreen : {
    screen : HomeScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetails : {
    screen : RecieverDetails,
    navigationOptions:{
      headerShown : false
    }
  },
},
  {
    initialRouteName: 'HomeScreen'
  }
);