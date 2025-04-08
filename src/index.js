import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RootStoreContext } from "./store/store_context";
import RootStore from "./store/root_store";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Подключение шрифта
import "@fontsource/montserrat"; // Импортирует шрифт Montserrat с весом по умолчанию 400
import "@fontsource/montserrat/900.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/200.css";

const theme = extendTheme({
  styles: {
    global: {
      heading: { fontFamily: "'Montserrat', sans-serif", color: "black" }, // Для заголовков
      body: {
        fontFamily: "'Montserrat', sans-serif",
        color: "black",
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RootStoreContext.Provider value={new RootStore()}>
    <ChakraProvider theme={theme}>
      <GoogleOAuthProvider clientId="139259050435-62e07h09fod6e3e37mfl7vin0ds9h5o4.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </ChakraProvider>
  </RootStoreContext.Provider>
);
