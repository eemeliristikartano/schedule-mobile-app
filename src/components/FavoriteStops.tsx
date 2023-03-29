import { Box, Divider, FlatList, HStack, Text } from "native-base";
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
        <Box variant='homeScreenBox'  >
            <FlatList
                data={favoriteStops}
                renderItem={({ item }) =>
                    <Box p='2' >
                        <Text variant='homeScreenBoxText'>{item.name}</Text>
                        <Divider bg='muted.200' marginTop='2' />
                    </Box>} />
        </Box>
    )
}