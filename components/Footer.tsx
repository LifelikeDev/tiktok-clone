import { NextPage } from "next";
import React from "react";

import {
  footerList1,
  footerList2,
  footerList3,
} from "../utils/constants";

const List = ({ list, mt }: { list: string[]; mt: boolean }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
      {list.map((item) => (
        <p
          key={item}
          className="cursor-pointer text-gray-500 hover:underline text-sm"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const Footer: NextPage = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List list={footerList1} mt={false} />
      <List list={footerList2} mt />
      <List list={footerList3} mt />
      <p className="text-sm mt-5 text-gray-400">
        &copy; TikTik {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
