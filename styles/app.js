import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    container: {
        padding: 45,
        flex: 1,
        alignItems: 'center',
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
    button: {
        backgroundColor: '#5788bd',
        width: 200,
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        position: 'absolute',
        bottom: 5,
        paddingVertical: 10,
        borderRadius: 15,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
    }
})
