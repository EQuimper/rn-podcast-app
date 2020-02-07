import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {routes} from './routes';
import HomeScreen from '../components/home/HomeScreen';
import LibraryScreen from '../components/library/LibaryScreen';
import DownloadsScreen from '../components/downloads/DownloadsScreen';
import ProfileScreen from '../components/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={routes.HOME} component={HomeScreen} />
      <Tab.Screen name={routes.LIBRARY} component={LibraryScreen} />
      <Tab.Screen name={routes.DOWNLOADS} component={DownloadsScreen} />
      <Tab.Screen name={routes.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
