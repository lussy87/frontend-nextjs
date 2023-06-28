import Head from "next/head";
import Navbar from "../../components/navbar";
import BlogDetail from "./[id]";


const Home = () => {
  return (
    <>
      <Head>
        <title>My Blog - Frontend Nextjs</title>
        <meta
          name="description"
          content=""
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <BlogDetail />
     
    </>
  );
}

export default Home;