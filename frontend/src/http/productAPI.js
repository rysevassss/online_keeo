import { $authHost, $host } from "./index";

export const createType = async (type) => {
   const {data} = await $authHost.post('api/type', type)
   return data
}
export const fetchTypes = async () => {
   const {data} = await $host.get('api/type')
   return data
}
export const deleteType = async(id) => {
   const {data} = await $authHost.delete(`api/type/${id}`)
   return data
}


export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
 }
 export const deleteCategory = async (id) => {
   const {data} = await $authHost.delete(`api/category/${id}`)
   return data
}
 
 export const fetchCategories = async () => {
   const {data} = await $host.get('api/category', )
   return data
}



export const createProduct = async (product) => {
   const {data} = await $authHost.post('api/product', product)
   return data
}

export const deleteProduct = async (id) => {
   const {data} = await $authHost.delete(`api/product/${id}`)
   return data
}

export const fetchProducts = async (typeId, categoryId, page, limit) => {
   const {data} = await $host.get('api/product', {params: {
           typeId, categoryId, page, limit
       }})
   return data
}

export const fetchOneProduct = async (id) => {
   const {data} = await $host.get('api/product' + '/'+id)
   return data
}


export const addToCart = async (productId) => {
   const {response} = await $authHost.post('api/cart', productId)
   return response
}

export const deleteFromCart = async (id) => {
   const {response} = await $authHost.put('api/cart/delete', {id:id})
   return response
}

export const deleteCart = async () => {
   const {response} = await $authHost.put('api/cart/deleteall')
   return response
}

export const getCart = async () => {
   const {data} = await $authHost.get('api/cart')
   return data
}


export const addOrder = async (id, phone, name, surname, region, city, street, street_num, flat, comment, totalint) => {
   const {data} = await $authHost.post('api/order', {
           id, phone, name, surname, region, city, street, street_num, flat, comment, totalint
       })
   return data
}

export const getAllOrder = async () => {
   const {data} = await $authHost.get('api/order/')
   return data
}


export const getUserOrder = async () => {
   const {data} = await $authHost.get('api/order/user')
   return data
}

export const updateOrderStatus = async (id, status) => {
   const {data} = await $authHost.put(`api/order/${id}`, { status })
   return data
}


