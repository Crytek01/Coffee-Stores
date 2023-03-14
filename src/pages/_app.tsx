import { CoffeeStoreProvider } from "@common/contexts/coffee-stores/coffee-stores.context";
import type { AppProps } from "next/app";
import { IBM_Plex_Sans } from "next/font/google";

import "@styles/globals.css";

const IBMPlexSans = IBM_Plex_Sans({
  weight: ["400", "600", "700"],
  subsets: [],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${IBMPlexSans.style.fontFamily}, -apple-system,
            BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
      `}</style>

      <CoffeeStoreProvider>
        <Component {...pageProps} />
      </CoffeeStoreProvider>
    </>
  );
}
