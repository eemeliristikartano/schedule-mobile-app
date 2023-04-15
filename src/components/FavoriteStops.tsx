import { Box, Button, Divider, FlatList, Text } from "native-base";
import { useState, useEffect } from 'react'
import { TouchableWithoutFeedback } from "react-native";
import { Stop, UsersFavoriteStops } from "../types/Types";
import TimetableModal from "./TimetableModal";
import { ref, onValue } from 'firebase/database';
import { database } from "../../dbconfig";
import RemoveStopFromFirebase from "../utils/RemoveStopFromFirebase";

export default function FavoriteStops() {
    const [favoriteStops, setFavoriteStops] = useState<UsersFavoriteStops[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [stop, setStop] = useState<Stop>();

    const handleShowModal = (stop: Stop) => {
        setStop(stop);
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => getFavoriteStops(), [])

    const getFavoriteStops = () => {
        const itemsRefs = ref(database, 'favoriteStops/1');
        onValue(itemsRefs, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const keys = Object.keys(data);
                const dataWithKeys = Object.values(data).map((obj: any, index) => {
                    return { ...obj, key: keys[index] }
                });
                setFavoriteStops(dataWithKeys);
            }
        });
    }

    return (
        <Box variant='homeScreenBox'>
            <Text textAlign='center' bold fontSize='2xl' marginBottom='3' >Suosikkipysäkit</Text>
            <FlatList
                data={favoriteStops}
                keyExtractor={item => item.gtfsId}
                renderItem={({ item }) =>
                    <TouchableWithoutFeedback onPress={() => handleShowModal(item)} >
                        <Box p='2' >
                            <Text variant='homeScreenBoxText'>{item.name}</Text>
                            <Divider bg='muted.200' marginTop='2' />
                            <Button onPress={() => RemoveStopFromFirebase(item.key)} ></Button>
                        </Box>
                    </TouchableWithoutFeedback>
                } />
            <TimetableModal showModal={showModal} stop={stop} closeModal={handleCloseModal} />
        </Box>
    )
}