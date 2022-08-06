import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { GoVerified } from "react-icons/go";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { Video, AppUser } from "../../types.dev";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: AppUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  const [showUserVideos, setShowUserVideos] = useState<boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const allVideos = showUserVideos
    ? "border-b-4 border-gray-600"
    : "text-gray-400";
  const likedVideos = !showUserVideos
    ? "border-b-4 border-gray-600"
    : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userVideos, userLikedVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-3 md:gap-10 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            className="rounded-full"
            src={user.image}
            alt={`${user.userName}`}
            width={120}
            height={120}
            layout="responsive"
          />
        </div>

        <div>
          <p className="md:text-2xl tracking-wide flex gap-1 items-center justify-center text-md text-primary font-bold lowercase">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-[#F51997]" />
          </p>
          <p className="md:text-xl text-gray-400 text-sm capitalize">
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 w-20 text-center ${allVideos}`}
            onClick={() => setShowUserVideos(true)}
          >
            All
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 w-20 text-center ${likedVideos}`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>

        <div className="flex flex-wrap gap-6 md:justify-start">
          {videosList.length ? (
            videosList.map((video: Video) => (
              <VideoCard post={video} key={video._id} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
