export type UsersFavoriteStops = {
    gtfsId: string
    name: string
}

export type TTimetable = {
    name: string
    platformCode: string
    vehicleMode: string
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
    id: string
}

