import * as React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LSscreen from './screens/LS_screen';
import {DrawerNavigator} from './components/appDrawerNavigator'
import NotificationScreen from './screens/notification';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const SwitchNavigatior = createSwitchNavigator({
  LSscreen: {screen: LSscreen},
  BottomTab: {screen: DrawerNavigator},
  NotificationScreen: {screen: NotificationScreen}
});

const AppContainer = createAppContainer(SwitchNavigatior);