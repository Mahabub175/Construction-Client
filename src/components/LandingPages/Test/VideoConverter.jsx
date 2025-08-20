"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Spin, Button, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "webrtc-adapter";
import { toast } from "sonner";

const { Dragger } = Upload;
const { Option } = Select;

const VideoConverter = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState(null);
  const [format, setFormat] = useState("webm");

  useEffect(() => {
    if (!videoRef.current) return;

    const player = videojs(videoRef.current, {
      controls: true,
      width: 600,
      height: 340,
      fluid: false,
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const handleFileUpload = async (file) => {
    try {
      setLoading(true);
      const url = URL.createObjectURL(file);
      playerRef.current.src({ type: `video/${format}`, src: url });
      setOutputUrl(url);
      toast.success("Video ready!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
    return false;
  };

  const handleClear = () => {
    setOutputUrl(null);
    setFormat("webm");
    toast.info("Cleared");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Video Converter</h2>

      <Dragger
        multiple={false}
        showUploadList={false}
        beforeUpload={handleFileUpload}
        accept="video/*,.mkv"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag video file to upload</p>
        <p className="ant-upload-hint">
          It will be converted to the selected format
        </p>
      </Dragger>

      <Select
        defaultValue="webm"
        value={format}
        onChange={setFormat}
        className="w-full mb-4"
        size="large"
      >
        <Option value="webm">WebM</Option>
        <Option value="mp4">MP4</Option>
        <Option value="avi">AVI</Option>
        <Option value="mov">MOV</Option>
      </Select>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-2 my-4 font-bold">
          <Spin size="large" />
          <p>Processing...</p>
        </div>
      )}

      <div>
        <video
          ref={videoRef}
          id="video"
          className="video-js vjs-default-skin rounded-lg shadow-md"
          playsInline
          controls
          muted
        />
      </div>

      {outputUrl && (
        <div className="mt-4">
          <video
            src={outputUrl}
            controls
            className="w-full rounded-lg shadow-md"
          />
          <Button
            href={outputUrl}
            type="primary"
            size="large"
            download={`converted.${format}`}
            className="w-full mt-5"
          >
            Download {format.toUpperCase()}
          </Button>
          <Button danger onClick={handleClear} size="large" className="w-full">
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoConverter;
