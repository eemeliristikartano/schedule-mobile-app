export type UsersFavoriteStops = {
    gtfsId: string
    name: string
}

export type Timetable = {
    name: string
    stoptimesWithoutPatterns: StoptimesWithoutPatterns[]
}

type StoptimesWithoutPatterns = {
    scheduledArrival: number
    realtimeArrival: number
    arrivalDelay: number
    scheduledDeparture: number
    realtimeDeparture: number
    departureDelay: number
    realtime: boolean
    realtimeState: string
    serviceDay: number
    headsign: string
    trip: Trip
}

type Trip = {
    routeShortName: string
}

