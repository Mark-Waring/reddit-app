import axios from "axios";

export default async function getThread(searchString) {
  const data = await axios.get(`${searchString}.json`);
  return data.data;
}
