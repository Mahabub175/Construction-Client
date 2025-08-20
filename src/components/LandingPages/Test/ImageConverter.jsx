"use client";

import { useState } from "react";
import { Upload, Button, Spin, Select, Image } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

const { Dragger } = Upload;
const { Option } = Select;

const ImageConverter = () => {
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState(null);
  const [format, setFormat] = useState("jpeg");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (file) => {
    try {
      setLoading(true);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const finalName = `${baseName}.${format === "jpeg" ? "jpg" : format}`;
      setFileName(finalName);

      const convertedFile = new File(
        [compressedFile],
        `${baseName}.${format === "jpeg" ? "jpg" : format}`,
        {
          type: `image/${format}`,
        }
      );

      const convertedBlob = await imageCompression.getDataUrlFromFile(
        convertedFile
      );

      setOutputUrl(convertedBlob);
      toast.success("Image converted & compressed!");
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
    setFormat("jpeg");
    toast.info("Cleared");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Image Converter</h2>

      <Dragger
        multiple={false}
        showUploadList={false}
        beforeUpload={handleFileUpload}
        accept="image/*"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag image file to upload</p>
        <p className="ant-upload-hint">
          It will be compressed & converted to the selected format
        </p>
      </Dragger>

      <Select
        defaultValue="jpeg"
        value={format}
        onChange={setFormat}
        className="w-full mb-4"
        size="large"
      >
        <Option value="jpeg">JPG</Option>
        <Option value="png">PNG</Option>
        <Option value="webp">WebP</Option>
      </Select>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-2 my-4 font-bold">
          <Spin size="large" />
          <p>Processing...</p>
        </div>
      )}

      {outputUrl && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <Image
            src={outputUrl}
            alt="Converted"
            className="w-full max-w-md rounded-lg shadow-md"
          />
          <Button
            href={outputUrl}
            type="primary"
            size="large"
            download={fileName}
            className="w-full"
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

export default ImageConverter;
