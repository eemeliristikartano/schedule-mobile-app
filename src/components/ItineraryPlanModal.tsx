import { Modal } from "native-base";
import { Route } from "../types/Types";

type Props = {
    route: Route | undefined
    showItineraryModal: boolean,
    closeItineraryModal: () => void
}

export default function ItineraryPlanModal({ route, showItineraryModal, closeItineraryModal }: Props) {
    console.log(route);
    return (
        <Modal size='full' isOpen={showItineraryModal}
            onClose={() => closeItineraryModal()}
        >
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Hei</Modal.Header>
            </Modal.Content>
        </Modal>
    )
}