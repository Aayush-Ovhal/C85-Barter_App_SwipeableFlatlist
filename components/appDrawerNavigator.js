import React from 'react';
import {Image} from "react-native"
import {createDrawerNavigator} from 'react-navigation-drawer';
import {BottomTabNavigator} from './bottomTabNavigator';
import CustomSideBarMenu from './customSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBarters from '../screens/myBarters';

import {Icon} from "react-native-elements";
import NotificationScreen from '../screens/notification';

export const DrawerNavigator = createDrawerNavigator({
    HomeScreen: {
        screen:  BottomTabNavigator,
        navigationOptions: {
            drawerIcon: <Icon name="home" type = "fontawesome5"/>
        }
    },
    SettingScreen: {
        screen: SettingScreen,
        navigationOptions: {
            drawerIcon: <Icon name="settings" type = "fontawesome5"/>
        }
    },
    MyBarters: {
        screen: MyBarters,
        navigationOptions: {
            drawerIcon: <Image source={require("../assets/barter.png")} style={{width: 20, height: 20}}/>
        }
    },
    NotificationScreen: {
        screen: NotificationScreen,
        navigationOptions: {
            drawerIcon: <Image source={require("../assets/bell.png")} style={{width: 20, height: 20}}/>
        }
    }
},
{
  contentComponent: CustomSideBarMenu
}
)