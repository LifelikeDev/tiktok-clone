import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BASE_URL } from "../../utils";

const Detail = () => {
  return <div>Detail</div>;
};

export const getServerSideProps = async (params: { id: string }) => {
  const {data} = await axios.get(`${BASE_URL}/api/post/${params.id}`)
}

export default Detail;
