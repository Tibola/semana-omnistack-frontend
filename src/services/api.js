import axios from 'axios'

const api = axios.create({
  baseURL: 'https://tibola-omnistack-backend.herokuapp.com'
})

export default api