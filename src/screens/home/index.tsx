import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Home } from './home';
import { InfoPokemon } from './information';

const { Navigator, Screen } = createStackNavigator();

export function HomeApp() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="InformationsScreen" component={InfoPokemon} />
    </Navigator>
  );
}
