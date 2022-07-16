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

          <Link href="/">
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 md:text-md font-bold text-primary">
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

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <Link href="">
            <video
              ref={videoRef}
              src={post.video.asset.url}
              loop
              className="cursor-pointer lg:w[600px] h-[300px] md:h-[350px] w-[300px] rounded-2xl bg-gray-100"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3">
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
