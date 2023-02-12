import type { GetServerSidePropsContext, NextPage } from "next";
import type { Session } from "next-auth";
import Layout from "../components/layout";
import Picture from "../components/picture";
import { getServerAuthSession } from "../server/auth";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  large?: boolean;
}

const Home: NextPage<{ authData: Session; photos: Photo[] }> = ({
  authData,
  photos,
}) => {
  return (
    <Layout title="My unsplash | Home">
      <div className="grid items-center">
        <div className="grid-wrapper min-h-main gap-7">
          {photos.map((photo) => (
            <Picture key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const authData = await getServerAuthSession(context);
  if (!authData) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const photoResponse = await fetch(
    "https://jsonplaceholder.typicode.com/photos"
  );
  const photos = (await photoResponse.json()) as Photo[];
  const firstTwenty = photos
    .slice(0, 21)
    .map((photo) => ({ ...photo, large: Math.random() < 0.5 }));

  return { props: { authData, photos: firstTwenty } };
}

export default Home;
