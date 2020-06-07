import axios from 'axios'

export interface Item {
  id: string;
  title: string;
  imageUrl: string;
  selected: boolean;
}


const api = axios.create( {
  baseURL: 'http://localhost:3000'
} )

export default api
