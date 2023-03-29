import { Box, Divider, FlatList, HStack, Text } from "native-base";
import { useState, useEffect } from 'react'
import { TouchableWithoutFeedback } from "react-native";
import { UsersFavoriteStops } from "../types/Types";
import TimetableModal from "./TimetableModal";


export default function FavoriteStops() {
    const [favoriteStops, setFavoriteStops] = useState<UsersFavoriteStops[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [gtfsId, setGtfsId] = useState<string>('');

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

    const handleShowModal = (gtfsId: string) => {
        setGtfsId(gtfsId);
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);



    return (
        <Box variant='homeScreenBox'>
            <FlatList
                data={favoriteStops}
                keyExtractor={item => item.gtfsId}
                renderItem={({ item }) =>
                    <TouchableWithoutFeedback onPress={() => handleShowModal(item.gtfsId)} >
                        <Box p='2' >
                            <Text variant='homeScreenBoxText'>{item.name}</Text>
                            <Divider bg='muted.200' marginTop='2' />
                        </Box>
                    </TouchableWithoutFeedback>
                } />
            <TimetableModal showModal={showModal} gtfsId={gtfsId} closeModal={handleCloseModal} />
        </Box>
    )
}