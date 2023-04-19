import { Box, Text, Divider, Flex, Stack } from "native-base";
import { TTimetable } from "../types/Types";
import { formatTime } from "../utils/FormatTime";

type Props = {
    timetable: TTimetable | undefined
}


export default function Timetable({ timetable }: Props) {
    return (
        <>
            <Flex flexDirection='row' justify="space-between" >
                <Text fontSize='15' fontWeight='bold' >Tunnus</Text>
                <Text fontSize='15' fontWeight='bold' >Määränpää</Text>
                <Text fontSize='15' fontWeight='bold' >Lähtee</Text>
                {timetable?.vehicleMode === "RAIL" && <Text fontSize='15' fontWeight='bold' >Rata</Text>}
            </Flex>
            <Divider />
            {timetable?.stoptimesWithoutPatterns.map((trip, i) =>
                <Box key={i}>
                    <Flex flexDirection='row' p='3' justify="space-between" >
                        <Text>{trip.trip.routeShortName}</Text>
                        <Text>{trip.headsign}</Text>
                        {trip.departureDelay < 60 ?
                            <Text bold color={trip.realtime ? 'green.600' : 'black'} >{formatTime(trip.scheduledDeparture)}</Text>
                            :
                            <Flex flexDirection='row' >
                                <Stack space={1} direction='row'>
                                    <Text strikeThrough >{formatTime(trip.scheduledDeparture)}</Text>
                                    <Text bold color={trip.realtime ? 'green.600' : 'black'}>{formatTime(trip.realtimeDeparture)}</Text>
                                </Stack>
                            </Flex>
                        }
                        {timetable.vehicleMode === "RAIL" && <Text>{timetable.platformCode}</Text>}
                    </Flex>
                    <Divider />
                </Box>
            )}
        </>
    )
}