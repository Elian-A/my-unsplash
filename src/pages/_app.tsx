import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Montserrat, Noto_Sans } from "@next/font/google";
import { SearchProvider } from "../context/searchContext";
import { ModalProvider } from "../context/modalContext";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--ff-base",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--ff-accent",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ModalProvider>
        <SearchProvider>
          <div className={`${noto_sans.variable} ${montserrat.variable}`}>
            <Component {...pageProps} />
          </div>
        </SearchProvider>
      </ModalProvider>
    </SessionProvider>
  );
};

export default MyApp;
