import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/router";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { Video, AppUser } from "../../types.dev";
import { BASE_URL } from "../../utils";
import useAuthStore from "../../store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState<boolean>(true);

  const accounts = isAccounts
    ? "border-b-4 border-gray-600"
    : "text-gray-400";
  const isVideos = !isAccounts
    ? "border-b-4 border-gray-600"
    : "text-gray-400";

  return (
    <div className="w-full">
      <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 w-20 text-center ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 w-20 text-center ${videos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
