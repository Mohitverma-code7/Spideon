import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import { ThemeProvider, useAppTheme } from './theme/ThemeProvider';
import AppSplashLoader from './components/AppSplashLoader';

const AppContent = () => {
  const { navigationTheme } = useAppTheme();
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (isBooting) {
    return <AppSplashLoader />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
