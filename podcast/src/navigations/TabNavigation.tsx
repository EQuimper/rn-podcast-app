import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';

import { routes } from './routes';
import HomeScreen from '../components/home/HomeScreen';
import LibraryScreen from '../components/library/LibaryScreen';
import DownloadsScreen from '../components/downloads/DownloadsScreen';
import ProfileScreen from '../components/profile/ProfileScreen';
import { metrics } from '../constants/metrics';
import { theme } from '../constants/theme';
import PodcastScreen from '../components/podcast/PodcastScreen';
import { IPodcast } from '../types/Podcast';
import { truncate } from '../helpers/text';

type HomeStackParams = {
  Home: undefined;
  Podcast: { podcast: IPodcast }
}

const HomeStack = createStackNavigator<HomeStackParams>();

const HomeNavigation: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="Podcast"
        component={PodcastScreen}
        options={({ route }) => {
          return {
            title: truncate(route.params?.podcast.trackName, 20),
          };
        }}
      />
    </HomeStack.Navigator>
  );
};

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
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="home" size={metrics.tabIconSize} color={color} />
          ),
        }}
        name={routes.HOME}
        component={HomeNavigation}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
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
          tabBarIcon: ({ color }) => (
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
          tabBarIcon: ({ color }) => (
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
