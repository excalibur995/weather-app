import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import RootLayout from "layout/RootLayout";
import ReactQueryConfig from "drivers/react-query/ReactQueryConfig";
import Seo from "layout/Seo";
const inter = Inter();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: ${inter.style.fontFamily};
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }

        @media (prefers-color-scheme: dark) {
          html {
            color-scheme: dark;
          }
          body {
            color: white;
            background: hsl(240, 32%, 9%);
          }
        }
        @media not all and (min-resolution: 0.001dpcm) {
          img[loading="lazy"] {
            clip-path: inset(0.5px);
          }
        }
      `}</style>

      <Seo>
        <ReactQueryConfig>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </ReactQueryConfig>
      </Seo>
    </>
  );
}
