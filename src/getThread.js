import axios from "axios";

export default async function getThread(searchString, sort) {
  const cleaned = searchString.split("/r/")[1].split("/?")[0];
  const data = await axios.get(
    `https://www.reddit.com/r/${cleaned}.json?limit=1000&sort=${sort}`
  );
  return data.data;
}

export async function getHeader(subreddit) {
  const data = await axios.get(
    `https://www.reddit.com/${subreddit}/about.json`
  );
  return data.data;
}
