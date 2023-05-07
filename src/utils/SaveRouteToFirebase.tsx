import { FoundAddresses, Stop } from "../types/Types";
import { push, ref } from 'firebase/database';
import { database } from "../../dbconfig";
import { useAuthentication } from "./useAuthentication";

export default function SaveRouteToFirebase(addresses: FoundAddresses) {
    push(
        ref(database, `favoriteRoutes/`),
        {
            nameFrom: addresses.from.features[0].properties.name,
            latFrom: addresses.from.features[0].geometry.coordinates[1],
            lonFrom: addresses.from.features[0].geometry.coordinates[0],
            nameTo: addresses.to.features[0].properties.name,
            latTo: addresses.to.features[0].geometry.coordinates[1],
            lonTo: addresses.to.features[0].geometry.coordinates[0],
        }
    )
}