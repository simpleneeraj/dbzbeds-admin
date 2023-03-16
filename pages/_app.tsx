import React from "react";
import store from "store";
import "styles/globals.scss";
import Layout from "layout";
import { Provider } from "react-redux";
import WebSocketProvider from "services/socket";
import { AppPropsWithLayout } from "typings/layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

/**
 * Admin Root
 */

function RootApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  const queryClient = React.useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnReconnect: true,
          retry: false,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          staleTime: 0,
          cacheTime: 0,
        },
      },
    });
  }, []);

  return getLayout(
    <Provider store={store}>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <WebSocketProvider>
              <Component {...pageProps} />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </WebSocketProvider>
          </Hydrate>
        </QueryClientProvider>
      </Layout>
    </Provider>
  );
}
export default RootApp;

//HANDLE AUTHENTICATION LOGOUT
// React.useEffect(() => {
//     axios.interceptors.response.use(
//         (response) => response,
//         (error) => {
//             if (error.response.status === 401) {
//                 Router.replace("/login");
//             }
//             return Promise.reject(error);
//         }
//     );
// }, []);
