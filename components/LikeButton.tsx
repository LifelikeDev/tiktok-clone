import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

interface ILikes {
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  _ref?: string;
}

export interface IProps {
  likes: ILikes[];
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile } = useAuthStore();

  const filteredLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filteredLikes?.length) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filteredLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997] "
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="font-semibold text-md">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
