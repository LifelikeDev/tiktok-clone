import axios from "axios";
import jwt_decode from "jwt-decode";
import { AppUser } from "../types.dev";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface DecodedUserDetails {
  name: string;
  picture: string;
  sub: string;
}

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: DecodedUserDetails = jwt_decode(response.credential);
  const { name, picture, sub } = decoded;

  const user: AppUser = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
