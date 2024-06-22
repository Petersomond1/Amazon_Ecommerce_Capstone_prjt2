import { useQuery } from "react-query";
import axios from "axios";

const getDataProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/api/products");
  return data; // Assuming the API returns the data directly
};

const useFetchProducts = () => {
  return useQuery("productsData", getDataProducts);
};
// We could also use the following function to fetch products for a specific row ID
export const useFetchFilteredProductsByRow = (rowId) => {
  return useQuery(['products', rowId], async () => {
    const data = await getDataProducts();
    // Assuming data[0] contains products and data[1] contains row IDs
    const products = data[0][0];
    const rowIds = JSON.parse(data[1][rowId]);
    return products.filter(product => rowIds.includes(product.id));
  });
};

export default useFetchProducts;