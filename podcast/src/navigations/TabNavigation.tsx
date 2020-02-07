import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {routes} from './routes';
import HomeScreen from '../components/home/HomeScreen';
import LibraryScreen from '../components/library/LibaryScreen';
import DownloadsScreen from '../components/downloads/DownloadsScreen';
import ProfileScreen from '../components/profile/ProfileScreen';
import {metrics} from '../constants/metrics';
import {theme} from '../constants/theme';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.color.blueDark,
        inactiveTintColor: theme.color.greyLight,
        showLabel: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <FeatherIcon name="home" size={metrics.tabIconSize} color={color} />
          ),
        }}
        name={routes.HOME}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <FeatherIcon
              name="inbox"
              size={metrics.tabIconSize}
              color={color}
            />
          ),
        }}
        name={routes.LIBRARY}
        component={LibraryScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <FeatherIcon
              name="headphones"
              size={metrics.tabIconSize}
              color={color}
            />
          ),
        }}
        name={routes.DOWNLOADS}
        component={DownloadsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <FeatherIcon name="user" size={metrics.tabIconSize} color={color} />
          ),
        }}
        name={routes.PROFILE}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
