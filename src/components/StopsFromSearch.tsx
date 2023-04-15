import { Box, Button, Center, FlatList, Square, Stack, Text } from 'native-base';
import { Stop } from "../types/Types";
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import SaveStopToFirebase from '../utils/SaveStopToFirebase';
import { useState } from 'react';
import TimetableModal from './TimetableModal';

type Props = {
    stops: Stop[]
}

export default function StopsFromSearch({ stops }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [gtfsId, setGtfsId] = useState<string>('');

    const handleShowModal = (gtfsId: string) => {
        setGtfsId(gtfsId);
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);


    return (
        <>
            <FlatList
                data={stops}
                renderItem={({ item }) =>
                    <Center>
                        <Box variant='stopSearchBox'>
                            <Box>
                                <Stack space={3}>
                                    <Text bold fontSize='xl'>{item.name}</Text>
                                    <Text fontSize='xl' >{item.code}</Text>
                                    <Text fontSize='xl' >{item.desc}</Text>
                                    <Button onPress={() => handleShowModal(item.gtfsId)} >
                                        Näytä aikataulu
                                    </Button>
                                </Stack>
                            </Box>
                            <Box>
                                <Square h='100%' w='170px' borderRadius='xl'>
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
                        </Box>
                    </Center>
                }
                keyExtractor={item => item.gtfsId}

            />
            <TimetableModal gtfsId={gtfsId} showModal={showModal} closeModal={handleCloseModal} />
        </>
    )
}