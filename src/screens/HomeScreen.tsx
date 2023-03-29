import { Box, Center, Flex, Spacer, Text } from "native-base";
import FavoriteRoutes from "../components/FavoriteRoutes";
import FavoriteStops from "../components/FavoriteStops";

export default function HomeScreen() {

    return (
        <Flex h='2/3' w='100%' alignItems="center" justify='space-evenly' >
            <FavoriteStops />
            <FavoriteRoutes />
        </Flex >
    )
}