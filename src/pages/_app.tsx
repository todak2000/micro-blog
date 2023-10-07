import { AppProps } from "next/app";

import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "@/store";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
