import Sidebar from "../src/components/Sidebar";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import "../styles/sidebar.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Sidebar />
      <section id="main-dashboard-content">
        <section id="grid-container">
          <div className="grid-item one">
            <Component {...pageProps} />
          </div>
        </section>
      </section>
    </ChakraProvider>
  );
}

export default MyApp;
