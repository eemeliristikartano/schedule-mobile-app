import { Icon, IconButton, Modal, Spinner } from "native-base";
import { useState, useEffect } from "react";
import { Stop, TTimetable, UsersFavoriteStops } from "../types/Types";
import { API_KEY } from "@env";
import Timetable from "./Timetable";
import { Ionicons } from '@expo/vector-icons';

import { ref, get, orderByChild, query } from 'firebase/database';
import { database } from "../../dbconfig";
import SaveStopToFirebase from "../utils/SaveStopToFirebase";
import RemoveStopFromFirebase from "../utils/RemoveStopFromFirebase";

type Props = {
    showModal: boolean
    stop: Stop | undefined
    closeModal: () => void
}

export default function TimetableModal({ stop, showModal, closeModal }: Props) {
    const [timetable, setTimetable] = useState<TTimetable>();
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteStopIds, setFavoriteStopIds] = useState<UsersFavoriteStops[]>([]);

    useEffect(() => {
        if (showModal) getTimetable(); // Gets timetable only if the state is undefined. 
    }, [showModal]);


    const getTimetable = async () => {
        const body = `{
            stop(id: "${stop?.gtfsId}") {
              platformCode
              vehicleMode
              desc
              gtfsId
              name
              code
              lat
              lon
                stoptimesWithoutPatterns(numberOfDepartures: 10) {
                scheduledArrival
                realtimeArrival
                arrivalDelay
                scheduledDeparture
                realtimeDeparture
                departureDelay
                realtime
                realtimeState
                serviceDay
                headsign
                trip {
                    routeShortName
                }
              }
            }  
          }`;
        const config = {
            headers: { "Content-Type": "application/graphql", "digitransit-subscription-key": API_KEY },
            method: "POST",
            body: body
        }

        const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', config);
        if (!response.ok) {
            console.error(response.status);
        }
        const responseData = await response.json();
        setTimetable(responseData.data.stop);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchFavoriteStops();
    }, [stop]);

    const fetchFavoriteStops = async () => {
        const favoriteStopsRef = ref(database, "favoriteStops/");
        const favoriteStopsQuery = query(favoriteStopsRef, orderByChild("gtfsId"));
        try {
            const snapshot = await get(favoriteStopsQuery);
            const data = snapshot.val();
            if (data) {
                const keys = Object.keys(data);
                const dataWithKeys = Object.values(data).map((obj: any, index) => {
                    return { ...obj, key: keys[index] }
                });
                setFavoriteStopIds(dataWithKeys);
            }
        } catch (error) {
            console.log(error);
        }
    }




    const isUsersFavoriteStop = (gtfsId: string) => favoriteStopIds.find((element) => element.gtfsId === gtfsId)


    return (
        !isLoading ?
            <Modal
                isOpen={showModal}
                onClose={() => {
                    closeModal();
                    setTimetable(undefined);
                    setIsLoading(true);
                }
                }
                size='full' >
                <Modal.Content>
                    <Modal.CloseButton />

                    <Modal.Header flexDirection='row' justifyContent='space-between' >{timetable?.name} </Modal.Header>
                    <Modal.Body>
                        <Timetable timetable={timetable} />
                    </Modal.Body>
                    <Modal.Footer>
                        {isUsersFavoriteStop(stop!.gtfsId) ?
                            <IconButton
                                size='lg'
                                icon={<Icon as={Ionicons} name='star' />}
                                onPress={() => {
                                    RemoveStopFromFirebase(favoriteStopIds.find((stopa) => stopa.gtfsId === stop!.gtfsId)!.key);
                                    fetchFavoriteStops();
                                }}
                            />
                            :
                            <IconButton
                                size='lg'
                                icon={<Icon as={Ionicons} name='star-outline' />}
                                onPress={() => {
                                    SaveStopToFirebase(stop!)
                                    fetchFavoriteStops();
                                }}
                            />
                        }
                        <IconButton
                            size='lg'
                            onPress={() => {
                                setIsLoading(true);
                                getTimetable();
                            }}
                            icon={<Icon as={Ionicons} name='refresh' />} />
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            :
            <Modal isOpen={showModal} onClose={() => closeModal()} size='full' >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Body>
                        <Spinner accessibilityLabel="Loading" />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
    )

}