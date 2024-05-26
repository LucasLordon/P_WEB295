import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/authors',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getAuthors() {
    return apiClient.get('/')
  },
  getAuthors(id) {
    return apiClient.get('/'+id)
  }
}
