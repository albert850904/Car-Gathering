import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/layout/Layout";
// root component of all the page components are rendered in
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Nextjs Car event</title>
        <meta name="description" content="super car event in Taiwan" />
        {/* 確定page response and scale correctly (RWD 必備) */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
