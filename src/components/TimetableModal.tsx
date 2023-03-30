import { Box, Modal, Text, Divider, Spinner } from "native-base";
import { useState, useEffect } from "react";
import { Timetable } from "../types/Types";

type Props = {
    showModal: boolean
    gtfsId: string
    closeModal: () => void
}

export default function TimetableModal({ gtfsId, showModal, closeModal }: Props) {
    const [timetable, setTimetable] = useState<Timetable>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (showModal) getTimetable();
    }, [showModal]);

    const getTimetable = async () => {
        const body = `{
            stop(id: "${gtfsId}") {
              name
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
              }
            }  
          }`;
        const config = {
            headers: { "Content-Type": "application/graphql" },
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
                    <Modal.Header>{timetable?.name}</Modal.Header>
                    <Modal.Body>
                        {timetable?.stoptimesWithoutPatterns.map((a, index) =>
                            <Box key={index} p='2'>
                                <Text variant='homeScreenBoxText'  >{a.headsign} {a.scheduledArrival} {a.realtimeArrival} </Text>
                                <Divider />
                            </Box>)

                        }

                    </Modal.Body>
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