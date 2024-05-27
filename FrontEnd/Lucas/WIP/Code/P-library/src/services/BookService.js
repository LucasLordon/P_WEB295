import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/books',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getBooks() {
    return apiClient.get('/')
  },
  getBook(id) {
    return apiClient.get('/' + id)
  },
  getBooksAuthors(id) {
    return apiClient.get('/'+id+'/authors/')
  }
}
