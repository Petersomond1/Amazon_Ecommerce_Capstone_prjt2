import { useQuery } from "react-query";
import axios from "axios";

const getDataProducts = async () => {
  const result = await axios.get("http://localhost:5000/api/products");
  return result;
};

const useFetchProducts = () => {
  const {result } = useQuery("repoData", getDataProducts);
  console.log("result", result);
  return result;
};

export default useFetchProducts;