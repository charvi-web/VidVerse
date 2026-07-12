import { useEffect, useState } from "react";
import { Heart, Pencil, Send, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import { timeAgo } from "../../lib/utils";
import { toggleTweetLike } from "../../services/likeService";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../../services/tweetService";

const TweetPanel = ({ channel, currentUser, isOwnProfile }) => {
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadTweets = async () => {
      try {
        setLoading(true);
        const response = await getUserTweets(channel._id);
        setTweets(response.data || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Could not load tweets");
      } finally {
        setLoading(false);
      }
    };

    loadTweets();
  }, [channel._id]);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!content.trim()) return;

    try {
      setSubmitting(true);
      const response = await createTweet(content.trim());
      setTweets((current) => [
        {
          ...response.data,
          ownerDetails: {
            _id: currentUser._id,
            username: currentUser.username,
            avatar: currentUser.avatar,
          },
          likesCount: 0,
          isLiked: false,
        },
        ...current,
      ]);
      setContent("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not post tweet");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const response = await toggleTweetLike(tweetId);
      setTweets((current) => current.map((tweet) => (
        tweet._id === tweetId
          ? {
              ...tweet,
              isLiked: response.data.isLiked,
              likesCount: Math.max(0, (tweet.likesCount || 0) + (response.data.isLiked ? 1 : -1)),
            }
          : tweet
      )));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not update like");
    }
  };

  const handleEdit = async (tweet) => {
    const nextContent = window.prompt("Edit tweet", tweet.content);
    if (nextContent === null || nextContent.trim() === tweet.content) return;

    try {
      const response = await updateTweet(tweet._id, nextContent.trim());
      setTweets((current) => current.map((item) => (
        item._id === tweet._id ? { ...item, ...response.data } : item
      )));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not update tweet");
    }
  };

  const handleDelete = async (tweetId) => {
    if (!window.confirm("Delete this tweet?")) return;

    try {
      await deleteTweet(tweetId);
      setTweets((current) => current.filter((tweet) => tweet._id !== tweetId));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not delete tweet");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {isOwnProfile && (
        <form onSubmit={handleCreate} className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <textarea value={content} onChange={(event) => setContent(event.target.value)} maxLength={280} rows={3} placeholder="Share an update with your audience..." className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" />
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-xs text-zinc-500">{content.length}/280</span>
            <Button type="submit" size="sm" icon={Send} disabled={!content.trim()} loading={submitting}>Post</Button>
          </div>
        </form>
      )}

      {loading ? <p className="py-10 text-center text-sm text-zinc-500">Loading tweets...</p> : tweets.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 px-6 py-14 text-center text-sm text-zinc-500">No updates yet.</div>
      ) : tweets.map((tweet) => (
        <article key={tweet._id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex gap-3">
            <img src={tweet.ownerDetails?.avatar?.url} alt={tweet.ownerDetails?.username} className="h-10 w-10 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2"><span className="font-semibold text-white">@{tweet.ownerDetails?.username}</span><span className="text-xs text-zinc-500">{timeAgo(tweet.createdAt)}</span></div>
              <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">{tweet.content}</p>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => handleLike(tweet._id)} className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm ${tweet.isLiked ? "text-rose-400" : "text-zinc-500 hover:text-rose-400"}`}><Heart size={16} fill={tweet.isLiked ? "currentColor" : "none"} />{tweet.likesCount || 0}</button>
                {isOwnProfile && <><button onClick={() => handleEdit(tweet)} aria-label="Edit tweet" className="rounded-lg p-1.5 text-zinc-500 hover:text-white"><Pencil size={15} /></button><button onClick={() => handleDelete(tweet._id)} aria-label="Delete tweet" className="rounded-lg p-1.5 text-zinc-500 hover:text-red-400"><Trash2 size={15} /></button></>}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default TweetPanel;
