import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'

import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';

const AppNavigator = createBottomTabNavigator(
  {
    Chat: ChatPage,
    Login: LoginPage,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let iconName: string

        if (routeName === 'Login') {
          iconName = 'person'
        } else if (routeName === 'Chat') {
          iconName = 'chat'
        }

        return (
          <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    },
  }
)

export default createAppContainer(AppNavigator);
