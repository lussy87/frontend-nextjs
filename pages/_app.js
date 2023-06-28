import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
      
    </ThemeProvider>

    
  );
}

export default MyApp;
