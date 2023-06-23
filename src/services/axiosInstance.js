import axios from "axios";

export const productsInstance = axios.create({
    baseURL: "http://localhost:5000/products", 
    headers: {
        "Content-Type": "aplicattion/json"
    } 
})

