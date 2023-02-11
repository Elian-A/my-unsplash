import Head from "next/head";
import type { FC, ReactElement } from "react";

const Layout: FC<{
  children: ReactElement | ReactElement[];
  title: string;
}> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="devchallenges.png" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
