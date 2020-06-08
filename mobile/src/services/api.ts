import axios from 'axios'

const api = axios.create( {
  baseURL: 'https://4v2s8w6glb.execute-api.us-east-1.amazonaws.com/local/'
} )

export default api
