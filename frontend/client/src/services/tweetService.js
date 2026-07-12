import API from "../api/axios";

export const getUserTweets = async (userId) => {
  const { data } = await API.get(`/tweet/user/${userId}`);
  return data;
};

export const createTweet = async (content) => {
  const { data } = await API.post("/tweet", { content });
  return data;
};

export const updateTweet = async (tweetId, content) => {
  const { data } = await API.patch(`/tweet/${tweetId}`, { content });
  return data;
};

export const deleteTweet = async (tweetId) => {
  const { data } = await API.delete(`/tweet/${tweetId}`);
  return data;
};
