import { Box, Button, Divider, FlatList, Flex, Icon, IconButton, Text } from "native-base";
import { useState, useEffect } from 'react'
import { ref, onValue } from "firebase/database";
import { database } from "../../dbconfig";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import AddFavoriteRoute from "./AddFavoriteRoute";
import ItineraryPlanModal from "./ItineraryPlanModal";
import { FavoriteRoute } from "../types/Types";
import RemoveStopFromFirebase from "../utils/RemoveStopFromFirebase";
import { Ionicons } from '@expo/vector-icons';
import RemoveRouteFromFirebase from "../utils/RemoveRouteFromFirebase";

export default function FavoriteRoutes() {
    const [route, setRoute] = useState<FavoriteRoute>();
    const [showItineraryModal, setShowItineraryModal] = useState<boolean>(false);
    const [showAddRouteModal, setShowAddRouteModal] = useState<boolean>(false);
    const [favoriteRoutes, setFavoriteRoutes] = useState<FavoriteRoute[]>();

    const getFavoriteRoutes = () => {
        const itemsRefs = ref(database, 'favoriteRoutes/');
        onValue(itemsRefs, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const keys = Object.keys(data);
                const dataWithKeys = Object.values(data).map((obj: any, index) => {
                    return { ...obj, key: keys[index] }
                });
                setFavoriteRoutes(dataWithKeys);
            }
        });
    }

    useEffect(() => {
        getFavoriteRoutes();
    }, [])

    const closeAddRouteModal = () => {
        getFavoriteRoutes();
        setShowAddRouteModal(false);
    }

    const handelItineraryModal = (item: FavoriteRoute) => {
        setRoute(item);
        setShowItineraryModal(true);
    }

    const closeItineraryModal = () => setShowItineraryModal(false);

    return (
        <Box variant='homeScreenBox'>
            <Flex flexDir='row'>
                <Text marginLeft='20px' w='5/6' textAlign='center' bold fontSize='2xl' marginBottom='3' >Suosikkireitit</Text>
                <IconButton
                    w='1/6'
                    size='lg'
                    icon={<Icon as={Ionicons} name="add-circle" />}
                    onPress={() => setShowAddRouteModal(true)}
                />
            </Flex>
            <FlatList
                data={favoriteRoutes}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => handelItineraryModal(item)}>
                        <Box p='2' flexDir='row'>
                            <Text w='4/5' variant='homeScreenBoxText' >{item.nameFrom} - {item.nameTo}</Text>
                            <IconButton
                                w='1/5'
                                icon={<Icon as={Ionicons} name="trash" />}
                                onPress={() => RemoveRouteFromFirebase(item.key)}
                            />
                        </Box>
                        <Divider bg='muted.200' marginTop='2' />
                    </TouchableOpacity>
                } />
            <AddFavoriteRoute showModal={showAddRouteModal} closeModal={closeAddRouteModal} />
            <ItineraryPlanModal route={route} showItineraryModal={showItineraryModal} closeItineraryModal={closeItineraryModal} />
        </Box>
    )
}