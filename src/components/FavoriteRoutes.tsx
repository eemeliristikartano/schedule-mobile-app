import { Box, Button, Divider, FlatList, Text } from "native-base";
import { useState, useEffect } from 'react'
import { ref, onValue } from "firebase/database";
import { database } from "../../dbconfig";
import { TouchableWithoutFeedback } from "react-native";
import AddFavoriteRoute from "./AddFavoriteRoute";
import ItineraryPlanModal from "./ItineraryPlanModal";
import { Route } from "../types/Types";

export default function FavoriteRoutes() {
    const [route, setRoute] = useState<Route>();
    const [showItineraryModal, setShowItineraryModal] = useState<boolean>(false);
    const [showAddRouteModal, setShowAddRouteModal] = useState<boolean>(false);
    const [favoriteRoutes, setFavoriteRoutes] = useState<Route[]>();

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

    const closeAddRouteModal = () => setShowAddRouteModal(false);

    const handelItineraryModal = (item: Route) => {
        setRoute(item);
        setShowItineraryModal(true);
    }

    const closeItineraryModal = () => setShowItineraryModal(false);

    return (
        <Box variant='homeScreenBox'>
            <Text textAlign='center' bold fontSize='2xl' marginBottom='3' >Suosikkireitit</Text>
            <Button onPress={() => setShowAddRouteModal(true)} >Lisää reitti</Button>
            <FlatList
                data={favoriteRoutes}
                renderItem={({ item }) =>
                    <TouchableWithoutFeedback onPress={() => handelItineraryModal(item)} >
                        <Box p='2'>
                            <Text variant='homeScreenBoxText' >{item.nameFrom} - {item.nameTo}</Text>
                            <Divider bg='muted.200' marginTop='2' />
                        </Box>
                    </TouchableWithoutFeedback>
                } />
            <AddFavoriteRoute showModal={showAddRouteModal} closeModal={closeAddRouteModal} />
            <ItineraryPlanModal route={route} showItineraryModal={showItineraryModal} closeItineraryModal={closeItineraryModal} />
        </Box>
    )
}