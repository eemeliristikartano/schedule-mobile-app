import { Stop } from "../types/Types";
import { push, ref, onValue } from 'firebase/database';
import { database } from "../../dbconfig";

export default function SaveStopToFirebase(stop: Stop) {
    push(
        ref(database, 'favoriteStops/1'),
        {
            gtfsId: stop.gtfsId,
            name: stop.name,
            lat: stop.lat,
            lon: stop.lon,
            desc: stop.desc,
            code: stop.code,
            gtfsId_useId: `${stop.gtfsId}_1234`
        }
    )
}