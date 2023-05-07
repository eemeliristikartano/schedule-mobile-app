import { Box, Button, Center, Flex, Stack, Text, View } from "native-base";
import SignInScreen from "./SignInScreen";
import { useState } from "react";
import SignUpScreen from "./SignUpSrceen";

export default function WelcomeScreen() {
    const [option, setOption] = useState<number>(0);

    return (
        <View marginTop='200px' p='2px'>
            <Center>
                <Box flexDir='row'>
                    <Button backgroundColor={option === 0 ? 'primary.400' : 'muted.500'} onPress={() => setOption(0)} >Kirjaudu sisään</Button>
                    {' '}
                    <Button backgroundColor={option === 1 ? 'primary.400' : 'muted.500'} onPress={() => setOption(1)}>Rekisteröidy</Button>
                </Box>
                {
                    option === 0 ?
                        <SignInScreen />
                        :
                        <SignUpScreen />
                }
            </Center>
        </View>
    )
}