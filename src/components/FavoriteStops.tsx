import { Box, FlatList, HStack, Text } from "native-base";
import { useState } from 'react'

export default function FavoriteStops() {
    const [favoriteStops, setFavoriteStops] = useState([
        {
            "gtfsId": "HSL:6150219",
            "name": "Louhosmäki",
            "lat": 60.202282,
            "lon": 24.358088,
            "zoneId": "D"
        },
        {
            "gtfsId": "HSL:6150218",
            "name": "Solvik",
            "lat": 60.201517,
            "lon": 24.375928,
            "zoneId": "D"
        },
        {
            "gtfsId": "HSL:6150217",
            "name": "Evitskog",
            "lat": 60.20141,
            "lon": 24.342,
            "zoneId": "D"
        },
        {
            "gtfsId": "HSL:6150216",
            "name": "Evitskogin VPK",
            "lat": 60.20103,
            "lon": 24.33853,
            "zoneId": "D"
        },]);


    return (
        <Box w='2/3' bg='muted.300' borderRadius='xl' p='15px' >
            <FlatList
                data={favoriteStops}
                renderItem={({ item }) =>
                    <Box
                        borderBottomWidth='1'
                        borderColor='muted.800'
                        pl={['0', '4']} pr={['0', '5']} >
                        <Text>{item.name}</Text>
                    </Box>} />
        </Box>
    )
}