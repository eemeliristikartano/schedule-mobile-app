import MapView, { Marker } from "react-native-maps";
import { Stop, Stops } from "../types/Types";
import { useEffect, useState } from "react";
import { API_KEY } from "@env";
import TimetableModal from "./TimetableModal";
import * as Location from 'expo-location';
import { View, Text, Spinner, Center } from "native-base";

export default function MapForStopsByRadius() {
    const [stops, setStops] = useState<Stops[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [stop, setStop] = useState<Stop>();
    const [location, setLocation] = useState({
        lat: -1,
        lon: -1
    })


    const handleShowModal = (stop: Stop) => {
        setStop(stop);
        setShowModal(true);
    }

    const handleCloseModal = () => setShowModal(false);


    useEffect(() => {
        getStopsByRadius();
    }, []);


    const getStopsByRadius = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status != 'granted') {

                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setLocation({ lat: latitude, lon: longitude });
            const body = `{
                stopsByRadius(lat:${latitude}, lon:${longitude}, radius:1000) {
                  edges {
                    node {
                      stop {
                        gtfsId
                        name
                        lat
                        lon
                        desc
                        code
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
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                    latitude: location.lat,
                    longitude: location.lon,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04
                }}
                region={{
                    latitude: location.lat,
                    longitude: location.lon,
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
                        onPress={() => handleShowModal(stop.node.stop)} />)}
            </MapView>
            <TimetableModal showModal={showModal} stop={stop} closeModal={handleCloseModal} />
        </>
    )
}