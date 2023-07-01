import { productsInstance } from "./axiosInstance";

export const getAllProducts = async () => {
  const { data } = await productsInstance.get("/");
  return data;
};

// getByID

export const getProductByID = async(id) => {
  const {data} = await productsInstance.get(`/${id}`);
  return data;
}
// create
// update
// delete