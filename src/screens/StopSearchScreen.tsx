import { API_KEY } from '@env';
import { Button, Flex, FormControl, Input } from 'native-base';
import { useState } from 'react'
import { Stop } from "../types/Types";
import StopsFromSearch from '../components/StopsFromSearch';


export default function StopSearchScreen() {
    const [searchWord, setSearchWord] = useState<string>('');
    const [stops, setStops] = useState<Stop[]>([]);

    const getStops = async () => {
        const body = `{
            stops(name: "${searchWord}") {
              gtfsId
              name
              code
              lat
              lon
              desc
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
        <>
            <FormControl marginTop='5px'>
                <Flex direction='row' justify='space-evenly'>
                    <Input
                        type='text'
                        placeholder='Hakusana'
                        onChangeText={(word) => setSearchWord(word)}
                        width='80%'
                    />
                    <Button onPress={() => getStops()} >Hae</Button>
                </Flex>
            </FormControl>
            <StopsFromSearch stops={stops} />
        </>
    )
}