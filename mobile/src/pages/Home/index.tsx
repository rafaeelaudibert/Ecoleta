import React, { useEffect, useState } from 'react'

import { Image, ImageBackground, Text, View } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import Picker from 'react-native-picker-select'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import ibge, { IbgeCityResponse, IbgeUfResponse } from '../../services/ibge'

import styles, { inputStyles } from './styles'


const Home: React.FC = () => {
  const navigation = useNavigation()

  const [ states, setStates ] = useState<string[]>( [] )
  const [ cities, setCities ] = useState<string[]>( [] )

  const [ selectedState, setSelectedState ] = useState( '0' )
  const [ selectedCity, setSelectedCity ] = useState( '0' )

  useEffect( () => {
    ibge.get<IbgeUfResponse[]>( '/' ).then( ( { data } ) => {
      setStates( data.map( ( uf ) => uf.sigla ).sort() )
    } )
  }, [] )

  useEffect( () => {
    if ( selectedState === '0' ) {
      return
    }

    // Reset city select
    setCities( [] )
    setSelectedCity( '0' )

    ibge.get<IbgeCityResponse[]>( `/${selectedState}/municipios` ).then( ( { data } ) => {
      const citiesNames = data.map( ( city ) => city.nome ).sort()

      setCities( citiesNames )
    } )
  }, [ selectedState ] )

  const handleNavigateToPoints = () => {
    navigation.navigate( 'Points', {
      city: selectedCity,
      uf: selectedState
    } )
  }

  const handleSelectState = ( itemValue: string | number, _itemIndex: number ) => {
    const state = String( itemValue )

    setSelectedState( state )
  }

  const handleSelectCity = ( itemValue: string | number, _itemIndex: number ) => {
    const city = String( itemValue )

    setSelectedCity( city )
  }

  // eslint-disable-next-line no-undefined
  return <>
    <ImageBackground
      style={styles.container}
      source={require( '../../assets/home-background.png' )}
      imageStyle={{
        height: 368,
        width: 274
      }}
    >
      <View style={styles.main}>
        <Image source={require( '../../assets/logo.png' )}/>
        <View>
          <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Picker
          style={inputStyles}
          value={selectedState}
          onValueChange={handleSelectState}
          placeholder={{
            label: 'Selecione um estado',
            value: '0'
          }}
          Icon={() => <Icon name="chevron-down" color="#999" size={24}/>}
          items={
            states.map( ( state ) => ( {
              label: state,
              value: state
            } ) )
          }
        />
        <Picker
          style={inputStyles}
          value={selectedCity}
          onValueChange={handleSelectCity}
          placeholder={{
            label: 'Selecione uma cidade',
            value: '0'
          }}
          disabled={selectedState === '0'}
          Icon={() => <Icon name="chevron-down" color="#999" size={24}/>}
          items={
            cities.map( ( city ) => ( {
              label: city,
              value: city
            } ) )
          }
        />


        <RectButton
          style={styles.button}
          onPress={handleNavigateToPoints}
        >
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24}/>
            </Text>

          </View>
          <Text style={styles.buttonText}>
          Entrar
          </Text>
        </RectButton>
      </View>

    </ImageBackground>
  </>
}


export default Home
