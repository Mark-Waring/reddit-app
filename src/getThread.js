import axios from "axios";

const baseURL = `.json`;

export default async function getThread(searchString) {
  const data = await axios.get(searchString + baseURL);
  const postBase = data[0]?.data?.children[0].data;
  const replyBase = data[1]?.data?.children;
  return data.data;

  const postData = {
    author: postBase?.author,
    flair:
      postBase?.author_flair_richtext && postBase?.author_flair_richtext[1]?.t,
    time: postBase?.created_utc,
    body: postBase?.selftext,
    score: postBase?.score,
    replyNumber: postBase?.replies?.data?.children?.length,
  };

  function replyData(base) {
    return base?.map((post) => {
      const details = {
        author: post?.data.author,
        flair:
          post?.data.author_flair_richtext &&
          post?.data.author_flair_richtext[1]?.t,
        time: post?.data.created_utc,
        body: post?.data.body,
        score: post?.data.score,
        replyNumber: post?.data.replies?.data?.children?.length,
        replies: post?.data?.replies?.data?.children,
        getReplies: replyData(post?.data?.replies?.data?.children),
      };
      return details;
    });
  }
  // return {
  //   title: postData.title,
  //   id: postData.id,
  //   author: postData.author,
  //   flair: postData.flair,
  //   time: `${Math.floor((now - postData.time) / 60)} minutes ago`,
  //   body: postData.body,
  //   score: postData.score,
  //   replyNumber: postData.replyNumber ? postData.replyNumber : "0",
  //   replies: postData.getReplies,
  //   repliesArray: replyData(replyBase),
  // };
}
