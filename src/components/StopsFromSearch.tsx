import { Box, Button, Center, FlatList, Flex, Icon, IconButton, Square, Stack, Text } from 'native-base';
import { Stop } from "../types/Types";
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import SaveStopToFirebase from '../utils/SaveStopToFirebase';
import { useEffect, useState, useContext } from 'react';
import TimetableModal from './TimetableModal';
import { get, orderByChild, query, ref } from 'firebase/database';
import { database } from '../../dbconfig';
import RemoveStopFromFirebase from '../utils/RemoveStopFromFirebase';
import { UserContext } from "../AppContext";

type Props = {
    stops: Stop[]
}

export default function StopsFromSearch({ stops }: Props) {
    const userContext = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [stop, setStop] = useState<Stop>();
    const [favoriteStopIds, setFavoriteStopIds] = useState<Stop[]>([]);

    const handleShowModal = (stop: Stop) => {
        setStop(stop);
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        fetchFavoriteStops();
    }, []);

    const fetchFavoriteStops = async () => {
        const favoriteStopsRef = ref(database, `favoriteStops/${userContext.userUid}`);
        const favoriteStopsQuery = query(favoriteStopsRef, orderByChild("gtfsId"));
        try {
            const snapshot = await get(favoriteStopsQuery);
            const data = snapshot.val();
            if (data) {
                const keys = Object.keys(data);
                const dataWithKeys = Object.values(data).map((obj: any, index) => {
                    return { ...obj, key: keys[index] }
                });
                setFavoriteStopIds(dataWithKeys);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const isUsersFavoriteStop = (gtfsId: string) => favoriteStopIds.find((element) => element.gtfsId === gtfsId)


    return (
        <>
            <FlatList
                data={stops}
                renderItem={({ item }) =>
                    <Center>
                        <Box variant='stopSearchBox'>
                            <Box>
                                <Stack space={3}>
                                    <Flex direction='row' justifyContent='space-between'>
                                        <Text bold fontSize='xl'>{item.name}</Text>
                                        {isUsersFavoriteStop(item.gtfsId) ?
                                            <IconButton
                                                size='lg'
                                                icon={<Icon as={Ionicons} name='star' />}
                                                onPress={() => {
                                                    RemoveStopFromFirebase(favoriteStopIds.find((stop) => stop.gtfsId === item.gtfsId)!.key, userContext.userUid);
                                                    setFavoriteStopIds([]);
                                                    fetchFavoriteStops();
                                                }}
                                            />
                                            :
                                            <IconButton
                                                size='lg'
                                                icon={<Icon as={Ionicons} name='star-outline' />}
                                                onPress={() => {
                                                    SaveStopToFirebase(item, userContext.userUid);
                                                    setFavoriteStopIds([]);
                                                    fetchFavoriteStops();
                                                }}
                                            />
                                        }

                                    </Flex>
                                    <Text fontSize='xl' >{item.code}</Text>
                                    <Text fontSize='xl' >{item.desc}</Text>
                                    <Box>
                                        <Square size='200px' w='100%' borderRadius='xl'>
                                            <MapView
                                                style={{ width: '100%', height: '100%' }}
                                                initialRegion={{
                                                    latitude: item.lat,
                                                    longitude: item.lon,
                                                    latitudeDelta: 0.001757,
                                                    longitudeDelta: 0.001866
                                                }}
                                            >
                                                <Marker coordinate={{ latitude: item.lat, longitude: item.lon }} />
                                            </MapView>
                                        </Square>
                                    </Box>
                                    <Button onPress={() => handleShowModal(item)} >
                                        Näytä aikataulu
                                    </Button>
                                </Stack>
                            </Box>

                        </Box>
                    </Center>
                }
                keyExtractor={item => item.gtfsId}

            />
            <TimetableModal stop={stop} showModal={showModal} closeModal={handleCloseModal} />
        </>
    )
}