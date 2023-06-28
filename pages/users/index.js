import Head from "next/head";
import Navbar from "../../components/navbar";
import Users from "../../components/users";



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
      <Users />
     
     
    </>
  );
}

export default Home;