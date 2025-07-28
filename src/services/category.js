import { axiosInstance } from "./index";

const getCategoriesApi = async (data) => {
    return await  axiosInstance.get(`/products/categories`)
}

const getcategoryProducts = async (data) => {
    return await  axiosInstance.get(`/products/category/${data}`)
}



export { getCategoriesApi, getcategoryProducts }