import { ref, remove } from 'firebase/database';
import { database } from "../../dbconfig";

export default function RemoveStopFromFirebase(key: string, userUid: string) {
    remove(ref(database, `favoriteRoutes/${userUid}/${key}`));
}