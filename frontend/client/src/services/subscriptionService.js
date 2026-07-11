import API from "../api/axios";

// =========================
// Toggle Subscription To A Channel
// =========================
export const toggleSubscription = async (channelId) => {
  const { data } = await API.post(`/subscriptions/c/${channelId}`);

  return data;
};

// =========================
// Get Subscribers Of A Channel
// =========================
export const getChannelSubscribers = async (channelId) => {
  const { data } = await API.get(`/subscriptions/c/${channelId}`);

  return data;
};

// =========================
// Get Channels A User Has Subscribed To
// =========================
export const getSubscribedChannels = async (subscriberId) => {
  const { data } = await API.get(`/subscriptions/u/${subscriberId}`);

  return data;
};

const subscriptionService = {
  toggleSubscription,
  getChannelSubscribers,
  getSubscribedChannels,
};

export default subscriptionService;