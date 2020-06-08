/* eslint-disable camelcase */
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'

import { AppLoading } from 'expo'
import React from 'react'
import Routes from './src/routes'
import { StatusBar } from 'react-native'


const App: React.FC = () => {
  const [ fontsLoaded ] = useFonts( {
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  } )

  if ( !fontsLoaded ) {
    return <AppLoading/>
  }

  return <>
    <StatusBar backgroundColor="transparent" translucent barStyle="dark-content"/>
    <Routes/>
  </>
}


export default App
