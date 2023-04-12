import { Stop } from "../types/Types";
import { push, ref, onValue } from 'firebase/database';
import { database } from "../../dbconfig";

export default function SaveStopToFirebase(stop: Stop) {
    push(
        ref(database, 'favoriteStops/'),
        {
            gtfsId: stop.gtfsId,
            name: stop.name,
            lat: stop.lat,
            lon: stop.lon,
            desc: stop.desc,
            code: stop.code
        }
    )
}