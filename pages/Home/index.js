import { useEffect, useState } from 'react'

import * as Location from 'expo-location'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Circle } from 'react-native-progress'

import { styles } from './styles'

import { api } from '../../services/api';

import trashEmpty from '../../images/trash-free.png'
import trashFull from '../../images/trash-full.png'
import trashWarning from '../../images/trash-warning.png'

const images = {
  empty: trashEmpty,
  full: trashFull,
  warning: trashWarning
}

const colors = {
  empty: '#78BC67',
  full: '#FB7070',
  warning: '#F8FB88'
}

function getStatus(level) {
  if (level <= 1/3)
    return 'empty'
  else if (level <= 2/3)
    return 'warning'
  return 'full'
}

export default function Home() {

  const [cans, setCans] = useState([])
  const [latitude, setLatitude] = useState(-23.5571595)
  const [longitude, setLongitude] = useState(-46.7324227)
  
  async function getCans() {
    try {
      
      const { data } = await api.post('action/find', {
        collection: 'trash-cans',
        database: 'smart-trash',
        dataSource: 'datapan'
    })

      const { documents: trashCans } = data

      setCans(trashCans.map(can => {
        return {
          ...can,
          status: getStatus(can.level)
        }
      }))

    } catch (err) {
      setCans([])
      console.log('Houve um erro: ' + err)
    }
  }

  async function getUserLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Localização negada')
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    return coords
  }


  useEffect(() => {
    getCans()
  }, [])

  useEffect(() => {
    getUserLocation().then(({ latitude, longitude }) => {
      setLongitude(longitude)
      setLatitude(latitude)
    })
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{...StyleSheet.absoluteFill}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {cans.map(can => {
          return (
            <Marker
              key={can._id}
              icon={images[can.status]}
              calloutAnchor={{
                x: 2.7,
                y: -0.1,
              }}
              anchor={{x: -0.1, y: 1}}
              coordinate={{
                latitude: can.location.latitude,
                longitude: can.location.longitude,
              }}
            >
              <Callout tooltip>
                <View style={styles.callout}>
                  <Text style={styles.calloutText}>
                    Lixeira "{can.name}"
                  </Text>
                  <Circle animated={false} showsText={true} textStyle={{fontSize: 16}} color={colors[can.status]} size={45} progress={can.level} />
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={{...styles.button, marginBottom: 10}}>
          <Text style={styles.buttonText}>
            Gerar rota
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Adicionar lixeira
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
