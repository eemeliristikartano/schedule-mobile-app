import { Box, Text, Divider, Flex } from "native-base";
import { Timetable } from "../types/Types";
import { formatTime } from "../utils/FormatTime";
import { countHours, countMinutes } from "../utils/TimeCalculations";

type Props = {
    timetable: Timetable | undefined
}


export default function TrainTimetable({ timetable }: Props) {
    return (
        <>
            <Flex flexDirection='row' justify="space-between" >
                <Text fontSize='15' fontWeight='bold' >Koodi</Text>
                <Text fontSize='15' fontWeight='bold' >Määränpää</Text>
                <Text fontSize='15' fontWeight='bold' >Saapumisaika</Text>
                <Text fontSize='15' fontWeight='bold' >Rata</Text>
            </Flex>
            <Divider />
            {timetable?.stoptimesWithoutPatterns.map((trip, i) =>
                <Box key={i}>
                    <Flex flexDirection='row' p='3' justify="space-between" >
                        <Text>{trip.trip.routeShortName}</Text>
                        <Text>{trip.headsign}</Text>
                        <Text>{formatTime(countHours(trip.scheduledArrival))}:{formatTime(countMinutes(trip.scheduledArrival))}</Text>
                        <Text>{timetable.platformCode}</Text>
                    </Flex>
                    <Divider />
                </Box>
            )}
        </>
    )
}