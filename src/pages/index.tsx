import type { Photo } from "@prisma/client";
import type { GetServerSidePropsContext, NextPage } from "next";
import type { Session } from "next-auth";
import Layout from "../components/layout";
import Photos from "../components/photos";
import { getServerAuthSession } from "../server/auth";
import { getUserPhotos } from "../utils/photo";

const Home: NextPage<{ authData: Session; userPhotos: Photo[] }> = ({
  userPhotos,
}) => {
  return (
    <Layout title="My unsplash | Home">
      <div className="grid items-center">
        <div className="grid-wrapper min-h-main gap-7">
          {userPhotos.length === 0 ? (
            <h2>You have no photos :c</h2>
          ) : (
            <Photos photos={userPhotos} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const authData = await getServerAuthSession(context);
  if (!authData)
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };

  const { id } = authData.user;
  const userPhotos = await getUserPhotos(id);
  return { props: { authData, userPhotos } };
}

export default Home;
