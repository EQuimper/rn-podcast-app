import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { routes } from './routes';
import HomeScreen from '../components/home/HomeScreen';
import LibraryScreen from '../components/library/LibaryScreen';
import DownloadsScreen from '../components/downloads/DownloadsScreen';
import ProfileScreen from '../components/profile/ProfileScreen';
import PodcastScreen from '../components/podcast/PodcastScreen';
import { IPodcast } from '../types/Podcast';
import { truncate } from '../helpers/text';
import TabBar from '../components/commons/TabBar';
import { theme } from '../constants/theme';

type HomeStackParams = {
  Home: undefined;
  Podcast: { podcast: IPodcast };
};

const HomeStack = createStackNavigator<HomeStackParams>();

const HomeNavigation: React.FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackTitleStyle: { color: theme.color.blueLight },
      }}>
      <HomeStack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
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
      tabBar={props => <TabBar {...props} />}
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen name={routes.HOME} component={HomeNavigation} />
      <Tab.Screen name={routes.LIBRARY} component={LibraryScreen} />
      <Tab.Screen name={routes.DOWNLOADS} component={DownloadsScreen} />
      <Tab.Screen name={routes.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
