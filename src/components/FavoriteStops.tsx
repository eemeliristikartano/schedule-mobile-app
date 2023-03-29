import { Box, Divider, FlatList, HStack, Text } from "native-base";
import { useState, useEffect } from 'react'

type a = {
    data: Stops[]
}
type Stops = {
    "gtfsId": string,
    "name": string
}

export default function FavoriteStops() {
    const [favoriteStops, setFavoriteStops] = useState<Stops[]>([]);

    useEffect(() => {
        getStops();
    }, []);

    const getStops = async () => {
        const body = `{
                        stops(name: "Tuomarila", maxResults: 5) {
                            gtfsId
                            name
                        }
                    }`
        const config = {
            headers: { "Content-Type": "application/graphql" },
            method: "POST",
            body: body
        }

        const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', config);
        if (!response.ok) {
            console.error(response.status);
        }
        const responseData = await response.json();
        setFavoriteStops(responseData.data.stops)

    }



    return (
        <Box variant='homeScreenBox'>
            <FlatList
                data={favoriteStops}
                renderItem={({ item }) =>
                    <Box p='2' >
                        <Text variant='homeScreenBoxText'>{item.name}</Text>
                        <Divider bg='muted.200' marginTop='2' />
                    </Box>
                } />
        </Box>
    )
}