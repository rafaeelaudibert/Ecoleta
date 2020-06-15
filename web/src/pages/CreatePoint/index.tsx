import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { FiArrowLeft } from 'react-icons/fi'

import Dropzone from '../../components/Dropzone'
import Overlay from '../../components/Overlay'
import FormState from '../../models/formState'
import api, { Item } from '../../services/api'
import ibge, { IbgeCityResponse, IbgeUfResponse } from '../../services/ibge'
import rawRequest from '../../services/raw'

import config from '../../config'
import logo from '../../assets/logo.svg'
import './styles.css'

const CreatePoint: React.FC = () => {
  const [ allItems, setAllItems ] = useState<Item[]>( [] )
  const [ selectedItems, setSelectedItems ] = useState<string[]>( [] )

  const [ states, setStates ] = useState<string[]>( [] )
  const [ selectedState, setSelectedState ] = useState<string>( '0' )

  const [ cities, setCities ] = useState<string[]>( [] )
  const [ selectedCity, setSelectedCity ] = useState<string>( '0' )

  const [ initialPosition, setInitialPosition ] = useState<[number, number]>( [ 0, 0 ] )
  const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>( [ 0, 0 ] )

  const [ selectedFile, setSelectedFile ] = useState<File>()

  const [ formData, setFormData ] = useState( {
    email: '',
    name: '',
    whatsapp: ''
  } )

  const [ formState, setFormState ] = useState<FormState>( FormState.InProgress )

  const history = useHistory()

  useEffect( () => {
    navigator.geolocation.getCurrentPosition( ( position ) => {
      const { latitude, longitude } = position.coords

      setInitialPosition( [ latitude, longitude ] )
    } )
  }, [] )

  useEffect( () => {
    api.get( 'items' ).then( ( { data } ) => {
      setAllItems( data.items )
    } )
  }, [] )

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
      setCities( data.map( ( city ) => city.nome ).sort() )
    } )
  }, [ selectedState ] )

  const handleSelectState = ( event: ChangeEvent<HTMLSelectElement> ) => {
    setSelectedState( event.target.value )
  }

  const handleSelectCity = ( event: ChangeEvent<HTMLSelectElement> ) => {
    setSelectedCity( event.target.value )
  }

  const handleMapClick = ( event: LeafletMouseEvent ) => {
    const { latlng: { lat, lng } } = event
    setSelectedPosition( [ lat, lng ] )
  }

  const handleInputChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = event.target

    setFormData( {
      ...formData,
      [name]: value
    } )
  }

  const handleItemClick = ( id: string ) => {
    if ( selectedItems.includes( id ) ) {
      setSelectedItems( selectedItems.filter( ( itemId ) => itemId !== id ) )
    } else {
      setSelectedItems( [ ...selectedItems, id ] )
    }
  }

  const isSendButtonEnabled = () => {
    const { name, email, whatsapp } = formData
    const uf = selectedState
    const city = selectedCity
    const [ latitude, longitude ] = selectedPosition
    const items = selectedItems

    return (
      [ name, email, whatsapp ].every( ( val ) => val !== '' ) &&
      [ uf, city ].every( ( val ) => val !== '0' ) &&
      [ latitude, longitude, items.length ].every( ( val ) => val !== 0 )
    )
  }

  const handleSubmit = async ( event: FormEvent ) => {
    event.preventDefault()

    setFormState( FormState.Loading )

    const { name, email, whatsapp } = formData
    const [ latitude, longitude ] = selectedPosition

    const data = {
      city: selectedCity,
      email,
      imageContentType: selectedFile?.type,
      items: selectedItems,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      name,
      uf: selectedState,
      whatsapp
    }

    let pointId: string | null = null
    try {
      const { data: { point, signedUrl } } = await api.post( '/points', data )
      pointId = point.id as string

      if ( selectedFile ) {
        const headers = {
          'Content-Type': selectedFile.type
        }
        await rawRequest.put( signedUrl, selectedFile, { headers } )
      }

      setFormState( FormState.Completed )
    } catch ( error ) {
      // Delete the point if created, and error while uploading file
      if ( pointId ) {
        await api.delete( `/points/${pointId}` )
      }

      console.error( 'An error ocurred', error )
      setFormState( FormState.Error )
    }
  }

  const shouldShowOverlay = [ FormState.Completed, FormState.Error ].includes( formState )

  return (
    <>
      <div id="page-create-point">
        <header>
          <img src={logo} alt="Ecoleta"/>
          <Link to="/">
            <FiArrowLeft/>
            Voltar para a home
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <h1>Cadastro do <br/>Ponto de coleta</h1>

          <Dropzone onFileUploaded={setSelectedFile}/>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </div>

              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  onChange={handleInputChange}
                  value={formData.whatsapp}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>
            <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedPosition}/>
            </Map>
            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select
                  name="uf"
                  id="uf"
                  value={selectedState}
                  onChange={handleSelectState}
                >
                  <option value="0">Selecione uma UF</option>
                  {states.map( ( state ) => <option value={state} key={state}>{state}</option> )}
                </select>
              </div>

              <div className="field">
                <label htmlFor="city">Cidade)</label>
                <select
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={handleSelectCity}
                >
                  <option value="0">Selecione uma cidade</option>
                  {cities.map( ( city ) => <option value={city} key={city}>{city}</option> )}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Itens de Coleta</h2>
              <span>Selecione um ou mais itens abaixo</span>
            </legend>

            <ul className="items-grid">
              {
                allItems.map( ( item ) => <li
                  key={item.id}
                  className={`${selectedItems.includes( item.id ) ? 'selected' : ''}`}
                  onClick={() => handleItemClick( item.id )}
                >
                  <img src={`${config.assetsPath}${item.imageUrl}`} alt={item.title}/>
                  <span>{item.title}</span>
                </li> )
              }
            </ul>
          </fieldset>

          <button type="submit" disabled={!isSendButtonEnabled() || formState === FormState.Loading}>
            Cadastrar ponto de coleta
          </button>
        </form>
      </div>
      {shouldShowOverlay && <Overlay
        formState={formState}
        onClick={() => history.push( '/' )
        }/>}
    </>
  )
}

export default CreatePoint
