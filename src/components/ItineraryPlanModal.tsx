import { Modal, Spinner } from "native-base";
import { FavoriteRoute, Itineraries } from "../types/Types";
import React, { useState, useEffect } from 'react'
import { API_KEY } from "@env";

import ItinerariesForModal from "./ItinerariesForModal";

type Props = {
    route: FavoriteRoute | undefined
    showItineraryModal: boolean,
    closeItineraryModal: () => void
}

export default function ItineraryPlanModal({ route, showItineraryModal, closeItineraryModal }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [itineraries, setItineraries] = useState<Itineraries[]>([]);


    useEffect(() => {
        if (showItineraryModal) getItineraries();
    }, [route]);

    const getItineraries = async () => {
        try {
            const body = `{
                plan(
                    from: {lat: ${route?.latFrom}, lon: ${route?.lonFrom}}
                    to: {lat: ${route?.latTo}, lon: ${route?.lonTo}}
                    numItineraries: 3
                  ) {
                    itineraries {
                      legs {
                        from {
                            name
                        }
                        to {
                            name
                        }
                        startTime
                        endTime
                        mode
                        duration
                        distance
                        route{
                          shortName
                        }
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
            setItineraries(responseData.data.plan.itineraries);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        !isLoading ?
            <Modal size='full' isOpen={showItineraryModal}
                onClose={() => closeItineraryModal()}
            >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Reittisuunnitelmat</Modal.Header>
                    <ItinerariesForModal route={route!} itineraries={itineraries} />
                </Modal.Content>
            </Modal>
            :
            <Modal isOpen={showItineraryModal} onClose={() => closeItineraryModal()} size='full' >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Body>
                        <Spinner accessibilityLabel="Loading" />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
    )
}