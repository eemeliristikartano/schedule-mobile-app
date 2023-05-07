import { API_KEY } from "@env";
import { Button, FormControl, Input, Modal, Stack } from "native-base";
import { useContext, useState } from 'react'
import { FoundAddresses } from "../types/Types";
import SaveRouteToFirebase from "../utils/SaveRouteToFirebase";
import { UserContext } from "../AppContext";

type Props = {
    showModal: boolean
    closeModal: () => void
}


export default function AddFavoriteRoute({ showModal, closeModal }: Props) {
    const userContext = useContext(UserContext);
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
            });
            SaveRouteToFirebase(foundAddresses!, userContext.userUid);
            setFoundAddresses(undefined);
            setSearchWords({ from: '', to: '' });
            closeModal();
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <Modal
            isOpen={showModal}
            size='full'
            onClose={() => {
                setFoundAddresses(undefined);
                closeModal();
            }}
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