import { Stop } from "../types/Types";
import { push, ref } from 'firebase/database';
import { database } from "../../dbconfig";

export default function SaveStopToFirebase(stop: Stop, userUid: string) {
    push(
        ref(database, `favoriteStops/${userUid}`),
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