import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UploadCloud, Film, Image as ImageIcon, X, Loader2 } from "lucide-react";

import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

import { publishVideo } from "../services/videoService";

const MAX_VIDEO_SIZE_MB = Number(import.meta.env.VITE_MAX_VIDEO_UPLOAD_SIZE_MB) || 500;

const Upload = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progressLabel, setProgressLabel] = useState("");

  const videoInputRef = useRef(null);
  const thumbInputRef = useRef(null);

  const handleThumbnailChange = (file) => {
    setThumbnailFile(file);
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setThumbnailPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }
    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }
    if (!thumbnailFile) {
      toast.error("Please select a thumbnail");
      return;
    }

    try {
      setUploading(true);
      setProgressLabel("Uploading your video...");

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnailFile);

      const res = await publishVideo(formData, (event) => {
        if (!event.total) return;
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgressLabel(`Uploading your video... ${percent}%`);
      });

      setProgressLabel("Publishing...");

      toast.success("Video uploaded successfully!");
      navigate(`/watch/${res.data._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      setProgressLabel("");
    }
  };

  return (
    <Container className="max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Upload a Video</h1>
        <p className="mt-2 text-zinc-400">
          Share your content with the world.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Video dropzone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Video File
            </label>

            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="flex h-48 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-white/5 text-zinc-400 transition hover:border-indigo-500/50 hover:text-indigo-300"
            >
              {videoFile ? (
                <>
                  <Film size={32} className="text-indigo-400" />
                  <span className="max-w-[80%] truncate text-sm text-white">
                    {videoFile.name}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {(videoFile.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                </>
              ) : (
                <>
                  <UploadCloud size={32} />
                  <span className="text-sm">Click to select a video</span>
                  <span className="text-xs text-zinc-600">
                    MP4, WebM, MOV up to {MAX_VIDEO_SIZE_MB} MB
                  </span>
                </>
              )}
            </button>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file && file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
                  toast.error(`Video must be ${MAX_VIDEO_SIZE_MB} MB or smaller`);
                  e.target.value = "";
                  setVideoFile(null);
                  return;
                }
                setVideoFile(file);
              }}
            />
          </div>

          {/* Thumbnail dropzone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Thumbnail
            </label>

            <button
              type="button"
              onClick={() => thumbInputRef.current?.click()}
              className="relative flex h-48 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/5 text-zinc-400 transition hover:border-indigo-500/50 hover:text-indigo-300"
            >
              {thumbnailPreview ? (
                <>
                  <img
                    src={thumbnailPreview}
                    alt="thumbnail preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThumbnailChange(null);
                    }}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-500"
                  >
                    <X size={16} />
                  </span>
                </>
              ) : (
                <>
                  <ImageIcon size={32} />
                  <span className="text-sm">Click to select a thumbnail</span>
                  <span className="text-xs text-zinc-600">
                    Recommended: 1280×720 (16:9)
                  </span>
                </>
              )}
            </button>

            <input
              ref={thumbInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleThumbnailChange(e.target.files?.[0] || null)
              }
            />
          </div>
        </div>

        {/* Title */}
        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your video a catchy title"
            maxLength={100}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
          />
          <p className="mt-1 text-right text-xs text-zinc-600">
            {title.length}/100
          </p>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell viewers about your video"
            rows={5}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
          />
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          {uploading && (
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              <Loader2 size={16} className="animate-spin" />
              {progressLabel}
            </span>
          )}

          <Button type="submit" loading={uploading} icon={UploadCloud}>
            {uploading ? "Uploading..." : "Publish Video"}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Upload;
