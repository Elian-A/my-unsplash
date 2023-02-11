import type { GetServerSidePropsContext, NextPage } from "next";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Layout from "../../components/layout";
import { getServerAuthSession } from "../server/auth";

const Home: NextPage<{ authData: Session }> = ({ authData }) => {
  console.log(authData);
  return (
    <Layout title="My unsplash | Home">
      <button
        onClick={() => {
          signIn().catch(() => {
            console.log("Signed in");
          });
        }}
      >
        SignIn
      </button>
      <button
        onClick={() => {
          signOut().catch(() => {
            console.log("Signed out");
          });
        }}
      >
        SignOut
      </button>
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
  return { props: { authData } };
}

export default Home;
