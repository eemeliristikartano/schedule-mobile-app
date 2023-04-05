import { Box, Divider, FlatList, HStack, Text } from "native-base";
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
        <Box variant='homeScreenBox'>
            <Text textAlign='center' bold fontSize='2xl' marginBottom='3' >Suosikkireitit</Text>
            <FlatList
                data={favoriteRoutes}
                renderItem={({ item }) =>
                    <Box p='2'>
                        <Text variant='homeScreenBoxText' >{item.shortName} {item.longName}</Text>
                        <Divider bg='muted.200' marginTop='2' />
                    </Box>
                } />
        </Box>
    )
}