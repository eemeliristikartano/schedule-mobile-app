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

export type Stops = {
    node: Node

}

type Node = {
    stop: Stop
}

export type Stop = {
    gtfsId: string
    name: string
    lat: number
    lon: number
    desc: string
    code: string
    key: string
}

export type FoundAddresses = {
    from: Address
    to: Address
}

type Address = {
    features: Features[]
    key: string
}

type Features = {
    geometry: Coordinates
    properties: Properties
}

type Coordinates = {
    coordinates: number[]
}

type Properties = {
    street: string
    housenumber: string
    postalcode: string
    locality: string
    name: string
}

export type Route = {
    key: string,
    latFrom: number
    lonFrom: number
    latTo: number
    lonTo: number
    nameFrom: string
    nameTo: string
}

