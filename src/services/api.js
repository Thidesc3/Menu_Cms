import axios from 'axios'
export const api = axios.create({baseURL:import.meta.env.VITE_API_URL})
export function errorMessage(error){const m=error.response?.data?.message;return Array.isArray(m)?m.join('; '):m||error.message}
export const resource = path => ({
 list: async () => (await api.get(path)).data,
 create: async data => (await api.post(path,data)).data,
 update: async (id,data) => (await api.patch(path+'/'+id,data)).data,
 remove: async id => {await api.delete(path+'/'+id)}
})
export const categories=resource('/categories')
export const products=resource('/products')
export const spots=resource('/spots')
export const guestChecks={list:async()=>(await api.get('/guest-checks',{params:{status:'OPENED'}})).data,detail:async id=>(await api.get('/guest-checks/'+id)).data}
export const orders={list:async id=>(await api.get('/orders',{params:id?{guestCheckId:id}:{}})).data,updateStatus:async(id,status)=>(await api.patch('/orders/'+id+'/status',{status})).data}