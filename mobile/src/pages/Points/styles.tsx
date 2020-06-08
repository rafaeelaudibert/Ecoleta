import { StyleSheet } from 'react-native'

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20
  },

  description: {
    color: '#6C6C80',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    marginTop: 4
  },

  item: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 8,
    borderWidth: 2,
    height: 120,
    justifyContent: 'space-between',
    marginRight: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
    textAlign: 'center',
    width: 120
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 13,
    textAlign: 'center'
  },

  itemsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    marginTop: 16
  },

  map: {
    height: '100%',
    width: '100%'
  },

  mapContainer: {
    borderRadius: 10,
    flex: 1,
    marginTop: 16,
    overflow: 'hidden',
    width: '100%'
  },

  mapMarker: {
    height: 80,
    width: 90
  },

  mapMarkerContainer: {
    alignItems: 'center',
    backgroundColor: '#34CB79',
    borderRadius: 8,
    flexDirection: 'column',
    height: 70,
    overflow: 'hidden',
    width: 90
  },

  mapMarkerImage: {
    height: 45,
    resizeMode: 'cover',
    width: 90
  },

  mapMarkerTitle: {
    color: '#FFF',
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    fontSize: 13,
    lineHeight: 23
  },


  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2
  },

  title: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 20,
    marginTop: 24
  }
} )

export default styles
