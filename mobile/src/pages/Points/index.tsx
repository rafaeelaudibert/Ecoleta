import * as Location from 'expo-location'
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import { SvgUri } from 'react-native-svg'
import api from '../../services/api'
import config from '../../config'

import styles from './styles' // eslint-disable-line sort-imports

interface Item {
    id: string
    title: string
    imageUrl: string
}

interface Point {
    id: string
    image: string
    latitude: string
    longitude: string
    name: string
}

interface Params {
    city: string
    uf: string
}

const Points: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const routeParams = route.params as Params

  const [ items, setItems ] = useState<Item[]>( [] )
  const [ selectedItems, setSelectedItems ] = useState<string[]>( [] )

  const [ points, setPoints ] = useState<Point[]>( [] )

  const [ initialPosition, setInitialPosition ] = useState<[number, number]>( [ 0, 0 ] )

  useEffect( () => {
    async function loadPosition () {
      const { status } = await Location.requestPermissionsAsync()

      if ( status !== 'granted' ) {
        Alert.alert( 'Oooops,', 'Precisamos de sua permissão para obter a localização' )
        return
      }

      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords
      setInitialPosition( [ latitude, longitude ] )
    }

    loadPosition()
  }, [] )

  useEffect( () => {
    api.get( 'items' ).then( ( { data } ) => setItems( data.items ) )
  }, [] )

  useEffect( () => {
    api.get( 'points', {
      params: {
        city: routeParams.city,
        items: selectedItems.join( ',' ),
        uf: routeParams.uf
      }
    } ).then( ( { data } ) => setPoints( data.points ) )
  }, [ selectedItems ] )

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const handleNavigateToDetail = ( pointId: string ) => {
    navigation.navigate( 'Detail', { pointId } )
  }

  const handleSelectItem = ( id: string ) => {
    const alreadySelected = selectedItems.find( ( selectedItem ) => selectedItem === id )

    if ( alreadySelected ) {
      const filteredItems = selectedItems.filter( ( selectedItem ) => selectedItem !== id )

      setSelectedItems( filteredItems )
    } else {
      setSelectedItems( [ ...selectedItems, id ] )
    }
  }

  return <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack} >
        <Icon name="arrow-left" size={20} color="#34cb79"/>
      </TouchableOpacity>

      <Text style={styles.title}>
        Bem vindo.
      </Text>
      <Text style={styles.description}>
       Encontre no mapa um ponto de coleta
      </Text>

      <View style={styles.mapContainer}>
        {initialPosition[0] !== 0 && <MapView
          style={styles.map}
          initialRegion={{
            latitude: initialPosition[0],
            latitudeDelta: 0.014,
            longitude: initialPosition[1],
            longitudeDelta: 0.014
          }}>

          {
            points.map( ( point ) => <Marker
              coordinate={{
                latitude: parseFloat( point.latitude ),
                longitude: parseFloat( point.longitude )
              }}
              onPress={() => handleNavigateToDetail( point.id )}
              style={styles.mapMarker}
              key={point.id}>
              <View style={styles.mapMarkerContainer}>
                <Image source={{ uri: point.image }} style={styles.mapMarkerImage}/>
                <Text style={styles.mapMarkerTitle}>{point.name}</Text>
              </View>
            </Marker> )
          }
        </MapView>}
      </View>
    </View>
    <View style={styles.itemsContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          {
            paddingHorizontal: 20
          }
        }>
        {
          items.map( ( item ) => <TouchableOpacity
            style={[
              styles.item,
              selectedItems.includes( item.id ) ? styles.selectedItem : {}
            ]}
            onPress={() => handleSelectItem( item.id )}
            key={item.title}
            activeOpacity={0.6}
          >
            <SvgUri width={42} height={42} uri={`${config.assetsPath}${item.imageUrl}`}/>
            <Text style={styles.itemTitle}>
              {item.title}
            </Text>
          </TouchableOpacity> )
        }


      </ScrollView>

    </View>
  </SafeAreaView>
}

export default Points
