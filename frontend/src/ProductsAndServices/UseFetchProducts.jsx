import { useQuery } from "react-query";
import axios from "axios";

const getDataProducts = async () => {
  const result = await axios.get("http://localhost:5000/api/products");
  return result.data;
};

const UseFetchProducts = () => {
  const { isLoading, error, data } = useQuery("repoData", getDataProducts);

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return data;
};

export default UseFetchProducts;
