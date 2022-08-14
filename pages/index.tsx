import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types.dev";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home: NextPage<IProps> = ({ videos }) => {
  return (
    <div className="flex flex-col h-full gap-10 videos">
      {videos.length ? (
        videos?.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        ))
      ) : (
        <NoResults text={`No Videos`} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null; 
  
  response = topic
    ? await axios.get(`${BASE_URL}/api/discover/${topic}`)
    : await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
