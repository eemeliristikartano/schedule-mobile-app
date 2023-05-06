import { Box, Button, Divider, FlatList, Icon, IconButton, Text } from "native-base";
import { useState, useEffect } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Stop } from "../types/Types";
import TimetableModal from "./TimetableModal";
import { ref, onValue } from 'firebase/database';
import { database } from "../../dbconfig";
import RemoveStopFromFirebase from "../utils/RemoveStopFromFirebase";
import { Ionicons } from '@expo/vector-icons';

export default function FavoriteStops() {
    const [favoriteStops, setFavoriteStops] = useState<Stop[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [stop, setStop] = useState<Stop>();

    const handleShowModal = (stop: Stop) => {
        setStop(stop);
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => getFavoriteStops(), [])

    const getFavoriteStops = () => {
        const itemsRefs = ref(database, 'favoriteStops/');
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
                    <TouchableOpacity onPress={() => handleShowModal(item)}>
                        <Box p='2' flexDir='row'>
                            <Text w='3/4' variant='homeScreenBoxText'>{item.name}</Text>
                            <IconButton
                                w='1/4'
                                icon={<Icon as={Ionicons} name="trash" />}
                                onPress={() => RemoveStopFromFirebase(item.key)}
                            />
                        </Box>
                        <Divider bg='muted.200' marginTop='2' />
                    </TouchableOpacity>
                } />
            <TimetableModal showModal={showModal} stop={stop} closeModal={handleCloseModal} />
        </Box>
    )
}