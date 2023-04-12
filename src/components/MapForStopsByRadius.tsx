import MapView, { Marker } from "react-native-maps";
import { Stops } from "../types/Types";
import { useEffect, useState } from "react";
import { API_KEY } from "@env";
import TimetableModal from "./TimetableModal";

export default function MapForStopsByRadius() {
    const [stops, setStops] = useState<Stops[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [gtfsId, setGtfsId] = useState<string>('');


    const handleShowModal = (gtfsId: string) => {
        setGtfsId(gtfsId);
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);


    useEffect(() => {
        getStopsByRadius();
    }, []);


    const getStopsByRadius = async () => {
        const body = `{
            stopsByRadius(lat:60.199, lon:24.938, radius:500) {
              edges {
                node {
                  stop {
                    gtfsId
                    name
                    lat
                    lon
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
        setStops(responseData.data.stopsByRadius.edges);
    }

    return (
        <>
            <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                    latitude: 60.1709963199927,
                    longitude: 24.935126933661387,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04
                }}
            >
                {stops.map((stop, index) =>
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: stop.node.stop.lat,
                            longitude: stop.node.stop.lon
                        }}
                        title={stop.node.stop.name}
                        onPress={() => handleShowModal(stop.node.stop.gtfsId)} />)}
            </MapView>
            <TimetableModal showModal={showModal} gtfsId={gtfsId} closeModal={handleCloseModal} />
        </>
    )
}