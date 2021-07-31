import axios from 'axios'

const axiosInstance = axios.create({
  method: 'GET',
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default axiosInstance
