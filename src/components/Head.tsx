import React from "react";
import NextHead from "next/head";

type Props = {
  title?: string;
  ogImage?: string;
  noIndex?: boolean;
};

const Head: React.FC<Props> = (props) => {
  const { children, title } = props;
  return (
    <>
      <NextHead>
        <meta name="application-name" content="snicy.me" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="snicy.me" />
        <meta name="description" content="snicy.me" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="description" content="snicy.me" />
        <meta property="og:site_name" content="snicy.me" />
        <meta property="og:title" content={title || "snicy.me"} />
        <meta property="og:description" content="snicy.me" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@traehruoylooc" />
        <meta
          property="og:image"
          content={props.ogImage || `/images/default_ogimage.jpg`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://snicy.me"} />
        <meta name="theme-color" content="#000000" />
        {props.noIndex ? (
          <meta name="robots" content="noindex, follow" />
        ) : (
          <meta name="robots" content="index, follow" />
        )}
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="/favicons/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;700&family=Montserrat:wght@300;700&family=Noto+Sans+JP:wght@400;700&family=Noto+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>{title || "snicy.me"}</title>
        <>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-HVKBX0GDZ8"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-HVKBX0GDZ8');
                `,
            }}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
          />
        </>
        {children}
      </NextHead>
    </>
  );
};

export default Head;
