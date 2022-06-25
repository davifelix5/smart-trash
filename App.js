import { useEffect, useState } from 'react'

import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Circle } from 'react-native-progress'

import { styles } from './styles/app'

import { api } from './services/api';

import trashEmpty from './images/trash-free.png'
import trashFull from './images/trash-full.png'
import trashWarning from './images/trash-warning.png'

const defaultLatitude = -23.5571595;
const defaultLongitude = -46.7324227;

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


export default function App() {

  const [cans, setCans] = useState([])
  async function getCans() {
    try {
      const res = await api.get('/list')
      const data = res.data;
      setCans(data)
    } catch {
      console.log('Houve um erro')
    }
  }
  useEffect(() => {
    getCans()
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={{...StyleSheet.absoluteFillObject}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: defaultLatitude,
          longitude: defaultLongitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {cans.map(can => {
          return (
            <Marker
              key={can._id['$oid']}
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Gerar rota
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
