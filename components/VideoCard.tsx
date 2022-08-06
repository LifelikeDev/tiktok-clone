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
  isShowingOnHome?: boolean;
  key?: string;
}

const VideoCard: NextPage<VideoCardProps> = ({ post, isShowingOnHome }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const handleVideoPress = () => {
    if (isVideoPlaying) {
      videoRef?.current?.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsVideoPlaying(true);
    }
  };

  const handleVideoSound = () => {
    if (isVideoMuted) {
      videoRef!.current!.muted = false;
      setIsVideoMuted(false);
    } else {
      videoRef!.current!.muted = true;
      setIsVideoMuted(true);
    }
  };

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  src={post.postedBy.image}
                  width={42}
                  height={42}
                  className="rounded-full"
                  alt="profile"
                  layout="responsive"
                />
              </>
            </Link>
          </div>

          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex flex-col  gap-2">
              <p className="flex items-center gap-1 md:text-md font-bold text-primary">
                {post.postedBy.userName}
                <GoVerified className="text-[#F51997] text-md" />
              </p>
              <p className="capitalize text-gray-500 text-xs font-medium hidden md:block">
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4">
        <div
          className="rounded-3xl relative"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              src={post.video.asset.url}
              loop
              className="cursor-pointer mt-3 h-[400px] lg:h-[450px] w-[350px] lg:w-[400px] rounded-2xl bg-gray-100"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-0 left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-pointer flex gap-10 justify-between items-center p-3">
              {isVideoPlaying ? (
                <button onClick={handleVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={handleVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={handleVideoSound}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={handleVideoSound}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
