import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json'
  }
})

export default axiosInstance
