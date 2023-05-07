import { Box, Button, Center, FormControl, Input, Stack, Text } from 'native-base';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function SignIn() {
    const auth = getAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const submit = async () => {
        try {
            await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Box w='90%' marginTop='50px'>
            <FormControl isRequired={true}>
                <Stack space={5}>
                    <Center>
                        <Text bold fontSize='2xl'>Kirjaudu sisään</Text>
                    </Center>
                    <FormControl.Label>Käyttäjänimi</FormControl.Label>
                    <Input
                        type='text'
                        onChangeText={(input) => setCredentials({ ...credentials, email: input })}
                    />
                    <FormControl.Label>Salasana</FormControl.Label>
                    <Input
                        type='password'
                        onChangeText={(input) => setCredentials({ ...credentials, password: input })}
                    />
                    <Button isDisabled={credentials.email.length < 7 || credentials.password.length < 5} onPress={() => submit()} >Kirjaudu sisään</Button>
                </Stack>
            </FormControl>
        </Box>
    )
}