import { API_KEY } from "@env";
import { Box, Button, Divider, FlatList, FormControl, Input, Modal, Stack, Text } from "native-base";
import { useState, useEffect } from 'react'
import { FoundAddresses } from "../types/Types";
import SaveRouteToFirebase from "../utils/SaveRouteToFirebase";
import { ref, onValue } from "firebase/database";
import { database } from "../../dbconfig";
import { TouchableWithoutFeedback } from "react-native";

type Props = {
    showModal: boolean
    closeModal: () => void
}


export default function AddFavoriteRoute({ showModal, closeModal }: Props) {
    const [searchWords, setSearchWords] = useState({
        from: "",
        to: ""
    });
    const [foundAddresses, setFoundAddresses] = useState<FoundAddresses>();

    const getData = async () => {
        const config = {
            headers: { "digitransit-subscription-key": API_KEY }
        };
        try {
            const responseForFrom = await fetch(`https://api.digitransit.fi/geocoding/v1/search?text=${searchWords.from}&size=1`, config);
            const responseForTo = await fetch(`https://api.digitransit.fi/geocoding/v1/search?text=${searchWords.to}&size=1`, config);
            const dataForFrom = await responseForFrom.json()
            const dataForTo = await responseForTo.json()
            setFoundAddresses({
                from: dataForFrom,
                to: dataForTo
            })

        } catch (error) {

        }
        SaveRouteToFirebase(foundAddresses!);

    }

    return (
        <Modal
            isOpen={showModal}
            size='full'
            onClose={() => closeModal()}
        >
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Lisää suosikkireitti</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <Stack space={3}>
                            <FormControl.Label>Lähtöosoite</FormControl.Label>
                            <Input
                                onChangeText={input => setSearchWords({ ...searchWords, from: input })}
                                placeholder="Osoite" />
                            <FormControl.Label>Kohdeosoite</FormControl.Label>
                            <Input
                                onChangeText={input => setSearchWords({ ...searchWords, to: input })}
                                placeholder="Osoite" />
                            <Button onPress={() => getData()}  >Tallenna</Button>
                        </Stack>
                    </FormControl>
                </Modal.Body>
            </Modal.Content>

        </Modal>
    )

}