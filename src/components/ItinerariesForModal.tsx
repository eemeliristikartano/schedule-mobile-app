import { Box, Stack, Flex, Divider, Text, Modal } from "native-base";
import React from "react";
import { FavoriteRoute, Itineraries } from "../types/Types";
import { Ionicons } from '@expo/vector-icons';

type Props = {
    route: FavoriteRoute
    itineraries: Itineraries[]
}

export default function ItinerariesForModal({ route, itineraries }: Props) {

    const returnEmoji = (mode: string) => {
        switch (mode) {
            case 'WALK':
                return '🚶‍♂️';
            case 'RAIL':
                return '🚊';
            case 'BUS':
                return '🚌';
            case 'SUBWAY':
                return '🚇';
            default:
                return mode;
        }
    }

    return (
        <Modal.Body>
            {
                itineraries.map((plan, i) =>
                    <Box key={i}>
                        {plan.legs.map((leg, i) =>
                            <Box p={5} key={i}>
                                <Stack space={7}>
                                    <Flex flexDir='row' justifyContent='space-evenly'>
                                        <Text bold fontSize='lg'>{leg.from.name === 'Origin' ? route?.nameFrom : leg.from.name}</Text>
                                        <Ionicons name="arrow-forward-outline" size={18} />
                                        <Text bold fontSize='lg'>{leg.to.name === 'Destination' ? route?.nameTo : leg.to.name}</Text>
                                    </Flex>
                                    <Flex flexDir='row' justifyContent='space-evenly'>
                                        <Text fontSize='lg'>{new Date(leg.startTime).getHours().toString().padStart(2, '0')}:{new Date(leg.startTime).getMinutes().toString().padStart(2, '0')}</Text>
                                        <Ionicons name="arrow-forward-outline" size={18} />
                                        <Text fontSize='lg'>{new Date(leg.endTime).getHours().toString().padStart(2, '0')}:{new Date(leg.endTime).getMinutes().toString().padStart(2, '0')}</Text>
                                    </Flex>
                                    <Flex flexDir='row' justifyContent='space-evenly'>
                                        <Text fontSize='lg'>{returnEmoji(leg.mode)}</Text>
                                        <Text fontSize='lg'>{leg.route ? leg.route.shortName : ''}</Text>
                                    </Flex>
                                </Stack>

                                <Divider />
                            </Box>
                        )}
                        <Divider thickness={5} />
                    </Box>)
            }
        </Modal.Body>
    )
}