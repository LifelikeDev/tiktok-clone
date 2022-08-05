import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { AppUser } from "../types.dev";

const SuggestedAccounts = () => {
  const { allUsers, fetchAllUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Suggested Accounts
      </p>

      <div className="">
        {allUsers.slice(0, 6).map((user: AppUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-2 items-center p-2 font-semibold hover:bg-primary cursor-pointer rounded mx-3 my-1">
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
                <p className="flex gap-1 items-center text-md text-primary font-bold lowercase">
                  {user.userName.replaceAll(" ", "")}
                  <GoVerified className="text-[#F51997]" />
                </p>
                <p className="text-gray-400 text-sm capitalize">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
