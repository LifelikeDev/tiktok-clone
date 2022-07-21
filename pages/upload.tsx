import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";

const Upload = () => {
  return (
    <div className="flex w-full h-full">
      <div className="bg-white rounded-lg">
        <>
          <div>
            <p className="text-2xl font-bold">Upload</p>
            <p className="text-md text-gray-400 mt-1">Post a video to your account</p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100"></div>
        </>
      </div>
    </div>
  );
};

export default Upload;
