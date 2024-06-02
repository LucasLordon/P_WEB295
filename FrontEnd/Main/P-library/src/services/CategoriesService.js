import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/categories',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
    getCategories() {
        return apiClient.get('/')
    },
  getCategoriesBooks(id) {
    return apiClient.get(`/${id}/books`)
  },
  getAllCategoriesBooks() {
    return apiClient.get('/books');
  }
  
}
