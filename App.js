import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './assets/Screens/Home'
import CameraPage from './assets/Screens/CameraPage';
import BirdInfo from './assets/Screens/BirdInfo';

const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            }
            else if (route.name === 'Camera') {
              iconName = 'camera';
            }
            else if (route.name === 'Info') {
              iconName = 'book';
            }
            return <Ionicons name={iconName} size={28} color='blue' />;

          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Camera" component={CameraPage} />
        <Tab.Screen name="Info" component={BirdInfo} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}


