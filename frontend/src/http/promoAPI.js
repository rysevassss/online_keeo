import { $authHost, $host } from "./index";

export const createPromo = async (promo) => {
   const {data} = await $authHost.post('api/promo', promo)
   return data
}

export const fetchPromos = async () => {
   const {data} = await $host.get('api/promo')
   return data
}
export const fetchOnePromo = async (id) => {
   const {data} = await $host.get('api/promo' + '/'+ id)
   return data
}
export const deletePromo = async(id) => {
   const {data} = await $authHost.delete(`api/promo/${id}`)
   return data
}