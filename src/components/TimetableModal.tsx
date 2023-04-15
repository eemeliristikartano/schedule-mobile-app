import { Button, Modal, Spinner } from "native-base";
import { useState, useEffect } from "react";
import { Stop, TTimetable } from "../types/Types";
import { API_KEY } from "@env";
import Timetable from "./Timetable";
import { Ionicons } from '@expo/vector-icons';

import { push, ref, onValue } from 'firebase/database';
import { database } from "../../dbconfig";
import SaveStopToFirebase from "../utils/SaveStopToFirebase";

type Props = {
    showModal: boolean
    stop: Stop | undefined
    closeModal: () => void
}

export default function TimetableModal({ stop, showModal, closeModal }: Props) {
    const [timetable, setTimetable] = useState<TTimetable>();
    const [isLoading, setIsLoading] = useState(true);

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
                        <Button
                            variant='ghost' onPress={() => SaveStopToFirebase(stop!)}
                        >
                            <Ionicons name='star-outline' size={20} />
                        </Button>
                        <Button
                            onPress={() => {
                                setIsLoading(true);
                                getTimetable();
                            }}
                            variant='ghost'
                        >
                            <Ionicons name='refresh' size={20} />
                        </Button>
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