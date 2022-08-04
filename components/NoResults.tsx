import React from "react";
import { NextPage } from "next";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

interface NoResultsProps {
  text: string;
}

const NoResults: NextPage<NoResultsProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <p className="text-8xl">
        {text === "No comments yet" ? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
      <p className="text-md text-gray-500 text-center mt-2">{text}</p>
    </div>
  );
};

export default NoResults;
