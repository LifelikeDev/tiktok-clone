import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import {AppUser} from "../types.dev"

interface IComments {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
    _id?: string;
  };
}

export interface IProps {
  comment: string;
  comments: IComments[];
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  isPostingComment: boolean;
}

const Comments = ({
  comment,
  comments,
  setComment,
  addComment,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[480px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {allUsers.map(
                (user: AppUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`} key={user._id}>
                        <div className="flex items-start gap-3 cursor-pointer">
                          <div className="w-8 h-8">
                            <Image
                              className="rounded-full"
                              src={user.image}
                              alt={`${user.userName}`}
                              width={38}
                              height={38}
                              layout="responsive"
                            />
                          </div>

                          <div className="hidden xl:block">
                            <p className="flex gap-3 items-center text-md text-primary font-bold lowercase">
                              {user.userName.replaceAll(" ", "")}
                              <GoVerified className="text-[#F51997]" />
                            </p>
                            <p className="text-gray-400 text-sm capitalize">
                              {user.userName}
                            </p>
                          </div>
                        </div>

                      </Link>

                      <div className="">
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 mg:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              placeholder="Add a comment..."
            />
            <button
              className="cursor-pointer text-md text-gray-400 hover:bg-[#333] hover:text-gray-200 px-3 hover:rounded-md"
              onClick={addComment}
            >
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
