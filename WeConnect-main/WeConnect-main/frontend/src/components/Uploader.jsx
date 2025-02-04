import React, { useRef } from "react";
import { ReactComponent as GalleryIcon } from "../assets/image.svg";
import { ReactComponent as VideoIcon } from "../assets/video.svg";
import { ReactComponent as FileIcon } from "../assets/file.svg";
import { v4 as uuid } from "uuid";

import "./Uploader.css";

const Uploader = ({ photo, video, doc, onPhoto, onVideo, onDoc }) => {
  const ImagePickerRef = useRef(null);
  const VideoPickerRef = useRef(null);
  const DocPickerRef = useRef(null);

  const onImageHandler = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      onPhoto({
        id: uuid(),
        type: "image",
        url: readerEvent.target.result,
      });
    };
  };

  const onVideoHandler = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      onVideo({
        id: uuid(),
        type: "video",
        url: readerEvent.target.result,
      });
    };
  };

  const onDocHandler = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      onDoc({
        id: uuid(),
        type: "doc",
        url: readerEvent.target.result,
      });
    };
  };

  return (
    <div className="uploader">
      {photo && (
        <div onClick={() => ImagePickerRef.current.click()}>
          <div>
            <GalleryIcon />
            <p>Photo</p>
          </div>

          <input
            ref={ImagePickerRef}
            onChange={onImageHandler}
            type="file"
            accept="image/*"
            hidden
          />
        </div>
      )}

      {video && (
        <div onClick={() => VideoPickerRef.current.click()}>
          <VideoIcon />
          <p>Video</p>
          <input
            ref={VideoPickerRef}
            onChange={onVideoHandler}
            type="file"
            accept="video/*"
            hidden
          />
        </div>
      )}

      {doc && (
        <div onClick={() => DocPickerRef.current.click()}>
          <FileIcon />
          <p>Document</p>
          <input
            ref={DocPickerRef}
            onChange={onDocHandler}
            type="file"
            accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            hidden
          />
        </div>
      )}
    </div>
  );
};

export default Uploader;
