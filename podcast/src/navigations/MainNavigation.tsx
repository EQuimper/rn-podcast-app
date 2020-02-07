import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from './routes';
import PodcastScreen from '../components/podcast/PodcastScreen';


const MainNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default MainNavigation;
