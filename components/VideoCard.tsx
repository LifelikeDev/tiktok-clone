import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import { Video } from "../types.dev";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface VideoCardProps {
  post: Video;
  isShowingOnHome: boolean;
  key?: string;
}

const VideoCard: NextPage<VideoCardProps> = ({ post, isShowingOnHome }) => {
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="">
              <>
                <Image
                  src={post.postedBy.image}
                  width={62}
                  height={62}
                  className="rounded-full"
                  alt="profile"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
