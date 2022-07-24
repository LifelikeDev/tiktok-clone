import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);

  const handleVideoUpload = async (event: any) => {
    const selectedFile = event.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="bg-white rounded-lg">
        <>
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
              <div>
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
                      <p className="bg-red-600 hover:bg-red-700 text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select File to Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      onChange={handleVideoUpload}
                      className="h-0 w-0"
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default Upload;
