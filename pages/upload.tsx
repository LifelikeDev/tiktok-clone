import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
import { BASE_URL } from "../utils";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile } = useAuthStore();
  const router = useRouter();

  const handleVideoUpload = async (event: any) => {
    const selectedFile = event.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setIsLoading(true);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);

          if (wrongFileType) {
            setWrongFileType(false);
          }
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    // e.preventDefault();

    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, document);

      router.push("/");
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-12 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg w-[70%] xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[340px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div className="mb-5">
                {videoAsset ? (
                  <div className="w-[300px]">
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="my-4  bg-[#333] h-[420px] rounded-xl"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-6xl text-gray-300" />
                        </p>
                        <p className="text-md font-semibold text-center">
                          Upload Video
                        </p>
                      </div>
                      <p className="text-gray-400 text-center mt-5 text-sm leading-7">
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className="bg-[#F51997] hover:bg-[#E60484] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={handleVideoUpload}
                      className="h-0 w-0"
                    />
                  </label>
                )}
                {/* Wrong File Type */}
                {wrongFileType && (
                  <p className="text-center text-md font-semibold text-red-400 mt-6 w-[250px]">
                    File type not supported. Please choose another video.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Caption */}
        <div className="flex flex-col gap-3 pb-10">
          <label className="font-medium text-md">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 px-2 py-1"
          />
          <label className="text-md font-medium">Select a Category</label>
          <select
            value={category}
            className="px-2 py-1 border-2 capitalize cursor-pointer"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="p-2 capitalize"
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-8">
            <button className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-40">
              Discard
            </button>
            <button
              onClick={handlePost}
              className="bg-[#F51997] hover:bg-[#E60484] text-white text-md font-medium p-2 rounded w-28 lg:w-40"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
