
import { ref, remove } from 'firebase/database';
import { database } from "../../dbconfig";

export default function RemoveStopFromFirebase(key: string) {
    remove(ref(database, `favoriteStops/${key}`));
}