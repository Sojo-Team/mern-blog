import { api } from '@/api'
import { isAxiosError } from 'axios'

export const createBlogService = async value => {
  try {
    const response = await api.post('/blog', value)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response.data.message
    }
  }
}

export const fetchBlogsService = async page => {
  try {
    const response = await api.get('/blog', {
      params: {
        page,
      },
    })
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response.data.message
    }
  }
}
