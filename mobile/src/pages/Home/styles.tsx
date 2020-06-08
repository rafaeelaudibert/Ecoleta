import { StyleSheet } from 'react-native'

const styles = StyleSheet.create( {
  button: {
    alignItems: 'center',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    flexDirection: 'row',
    height: 60,
    marginTop: 8,
    overflow: 'hidden'
  },

  buttonIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 60,
    justifyContent: 'center',
    width: 60
  },

  buttonText: {
    color: '#FFF',
    flex: 1,
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center'
  },

  container: {
    flex: 1,
    padding: 32
  },

  description: {
    color: '#6C6C80',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    maxWidth: 260
  },

  footer: {},

  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    fontSize: 16,
    height: 60,
    marginBottom: 8,
    paddingHorizontal: 24
  },

  main: {
    flex: 1,
    justifyContent: 'center'
  },

  select: {},

  title: {
    color: '#322153',
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 32,
    marginTop: 64,
    maxWidth: 260
  }
} )

export default styles
