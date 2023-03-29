import { Box, FlatList, HStack, Text } from "native-base";
import { useState } from 'react'

export default function FavoriteRoutes() {
    const [favoriteRoutes, setFavoriteRoutes] = useState([
        {
            "gtfsId": "HSL:2104",
            "shortName": "104",
            "longName": "Lauttasaari(M)-Westend-Haukilahti",
            "mode": "BUS"
        },
        {
            "gtfsId": "HSL:1010",
            "shortName": "10",
            "longName": "Kirurgi - Töölö - Meilahti",
            "mode": "TRAM"
        },
        {
            "gtfsId": "HSL:1010H",
            "shortName": "10H",
            "longName": "Meilahti - Töölön halli",
            "mode": "TRAM"
        },
        {
            "gtfsId": "HSL:1010B",
            "shortName": "10B",
            "longName": "Kirurgi - Rautatieasema - Kauppatori",
            "mode": "TRAM"
        },]);


    return (
        <Box w='2/3' bg='muted.300' borderRadius='xl' p='15px'>
            <FlatList
                data={favoriteRoutes}
                renderItem={({ item }) =>
                    <Box
                        borderBottomWidth='1'
                        borderColor='muted.800'
                        pl={['0', '4']} pr={['0', '5']} >
                        <Text>{item.shortName}</Text>
                    </Box>} />
        </Box>
    )
}