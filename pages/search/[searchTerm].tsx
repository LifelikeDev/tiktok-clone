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
import { ParsedUrlQuery } from "querystring";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState<boolean>(true);
  const router = useRouter();
  const { searchTerm } = router.query;
  const { allUsers }: { allUsers: AppUser[] } = useAuthStore();

  const accounts = isAccounts ? "border-b-4 border-gray-600" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-4 border-gray-600" : "text-gray-400";
  const searchedAccounts =
    searchTerm &&
    allUsers.filter((user: AppUser) =>
      user.userName.toLowerCase().includes(searchTerm.toString().toLowerCase())
    );

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
          className={`text-xl font-semibold cursor-pointer mt-2 w-20 text-center ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>

      {isAccounts ? (
        <div className="md:mt-6">
          {searchedAccounts && searchedAccounts.length ? (
            searchedAccounts.map((user: AppUser) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div
                  className={`flex gap-3 p-2 cursor-pointer font-semibold rounded hover:bg-gray-100
                  `}
                >
                  <div>
                    <Image
                      className="rounded-full"
                      src={user.image}
                      alt={`${user.userName}`}
                      width={50}
                      height={50}
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
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video) => (
              <VideoCard post={video} key={video._id} />
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
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
