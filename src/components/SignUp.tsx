import { Box, Button, Center, FormControl, Input, Stack, Text } from 'native-base';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


export default function SignUp() {
    const auth = getAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const submit = async () => {
        try {
            await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Box w='90%' marginTop='50px'>
            <FormControl isRequired={true}>
                <Stack space={5}>
                    <Center>
                        <Text bold fontSize='2xl'>Luo käyttäjä</Text>
                    </Center>
                    <FormControl.Label>Sähköposti</FormControl.Label>
                    <Input
                        type='text'
                        onChangeText={(input) => setCredentials({ ...credentials, email: input })}
                    />
                    <FormControl.HelperText>Täytyy olla vähintään 7 merkkiä pitkä</FormControl.HelperText>
                    <FormControl.Label>Salasana</FormControl.Label>
                    <Input
                        type='password'
                        onChangeText={(input) => setCredentials({ ...credentials, password: input })}
                    />
                    <FormControl.HelperText>Täytyy olla vähintään 5 merkkiä pitkä</FormControl.HelperText>
                    <Button isDisabled={credentials.email.length < 7 || credentials.password.length < 5} onPress={() => submit()} >Rekisteröidy</Button>
                </Stack>
            </FormControl >
        </Box>
    )
}