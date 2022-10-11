import "styles/globals.scss";
import React from "react";
import store from "store";
import { Provider } from "react-redux";
import { AppPropsWithLayout } from "typings/layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Layout from "layout";
import { ReactQueryDevtools } from "react-query/devtools";

/**
 * Admin Root
 */

function RootApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: true,
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return getLayout(
    <Provider store={store}>
      <Layout>
        <QueryClientProvider client={queryClient}>
          {/* @ts-ignore */}
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
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
