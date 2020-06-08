import { Image, ImageBackground, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import styles from './styles' // eslint-disable-line sort-imports


const Home: React.FC = () => {
  const navigation = useNavigation()

  const [ uf, setUf ] = useState( '' )
  const [ city, setCity ] = useState( '' )

  const handleNavigateToPoints = () => {
    navigation.navigate( 'Points', {
      city,
      uf
    } )
  }

  // eslint-disable-next-line no-undefined
  return <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
        <TextInput
          style={styles.input}
          placeholder="Digite a UF"
          value={uf}
          maxLength={2}
          autoCapitalize="characters"
          autoCorrect={false}
          onChangeText={setUf}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite a Cidade"
          value={city}
          autoCorrect={false}
          onChangeText={setCity}
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
  </KeyboardAvoidingView>
}


export default Home
