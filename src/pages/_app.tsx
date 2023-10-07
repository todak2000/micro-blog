import { AppProps } from "next/app";

import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "@/store";
/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
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
