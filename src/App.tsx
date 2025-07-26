import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from '@core/components/providers';
import { RootNavigator } from '@core/components';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AppProvider >
  );
}
