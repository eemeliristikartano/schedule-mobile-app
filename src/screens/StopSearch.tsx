import { API_KEY } from '@env';
import { Box, Button, Center, FlatList, Flex, FormControl, Input, Square, Stack, Text } from 'native-base';
import { useState } from 'react'
import { Stop } from "../types/Types";
import MapView, { Marker } from 'react-native-maps';

import { Ionicons } from '@expo/vector-icons';


export default function StopSearch() {
    const [searchWord, setSearchWord] = useState<string>('');
    const [stops, setStops] = useState<Stop[]>([]);

    const getStops = async () => {
        const body = `{
            stops(name: "${searchWord}") {
              gtfsId
              name
              code
              lat
              lon
              desc
            }
          }`;
        const config = {
            headers: { "Content-Type": "application/graphql", "digitransit-subscription-key": API_KEY },
            method: "POST",
            body: body
        }
        const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', config);
        if (!response.ok) {
            console.error(response.status);
        }
        const responseData = await response.json();
        setStops(responseData.data.stops);
    }

    return (
        <>

            <FormControl marginTop='5px'>
                <Flex direction='row' justify='space-evenly'>
                    <Input
                        type='text'
                        placeholder='Hakusana'
                        onChangeText={(word) => setSearchWord(word)}
                        width='80%'
                    />
                    <Button onPress={() => getStops()} >Hae</Button>
                </Flex>
            </FormControl>
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
                                    <Button variant='ghost'>
                                        <Ionicons name='star-outline' size={20} />
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

        </>
    )
}