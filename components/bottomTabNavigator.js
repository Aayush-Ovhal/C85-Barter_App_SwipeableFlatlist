import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {AppStackNavigator} from './appStackNavigator';
import Request from '../screens/requestScreen';

export const BottomTabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarLabel: "Home Screen",
            tabBarIcon: <Image source={require("../assets/home.png")} style={{width: 20, height: 20}}/>
        }
    },
    RequestScreen: {
        screen: Request,
        navigationOptions: {
            tabBarLabel: "Request Screen",
            tabBarIcon: <Image source={require("../assets/request.png")} style={{width: 20, height: 20}}/>
        }
    }
})