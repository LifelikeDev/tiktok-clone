import React from "react";
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
  const { userProfile, addUser } = useAuthStore();

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

      <div>Search</div>

      <div>
        {userProfile ? (
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

            <button type="button" className="px-2 text-[#F51997] hover:rounded-full hover:bg-gray-100">
              <AiOutlineLogout fontSize={24} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => console.log(`error encoutered...`)}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
