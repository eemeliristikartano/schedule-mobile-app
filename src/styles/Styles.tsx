import { extendTheme } from "native-base"

export const theme = extendTheme({
    components: {
        Box: {
            baseStyle: {},
            defaultProps: {
                variant: 'default'
            },
            variants: {
                homeScreenBox: {
                    w: '90%',
                    h: '40%',
                    bg: 'muted.300',
                    borderRadius: 'xl',
                    p: '15px',

                },
                default: {

                },
            },
            sizes: {}
        },
        Text: {
            baseStyle: {},
            defaultProps: {
                variant: 'default'
            },
            variants: {
                homeScreenBoxText: {
                    textAlign: 'center',
                    fontSize: 'lg'
                }
            }
        }
    }
})