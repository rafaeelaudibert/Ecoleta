import { StyleSheet } from 'react-native'

export const inputStyles = StyleSheet.create( {
  iconContainer: {
    right: 12,
    top: 16
  },

  inputAndroid: {
    borderColor: '#ccc',
    borderRadius: 6,
    borderWidth: 1,
    color: 'black',
    fontSize: 16,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingRight: 30,
    paddingVertical: 12
  },

  inputIOS: {
    borderColor: '#ccc',
    borderRadius: 6,
    borderWidth: 1,
    color: 'black',
    fontSize: 16,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingRight: 30,
    paddingVertical: 12
  }


} )

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
