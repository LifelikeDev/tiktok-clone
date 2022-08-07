import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";

import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleUserLogout = (): void => {
    googleLogout();
    removeUser();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if(searchValue) {
      router.push(`/search/${searchValue}`)
    }
  };



  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 px-2 py-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TikTik"
            layout="responsive"
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            type="text"
            value={searchValue}
            placeholder="Search accounts and videos"
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded  md:top-0"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile._id ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="flex items-center border-2 gap-2 rounded py-1 px-4 font-semibold text-md hover:bg-[#F51997] hover:text-white">
                <IoMdAdd className="text-xl" /> {` `}{" "}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="">
                <>
                  <Image
                    src={userProfile.image}
                    width={36}
                    height={36}
                    className="rounded-full cursor-pointer"
                    alt="profile"
                  />
                </>
              </Link>
            )}

            <button
              type="button"
              className="px-2 text-[#F51997] hover:rounded-full hover:bg-gray-100"
              onClick={handleUserLogout}
            >
              <AiOutlineLogout fontSize={24} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => alert("Sorry. Login Failed...")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
