import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import { Ionicons } from '@expo/vector-icons';
import StopSearch from '../screens/StopSearch';

const Tab = createBottomTabNavigator();

export default function Navigation() {

    const screenOptions = ({ route }: any) => ({
        tabBarIcon: ({ focused, color, size }: any) => {
            let iconName: string | any;

            if (route.name === 'Etusivu') {
                iconName = 'home';
            } else if (route.name === 'Lähipysäkit') {
                iconName = 'map';
            } else if (route.name === "Pysäkkihaku") {
                iconName = 'search'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
        }
    });


    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions} >
                <Tab.Screen name="Etusivu" component={HomeScreen} />
                <Tab.Screen name='Lähipysäkit' component={MapScreen} />
                <Tab.Screen name='Pysäkkihaku' component={StopSearch} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}