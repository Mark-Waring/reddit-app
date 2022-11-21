import axios from "axios";

const baseURL = `.json`;

export default async function getThread(searchString) {
  const data = await axios.get(searchString + baseURL);
  return data.data;
}
