import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})


export const insertMovie = payload => api.post(`/dashboard/event`, payload) //changed
export const getAllMovies = () => api.get(`/events`)
export const updateMovieById = (id, payload) => api.put(`/event/${id}`, payload)
export const deleteMovieById = id => api.delete(`/event/${id}`)
export const getMovieById = id => api.get(`/event/${id}`)


const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis
