import type { NextPage } from "next";
import axios from "axios";

const Home: NextPage = () => {  

  return <div>TikTok Clone</div>;
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
