import { Flex } from "native-base";
import FavoriteRoutes from "../components/FavoriteRoutes";
import FavoriteStops from "../components/FavoriteStops";

export default function HomeScreen() {

    return (
        <Flex h='100%' w='100%' alignItems="center" justify='space-evenly'>
            <FavoriteStops />
            <FavoriteRoutes />
        </Flex >
    )
}