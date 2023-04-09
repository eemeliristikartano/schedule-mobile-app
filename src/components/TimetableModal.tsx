import { Button, Modal, Spinner } from "native-base";
import { useState, useEffect } from "react";
import { TTimetable } from "../types/Types";
import { API_KEY } from "@env";
import Timetable from "./Timetable";
import { Ionicons } from '@expo/vector-icons';

type Props = {
    showModal: boolean
    gtfsId: string
    closeModal: () => void
}

export default function TimetableModal({ gtfsId, showModal, closeModal }: Props) {
    const [timetable, setTimetable] = useState<TTimetable>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (showModal) getTimetable(); // Gets timetable only if the state is undefined. 
    }, [showModal]);

    const getTimetable = async () => {
        const body = `{
            stop(id: "${gtfsId}") {
              name
              platformCode
              vehicleMode
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
                            variant='ghost'
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