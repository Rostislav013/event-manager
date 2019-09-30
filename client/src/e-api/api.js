import axios from 'axios'

const api = axios.create({
    baseURL: '/api', // important
})


export const insertEvent = payload => api.post(`/dashboard/event`, payload) //changed
export const getAllEvents = () => api.get(`/events`)
export const updateEventById = (id, payload) => api.put(`/event/${id}`, payload)
export const deleteEventById = id => api.delete(`/event/${id}`)
export const getEventById = id => api.get(`/event/${id}`)


const apis = {
    insertEvent,
    getAllEvents,
    updateEventById,
    deleteEventById,
    getEventById,
}

export default apis
