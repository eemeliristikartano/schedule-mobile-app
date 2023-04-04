import { Box, Text } from "native-base";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect, useLayoutEffect } from 'react'
import { API_KEY } from "@env";

type Stops = {
    gtfsId: string
    name: string
    lat: number
    lon: number
}

export default function MapScreen() {
    const [stops, setStops] = useState<Stops[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useLayoutEffect(() => {
        getStops();
    }, [])

    const getStops = async () => {
        const body = `{
            stops {
              gtfsId
              name
              lat
              lon
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
        setStops(responseData.data.stops);
    }


    return (
        <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={{ latitude: 60.1709963199927, longitude: 24.935126933661387, latitudeDelta: 0.09, longitudeDelta: 0.04 }}
        >

            {stops.map(stop => <Marker key={stop.gtfsId} coordinate={{ latitude: stop.lat, longitude: stop.lon }} />)}



        </MapView>
    )
}