import { useState } from 'react'
import { View } from 'react-native'

import { Marker } from 'react-native-maps'

import { getUserLocation } from '../../location/getLocation'

import Button from '../components/Button'
import Map from '../components/Map'

import { useNavigation } from '@react-navigation/native'

import { styles } from './styles'

export default function AddCanMap() {
    const navigation = useNavigation()

    const [showMarker, setShowMarker] = useState(false)
    const [coords, setCoords] = useState({
        latitude: 0,
        longitude: 0,
    })

    function addMarker({ nativeEvent }) {
        const { coordinate } = nativeEvent
        setCoords(coordinate)
        setShowMarker(true)
    }
    
    function handleUserCurrentLocation() {
        getUserLocation().then(coords => {
            setShowMarker(true)
            setCoords(coords)
        })
    }

    return (
        <View style={styles.container}>
            <Map onPress={addMarker} >
                {showMarker && (
                    <Marker coordinate={coords} />                        
                )}
            </Map>
            <Button onPress={handleUserCurrentLocation}>Usar localização atual</Button>
            <Button 
                style={{marginTop: 15}}
                onPress={() => navigation.navigate('Info', {
                    coords,
                })}
            >
                Continuar</Button>
        </View>
    )
}