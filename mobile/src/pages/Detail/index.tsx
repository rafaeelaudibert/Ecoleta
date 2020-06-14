import * as MailComposer from 'expo-mail-composer'
import { FontAwesome, Feather as Icon } from '@expo/vector-icons'
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import api from '../../services/api'
import config from '../../config'

import styles from './styles' // eslint-disable-line sort-imports

interface Point {
    id: string
    city: string
    email: string
    latitude: string
    longitude: string
    name: string
    uf: string
    whatsapp: string

    items: {
        title: string
    }[]
}

interface Params {
    pointId: string
}

const Detail: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const params = route.params as Params

  const [ point, setPoint ] = useState<Point>( {} as Point )

  useEffect( () => {
    api.get( `/points/${params.pointId}` ).then( ( { data } ) => setPoint( data.point ) )
  }, [] )

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const handleWhatsapp = () => {
    Linking.openURL( `whatsapp://send?phone=${point.whatsapp}&text="Tenho interesse na coleta de resíduos"` )
  }

  const handleComposeMail = () => {
    MailComposer.composeAsync( {
      recipients: [ point.email ],
      subject: 'Interesse na coleta de resíduos'
    } )
  }

  if ( !point.id ) {
    return null
  }

  return <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name="arrow-left" size={20} color="#34cb79"/>
      </TouchableOpacity>

      <Image style={styles.pointImage} source={{ uri: `${config.imagesPath}${point.id}` }}/>

      <Text style={styles.pointName}>
        {point.name}
      </Text>
      <Text style={styles.pointItems}>
        {point.items.map( ( item ) => item.title ).join( ', ' )}
      </Text>

      <View style={styles.address}>
        <Text style={styles.addressTitle}>Endereço:</Text>
        <Text style={styles.addressContent}>{point.city}, {point.uf}</Text>
      </View>
    </View>

    <View style={styles.footer}>
      <RectButton style={styles.button} onPress={handleWhatsapp}>
        <FontAwesome name="whatsapp" size={20} color="#fff"/>
        <Text style={styles.buttonText}>Whatsapp</Text>
      </RectButton>

      <RectButton style={styles.button} onPress={handleComposeMail}>
        <Icon name="mail" size={20} color="#fff"/>
        <Text style={styles.buttonText}>Email</Text>
      </RectButton>
    </View>
  </SafeAreaView>

}

export default Detail
