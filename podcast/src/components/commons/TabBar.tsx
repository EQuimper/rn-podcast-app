import React from 'react';
import { Box } from 'react-native-design-utility';
import { useSafeArea } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Player from './Player';
import { routes } from '../../navigations/routes';
import { metrics } from '../../constants/metrics';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { theme } from '../../constants/theme';

const ICONS = {
  [routes.HOME]: 'home',
  [routes.LIBRARY]: 'inbox',
  [routes.DOWNLOADS]: 'headphones',
  [routes.PROFILE]: 'user',
};

const TabBar: React.FC<BottomTabBarProps> = props => {
  const insets = useSafeArea();

  const activeTintColor = theme.color.blueDark;
  const inactiveTintColor = theme.color.greyLight;

  const onTabPress = (routeName: string, routeIndex: number) => () => {
    props.navigation.navigate(routeName);
  };

  return (
    <>
      <Player />
      <Box
        h={50 + insets.bottom}
        w="100%"
        bg="white"
        dir="row"
        pb="sm"
        style={{ borderTopWidth: 1, borderTopColor: theme.color.greyLightest }}>
        {props.state.routes.map((route, index) => {
          const icon = ICONS[route.name];

          const color =
            props.state.index === index ? activeTintColor : inactiveTintColor;

          return (
            <Box f={1} center key={route.key}>
              <TouchableOpacity
                style={styles.tabBtn}
                onPress={onTabPress(route.name, index)}>
                <FeatherIcon
                  name={icon}
                  size={metrics.tabIconSize}
                  color={color}
                />
              </TouchableOpacity>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBar;
