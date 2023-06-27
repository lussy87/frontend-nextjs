import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";

import SectionTitle from "../components/sectionTitle";

import { benefitOne, benefitTwo } from "../components/data";
import Video from "../components/video";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Cta from "../components/cta";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";
import Blogs from "../components/blogs";

const Home = () => {
  return (
    <>
      <Head>
        <title>My Blog - Frontend Nextjs</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Blogs />
     
    </>
  );
}

export default Home;