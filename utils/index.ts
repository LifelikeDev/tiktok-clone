import axios from "axios";
import jwt_decode from "jwt-decode";

export interface AppUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

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

  await axios.post(`http://localhost:3000/api/auth`, user);
};
