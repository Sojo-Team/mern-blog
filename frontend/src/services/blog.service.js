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

export const fetchBlogsService = async (page, search = '') => {
  try {
    const response = await api.get('/blog', {
      params: {
        page,
        search,
      },
    })
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response.data.message
    }
  }
}

export const fetchSingleBlogService = async id => {
  try {
    const response = await api.get(`/blog/${id}`)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response.data.message
    }
  }
}

export const addLiketoBlog = async id => {
  try {
    const response = await api.put(`/blog/like/${id}`)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response.data.message
    }
  }
}
