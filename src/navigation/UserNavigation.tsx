import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import { Ionicons } from '@expo/vector-icons';
import StopSearchScreen from '../screens/StopSearchScreen';
import { Icon, IconButton } from 'native-base';
import { getAuth, signOut } from 'firebase/auth';

const Tab = createBottomTabNavigator();

export default function UserNavigation() {
    const auth = getAuth();

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
                <Tab.Screen
                    name="Etusivu"
                    component={HomeScreen}
                    options={{
                        headerRight: () => (
                            <IconButton
                                size='lg'
                                icon={<Icon as={Ionicons} name='log-out-outline' />}
                                onPress={() => signOut(auth)}
                            />
                        )
                    }}
                />
                <Tab.Screen name='Lähipysäkit' component={MapScreen} />
                <Tab.Screen name='Pysäkkihaku' component={StopSearchScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}