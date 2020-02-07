import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './TabNavigation';

const MainNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default MainNavigation;
