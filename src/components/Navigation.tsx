import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Etusivu" component={HomeScreen} />
                <Tab.Screen name='Kartta' component={MapScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}