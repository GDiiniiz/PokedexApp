import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { AppRoutes } from './routes.app';

export default function RootStack() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
