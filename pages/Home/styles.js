import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    callout: {
        paddingHorizontal: 8,
        paddingVertical: 15,
        borderRadius: 16,
        backgroundColor: '#e8e7e3',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    calloutText: {
        fontSize: 14,
        marginBottom: 8,
    },
    buttonContainer: {
        margin: 30,
        alignItems: 'space-between',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5788bd',
        borderRadius: 15,
        paddingVertical: 10,
        width: 200,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
    }
})
