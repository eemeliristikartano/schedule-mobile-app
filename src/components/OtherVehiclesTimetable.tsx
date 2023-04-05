import { Box, Text, Divider, Flex } from "native-base";
import { Timetable } from "../types/Types";

type Props = {
    timetable: Timetable | undefined
}

// Component for tram, bus and subway timetable.

export default function OtherVehicleTimetable({ timetable }: Props) {
    return (
        <>
            <Flex flexDirection='row' justify="space-between" >
                <Text fontSize='15' fontWeight='bold' >Koodi</Text>
                <Text fontSize='15' fontWeight='bold' >Määränpää</Text>
                <Text fontSize='15' fontWeight='bold' >Saapumisaika</Text>
            </Flex>
            <Divider />
            {timetable?.stoptimesWithoutPatterns.map((trip, i) =>
                <Box key={i}>
                    <Flex flexDirection='row' p='3' justify="space-between" >
                        <Text>{trip.trip.routeShortName}</Text>
                        <Text>{trip.headsign}</Text>
                        <Text>{trip.scheduledArrival}</Text>
                    </Flex>
                    <Divider />
                </Box>
            )}
        </>
    )
}