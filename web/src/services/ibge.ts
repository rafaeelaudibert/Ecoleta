import axios from 'axios'

export interface IbgeUfResponse {
  sigla: string;
}

export interface IbgeCityResponse {
  nome: string;
}

const ibge = axios.create( {
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
} )

export default ibge
