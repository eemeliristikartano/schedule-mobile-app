import { type } from "node:os"

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

export type FavoriteRoute = {
    key: string,
    latFrom: number
    lonFrom: number
    latTo: number
    lonTo: number
    nameFrom: string
    nameTo: string
}

export type Itineraries = {
    legs: Legs[]
}

type Legs = {
    from: From
    to: To
    startTime: number
    endTime: number
    mode: string
    duration: number
    distance: number
    route: Route
}

type From = {
    name: string
}

type To = {
    name: string
}

type Route = {
    shortName: string
}

