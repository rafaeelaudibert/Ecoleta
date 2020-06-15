import axios from 'axios'

import config from '../config'

export interface Item {
  id: string;
  title: string;
  imageUrl: string;
  selected: boolean;
}


const api = axios.create( {
  baseURL: config.apiEndpoint
} )

export default api
