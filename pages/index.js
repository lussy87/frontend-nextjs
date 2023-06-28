import Head from "next/head";
import Navbar from "../components/navbar";

import Blogs from "../components/blogs";

const Home = () => {
  return (
    <>
      <Head>
        <title>My Blog - Frontend Nextjs</title>
        <meta
          name="description"
          content=""
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Navbar />
      <Blogs />
     
    </>
  );
}

export default Home;