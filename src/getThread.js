import axios from "axios";

export default async function getThread(searchString) {
  const data = await axios.get(`${searchString}.json?sort=top&limit=1000`);
  return data.data;
}

export async function getHeader(subreddit) {
  const data = await axios.get(
    `https://www.reddit.com/${subreddit}/about.json`
  );
  return data.data;
}
