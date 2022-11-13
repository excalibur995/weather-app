import React from "react";
import Head from "next/head";

interface SeoProperties {
  title: string;
  description: string;
  image?: string;
  children?: React.ReactNode;
}

const defaultSeoProps: SeoProperties = {
  title: "Weather App",
  description: "Trusted Forecast Web",
  children: undefined,
};

function Seo({ title, description, image, children }: SeoProperties) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta name="image" property="og:image" content={image} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta name="image" property="twitter:image" content={image} />
      </Head>
      {children}
    </>
  );
}

Seo.defaultProps = defaultSeoProps;
export default Seo;
